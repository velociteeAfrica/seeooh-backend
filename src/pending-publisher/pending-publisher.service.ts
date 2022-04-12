import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PendingPublisherDto } from './dto';
import { PendingPublisherReturn } from './entities';
import { PendingPublisher, PendingPublisherDocument } from './schema';

@Injectable()
export class PendingPublisherService {
  constructor(
    @InjectModel(PendingPublisher.name)
    private pendingPublisherModel: Model<PendingPublisherDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async findPendingPublisher(
    pendingPublisherId: string,
  ): Promise<PendingPublisherReturn> {
    const pendingPublisher = await this.pendingPublisherModel.findById(
      pendingPublisherId,
    );
    return pendingPublisher ? pendingPublisher.toResponseObject() : null;
  }
  async findSecurePendingPublisher(
    pendingPublisherId: string,
  ): Promise<PendingPublisherDocument> {
    const pendingPublisher = await this.pendingPublisherModel.findById(
      pendingPublisherId,
    );
    return pendingPublisher;
  }
  async findPendingPublisherByField(
    field: string,
    value: string,
  ): Promise<PendingPublisherReturn> {
    const pendingPublisher = await this.pendingPublisherModel.findOne({
      [field]: value,
    });
    return pendingPublisher ? pendingPublisher.toResponseObject() : null;
  }
  async createPendingPublisher(
    dto: PendingPublisherDto,
  ): Promise<PendingPublisherReturn> {
    const newPendingPublisher =
      await this.pendingPublisherModel.findOneAndUpdate(
        {
          companyEmail: dto.companyEmail,
        },
        {
          ...dto,
        },
        {
          upsert: true,
          new: true,
        },
      );
    const token = await this.signToken(
      newPendingPublisher._id,
      newPendingPublisher.companyEmail,
    );
    newPendingPublisher.activationToken = token;
    await newPendingPublisher.save();
    return newPendingPublisher.toResponseObject();
  }
  async deletePendingPublisher(
    pendingPublisherId: string,
  ): Promise<{ success: boolean }> {
    await this.pendingPublisherModel.findByIdAndDelete(pendingPublisherId);
    return {
      success: true,
    };
  }
  async signToken(pendingPublisherId: string, email: string): Promise<string> {
    const payload = { sub: pendingPublisherId, companyEmail: email };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('PENDING_PUBLISHER_JWT_SECRET_EXPIRES_IN'),
      secret: this.config.get('PENDING_PUBLISHER_JWT_SECRET'),
    });
    return token;
  }
  async verifyToken(
    token: string,
  ): Promise<{ sub: string; companyEmail: string }> {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.config.get('PENDING_PUBLISHER_JWT_SECRET'),
      });
      return payload;
    } catch (error) {
      return null;
    }
  }
}
