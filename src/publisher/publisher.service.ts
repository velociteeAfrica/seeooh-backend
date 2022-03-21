import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppLoggerService } from '../logger/logger.service';
import { Publisher, PublisherDocument } from './schema';

@Injectable()
export class PublisherService {
  constructor(
    @InjectConnection('publishers') private connection: Connection,
    @InjectModel(Publisher.name)
    private publisherModel: Model<PublisherDocument>,
    private logger: AppLoggerService,
  ) {
    this.logger.log(
      {
        connectionDbState: this.connection.readyState,
      },
      'PublisherDBActiveStatus',
    );
  }
  async findAll(): Promise<Publisher[]> {
    return this.publisherModel.find().exec();
  }
}
