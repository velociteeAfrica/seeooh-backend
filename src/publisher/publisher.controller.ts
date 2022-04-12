import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../auth/decorator';
import { PublisherInventoryDto } from '../publisher-inventory/dto';
import { GetAllPublisherInventoryResponse } from './entities';
import { PublisherService } from './publisher.service';

@ApiTags('publishers')
@Controller('publishers')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}
  @Get('/')
  async findAll(): Promise<any> {
    return this.publisherService.findAll();
  }
  @ApiOkResponse({
    type: GetAllPublisherInventoryResponse,
    description: 'returns all the publisher inventory',
  })
  @Get(':id/inventory')
  async getAllPublisherInventory(
    @GetCurrentUserId() publisherId: string,
    @Param('id') id: string,
  ): Promise<GetAllPublisherInventoryResponse> {
    if (id !== publisherId) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return this.publisherService.getAllPublisherInventory(publisherId);
  }
  @Post(':id/inventory')
  async createPublisherInventory(
    @GetCurrentUserId() publisherId: string,
    @Param('id') id: string,
    @Body() dto: PublisherInventoryDto,
  ): Promise<any> {
    if (id !== publisherId) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return this.publisherService.createPublisherInventory(publisherId, dto);
  }
  @Patch(':id/inventory/:inventoryId')
  async editPublisherInventory(
    @GetCurrentUserId() publisherId: string,
    @Param('id') id: string,
    @Param('inventoryId') inventoryId: string,
    @Body() dto: PublisherInventoryDto,
  ): Promise<any> {
    if (id !== publisherId) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return this.publisherService.editPublisherInventory(
      publisherId,
      inventoryId,
      dto,
    );
  }
  @Delete(':id/inventory/:inventoryId')
  async deletePublisherInventory(
    @GetCurrentUserId() publisherId: string,
    @Param('id') id: string,
    @Param('inventoryId') inventoryId: string,
  ): Promise<any> {
    if (id !== publisherId) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return this.publisherService.deletePublisherInventory(
      publisherId,
      inventoryId,
    );
  }
}
