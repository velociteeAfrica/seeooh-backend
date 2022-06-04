import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetCurrentUserId } from '../auth/decorator';
import { PublisherTeamDto, UpdatePublisherTeamDto } from './dto';
import { PublisherTeamService } from './publisher-team.service';

@Controller('publisher-team')
export class PublisherTeamController {
  constructor(private readonly publisherTeamService: PublisherTeamService) {}

  @Post('/members')
  async createMember(
    @GetCurrentUserId() publisherId: string,
    @Body() dto: PublisherTeamDto,
  ) {
    return this.publisherTeamService.createMember(publisherId, dto);
  }
  @Get('/members')
  async getMembers(@GetCurrentUserId() publisherId: string) {
    const result = await this.publisherTeamService.getMembers(publisherId);
    return {
      result,
      metadata: {
        count: result.length,
      },
    };
  }
  @Patch('/members/:id')
  updateMember(
    @GetCurrentUserId() publisherId: string,
    @Param('id') publisherTeamMemberId: string,
    @Body() dto: UpdatePublisherTeamDto,
  ) {
    return this.publisherTeamService.updateMember(
      publisherId,
      publisherTeamMemberId,
      dto,
    );
  }
  @Delete('/members/:id')
  async deleteMember(
    @GetCurrentUserId() publisherId: string,
    @Param('id') publisherTeamMemberId: string,
  ) {
    await this.publisherTeamService.deleteMember(
      publisherId,
      publisherTeamMemberId,
    );
    return publisherTeamMemberId;
  }
}
