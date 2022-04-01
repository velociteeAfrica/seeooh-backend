import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { AppLoggerService } from '../logger/logger.service';
import { Publisher, PublisherDocument } from './schema';
import { PublisherInventoryService } from 'src/publisher-inventory/publisher-inventory.service';
import { PublisherInventoryDto } from '../publisher-inventory/dto';
import { AuthPublisherSignupDto } from '../auth/dto';

@Injectable()
export class PublisherService {
  constructor(
    @InjectConnection('publishers') private connection: Connection,
    @InjectModel(Publisher.name)
    private publisherModel: Model<PublisherDocument>,
    private readonly publisherInventoryService: PublisherInventoryService,
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
  async createPublisher(
    dto: AuthPublisherSignupDto,
  ): Promise<{ success: boolean }> {
    await this.publisherModel.create({
      ...dto,
      publisherUuid: uuidv4(),
    });
    return {
      success: true,
    };
  }
  async getAllPublisherInventory(publisherId: string): Promise<any[]> {
    return await this.publisherInventoryService.getAllPublisherInventory(
      publisherId,
    );
  }
  async createPublisherInventory(
    publisherId: string,
    dto: PublisherInventoryDto,
  ): Promise<any> {
    return await this.publisherInventoryService.createPublisherInventory(
      publisherId,
      dto,
    );
  }
  async editPublisherInventory(
    publisherId: string,
    inventoryId: string,
    dto: PublisherInventoryDto,
  ): Promise<any> {
    return await this.publisherInventoryService.editPublisherInventory(
      publisherId,
      inventoryId,
      dto,
    );
  }
  async deletePublisherInventory(
    publisherId: string,
    inventoryId: string,
  ): Promise<any> {
    return await this.publisherInventoryService.deletePublisherInventory(
      publisherId,
      inventoryId,
    );
  }
}
