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
import { AuthPublisher } from './entities/auth-publisher.entity';
import { PendingPublisherService } from '../pending-publisher/pending-publisher.service';
import { PublisherService } from '../publisher/publisher.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Publisher.name)
    private publisherModel: Model<PublisherDocument>,
    private publisherService: PublisherService,
    private pendingPublisherService: PendingPublisherService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}
  async authPublisherLogin(dto: AuthPublisherLoginDto): Promise<AuthPublisher> {
    const publisher = await this.publisherModel
      .findOne({
        companyEmail: dto.companyEmail,
      })
      .select(['-accessTokenHash']);
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
    const token = await this.signToken(publisher.id, publisher.companyEmail);
    await this.updateAtHash(publisher.id, token);
    const publisherObject = {
      ...publisher.toObject(),
    };
    delete publisherObject.password;
    return {
      ...publisherObject,
      token: {
        accessToken: token,
      },
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
    // const checkForExistingPendingPublisherViaEmail =
    //   await this.pendingPublisherService.findPendingPublisherByField(
    //     'companyEmail',
    //     dto.companyEmail,
    //   );
    if (checkForExistingPublisherViaEmail) {
      throw new ForbiddenException('Email already exists');
    }
    const checkForExistingPublisherViaCompanyName =
      await this.publisherModel.findOne({
        companyName: dto.companyName,
      });
    // const checkForExistingPendingPublisherViaCompanyName =
    //   await this.pendingPublisherService.findPendingPublisherByField(
    //     'companyName',
    //     dto.companyName,
    //   );

    if (checkForExistingPublisherViaCompanyName) {
      throw new ForbiddenException('Company name already exists');
    }
    const pwdHash = await argon.hash(dto.password);
    const pendingPublisher =
      await this.pendingPublisherService.createPendingPublisher({
        ...dto,
        password: pwdHash,
      });
    await this.mailerService.sendMail({
      to: 'support@seeooh.app', // list of receivers
      from: 'Seeooh <support@seeooh.app>', // sender address
      subject: 'New Publisher Sign Up Details/Activation', // Subject line
      text: 'New entry to publisher.seeooh.app - publisher.seeooh.app ', // plaintext body
      template: 'admin-publisher-signup-activation',
      context: {
        // Data to be sent to template engine.
        companyName: dto.companyName,
        jobTitle: dto.jobTitle,
        firstName: dto.firstName,
        lastName: dto.lastName,
        companyPhone: dto.companyPhone,
        companyEmail: dto.companyEmail,
        activationLink: `${this.configService.get(
          'SERVER_BASE_URL',
        )}auth/publisher/pending/activate?companyEmail=${
          dto.companyEmail
        }&token=${pendingPublisher.activationToken}`,
      },
    });
    await this.mailerService.sendMail({
      to: dto.companyEmail,
      from: 'Seeooh <support@seeooh.app>',
      subject: 'Publisher Sign Up response',
      text: 'Signup to publisher.seeooh.app - publisher.seeooh.app ',
      template: 'response-to-publisher-after-signup',
      context: {
        firstName: dto.firstName,
      },
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
    await this.mailerService.sendMail({
      to: companyEmail,
      from: 'Seeooh <support@seeooh.app>',
      subject: 'Publisher Account Activation response',
      text: 'Login to publisher.seeooh.app - publisher.seeooh.app ',
      template: 'response-to-publisher-after-activation',
      context: {
        firstName,
        companyName,
        clientLoginLink: `${this.configService.get('CLIENT_BASE_URL')}login`,
      },
    });
    return {
      success: true,
    };
  }

  async authPublisherLogout(
    publisherId: string,
  ): Promise<{ success: boolean }> {
    await this.publisherModel.findByIdAndUpdate(publisherId, {
      $set: {
        accessTokenHash: '',
      },
    });
    return {
      success: true,
    };
  }

  async authPublisherSession(publisherId: string): Promise<AuthPublisher> {
    const publisher = await this.publisherModel.findById(publisherId);
    if (!publisher) {
      return null;
    }
    const token = await this.signToken(publisher._id, publisher.companyEmail);
    await this.updateAtHash(publisher._id, token);
    const publisherObject = {
      ...publisher.toObject(),
    };
    delete publisherObject.password;
    delete publisherObject.accessTokenHash;
    return {
      ...publisherObject,
      token: {
        accessToken: token,
      },
    };
  }

  async updateAtHash(publisherId: string, accessToken: string) {
    const hash = await argon.hash(accessToken);
    await this.publisherModel.findByIdAndUpdate(
      publisherId,
      {
        accessTokenHash: hash,
      },
      {
        new: true,
      },
    );
  }
  async signToken(sub: string, publisherEmail: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      {
        sub,
        publisherEmail,
      },
      {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );
    return token;
  }
  async signupPublisherToken(
    publisherEmail: string,
    publisherName: string,
  ): Promise<string> {
    const token = await this.jwtService.signAsync(
      {
        sub: publisherEmail,
        publisherName,
      },
      {
        expiresIn: this.configService.get(
          'SIGNUP_PUBLISHER_ACCESS_TOKEN_EXPIRES_IN',
        ),
        secret: this.configService.get('SIGNUP_PUBLISHER_ACCESS_TOKEN_SECRET'),
      },
    );
    return token;
  }
}
