import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { PublisherInventoryDto } from './dto';
import { PublisherInventory, PublisherInventoryDocument } from './schema';

@Injectable()
export class PublisherInventoryService {
  constructor(
    @InjectModel(PublisherInventory.name)
    private publisherModel: Model<PublisherInventoryDocument>,
  ) {}
  async getAllPublisherInventory(
    publisherId: string,
  ): Promise<PublisherInventory[]> {
    return await this.publisherModel
      .find({ publisher: publisherId })
      .select(['-inventoryUuid', '-__v']);
  }
  async createPublisherInventory(
    publisherId: string,
    dto: PublisherInventoryDto,
  ): Promise<PublisherInventory> {
    const newPublisherInventory = await this.publisherModel.create({
      ...dto,
      publisher: publisherId,
      inventoryUuid: uuidv4(),
    });
    const newPublisherInventoryObject = { ...newPublisherInventory.toObject() };
    delete newPublisherInventoryObject.inventoryUuid;
    delete newPublisherInventoryObject.__v;
    return newPublisherInventoryObject;
  }
  async editPublisherInventory(
    publisherId: string,
    inventoryId: string,
    dto: PublisherInventoryDto,
  ): Promise<PublisherInventory> {
    const updatedPublisherInventory = await this.publisherModel
      .findOneAndUpdate(
        {
          publisher: publisherId,
          _id: inventoryId,
        },
        dto,
        { new: true },
      )
      .select(['-inventoryUuid', '-__v']);
    return updatedPublisherInventory;
  }
  async deletePublisherInventory(
    publisherId: string,
    inventoryId: string,
  ): Promise<{ success: boolean }> {
    await this.publisherModel.findOneAndDelete({
      publisher: publisherId,
      _id: inventoryId,
    });
    return {
      success: true,
    };
  }
}
