import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherTeamController } from './publisher-team.controller';
import { PublisherTeamService } from './publisher-team.service';
import { PublisherTeam, PublisherTeamSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: PublisherTeam.name, schema: PublisherTeamSchema }],
      'publishers',
    ),
  ],
  controllers: [PublisherTeamController],
  providers: [PublisherTeamService],
})
export class PublisherTeamModule {}
