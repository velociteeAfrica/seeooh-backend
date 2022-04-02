import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { Publisher, PublisherDocument } from '../publisher/schema';
import {
  AuthActivatePendingPublisherDto,
  AuthPublisherLoginDto,
  AuthPublisherSignupDto,
} from './dto';
import { ConfigService } from '@nestjs/config';
import { AuthToken } from './entities';
import { AuthPublisher } from './entities/auth-publisher.entity';
import { PendingPublisherService } from '../pending-publisher/pending-publisher.service';
import { PublisherService } from '../publisher/publisher.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Publisher.name)
    private publisherModel: Model<PublisherDocument>,
    private publisherService: PublisherService,
    private pendingPublisherService: PendingPublisherService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async authPublisherLogin(dto: AuthPublisherLoginDto): Promise<AuthPublisher> {
    const publisher = await this.publisherModel
      .findOne({
        companyEmail: dto.companyEmail,
      })
      .select(['-refreshTokenHash']);
    if (!publisher) {
      throw new ForbiddenException('Invalid Credentials');
    }
    const isValidPassword = await argon.verify(
      publisher.password,
      dto.password,
    );
    if (!isValidPassword) {
      throw new ForbiddenException('Invalid Credentials');
    }
    const tokens = await this.signTokens(publisher.id, publisher.companyEmail);
    await this.updateRtHash(publisher.id, tokens.refreshToken);
    const publisherObject = {
      ...publisher.toObject(),
    };
    delete publisherObject.password;
    return {
      ...publisherObject,
      ...tokens,
    };
  }
  async authPublisherSignup(
    dto: AuthPublisherSignupDto,
  ): Promise<{ success: boolean }> {
    const checkForExistingPublisherViaEmail = await this.publisherModel.findOne(
      {
        companyEmail: dto.companyEmail,
      },
    );
    if (checkForExistingPublisherViaEmail) {
      throw new ForbiddenException('Email already exists');
    }
    const checkForExistingPublisherViaCompanyName =
      await this.publisherModel.findOne({
        companyName: dto.companyName,
      });

    if (checkForExistingPublisherViaCompanyName) {
      throw new ForbiddenException('Company name already exists');
    }
    const pwdHash = await argon.hash(dto.password);
    await this.pendingPublisherService.createPendingPublisher({
      ...dto,
      password: pwdHash,
    });
    return {
      success: true,
    };
  }
  async authActivatePendingPublisher(dto: AuthActivatePendingPublisherDto) {
    const verifyPayload = await this.pendingPublisherService.verifyToken(
      dto.token,
    );
    if (!verifyPayload) {
      throw new ForbiddenException('Invalid Token');
    }
    if (verifyPayload.companyEmail !== dto.companyEmail) {
      throw new ForbiddenException('Invalid Credentials');
    }
    const findPendingPublisher =
      await this.pendingPublisherService.findSecurePendingPublisher(
        verifyPayload.sub,
      );
    if (!findPendingPublisher) {
      throw new ForbiddenException('Invalid Token');
    }
    const {
      firstName,
      lastName,
      companyEmail,
      companyName,
      companyPhone,
      jobTitle,
      password,
    } = findPendingPublisher.toObject();
    await this.publisherService.createPublisher({
      firstName,
      lastName,
      companyEmail,
      companyName,
      companyPhone,
      jobTitle,
      password,
    });
    await this.pendingPublisherService.deletePendingPublisher(
      findPendingPublisher._id,
    );
    return {
      success: true,
    };
  }

  async authPublisherLogout(
    publisherId: string,
  ): Promise<{ success: boolean }> {
    await this.publisherModel.findByIdAndUpdate(publisherId, {
      $set: {
        refreshTokenHash: '',
      },
    });
    return {
      success: true,
    };
  }

  async authPublisherRefreshTokens(
    publisherId: string,
    refreshToken: string,
  ): Promise<AuthToken> {
    const publisher = await this.publisherModel.findById(publisherId);
    if (!publisher || !publisher.refreshTokenHash) {
      throw new ForbiddenException('Access denied');
    }
    const refreshTokenMatches = await argon.verify(
      publisher.refreshTokenHash,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access denied');
    }
    const tokens = await this.signTokens(publisher.id, publisher.companyEmail);
    await this.updateRtHash(publisher.id, tokens.refreshToken);
    return {
      ...tokens,
    };
  }
  async updateRtHash(publisherId: string, refreshToken: string) {
    const hash = await argon.hash(refreshToken);
    await this.publisherModel.findByIdAndUpdate(
      publisherId,
      {
        refreshTokenHash: hash,
      },
      {
        new: true,
      },
    );
  }
  async signTokens(sub: string, publisherEmail: string): Promise<AuthToken> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub,
          publisherEmail,
        },
        {
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub,
          publisherEmail,
        },
        {
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
