import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PublisherTeamDto, UpdatePublisherTeamDto } from './dto';
import { PublisherTeam, PublisherTeamDocument } from './schema';

@Injectable()
export class PublisherTeamService {
  constructor(
    @InjectModel(PublisherTeam.name)
    private publisherTeamModel: Model<PublisherTeamDocument>,
  ) {}
  async createMember(
    publisherId: string,
    dto: PublisherTeamDto,
  ): Promise<PublisherTeamDocument> {
    try {
      const publisherTeamMember = await this.publisherTeamModel.create({
        ...dto,
        publisher: publisherId,
      });
      return publisherTeamMember;
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      throw err;
    }
  }
  async getMembers(publisherId: string): Promise<PublisherTeamDocument[]> {
    return this.publisherTeamModel.find({ publisher: publisherId });
  }
  async updateMember(
    publisherId: string,
    publisherTeamMemberId: string,
    dto: UpdatePublisherTeamDto,
  ): Promise<PublisherTeamDocument> {
    const publisherTeamMember = await this.publisherTeamModel.findOneAndUpdate(
      { _id: publisherTeamMemberId, publisher: publisherId },
      dto,
      { new: true },
    );
    if (!publisherTeamMember) {
      throw new BadRequestException(
        'failed to update member details. invalid member id',
      );
    }
    return publisherTeamMember;
  }
  async deleteMember(
    publisherId: string,
    publisherTeamMemberId: string,
  ): Promise<boolean> {
    const publisherTeamMember = await this.publisherTeamModel.findOneAndDelete({
      _id: publisherTeamMemberId,
      publisher: publisherId,
    });
    if (!publisherTeamMember) {
      throw new BadRequestException(
        'failed to delete member. invalid member id',
      );
    }
    return true;
  }
}
