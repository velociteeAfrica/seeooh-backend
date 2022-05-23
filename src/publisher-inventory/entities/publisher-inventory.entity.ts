import { ApiProperty } from '@nestjs/swagger';

export class PublisherInventoryEntity {
  @ApiProperty({
    description: 'the id of the inventory',
    example: '4fc67871349bb7bf6a000002',
  })
  _id?: string;

  @ApiProperty({
    description: 'the id of the inventory publisher',
    example: '5gd78982351cc8cg7b156709',
  })
  publisher: string;

  @ApiProperty({
    description: 'the name of the inventory',
    example: 'ALL005MO',
  })
  inventoryName: string;

  @ApiProperty({
    description: 'the category of the inventory',
    example: 'billboard',
  })
  inventoryCategory: string;

  @ApiProperty({
    description: 'the class of the inventory',
    example: 'digital',
  })
  inventoryClass: string;

  @ApiProperty({
    description: 'the inventory type',
    example: 'mega board',
  })
  inventoryType: string;

  @ApiProperty({
    description: 'the inventory height in pixel',
    example: 1200,
  })
  inventoryHeightPixel: number;

  @ApiProperty({
    description: 'the inventory height in metre',
    example: 20,
  })
  inventoryHeightMetre: number;

  @ApiProperty({
    description: 'the inventory width in pixel',
    example: 1500,
  })
  inventoryWidthPixel: number;

  @ApiProperty({
    description: 'the inventory width in metre',
    example: 40,
  })
  inventoryWidthMetre: number;

  @ApiProperty({
    description: 'the inventory location',
    example: 'alvan ikoku way, maitama',
  })
  inventoryLocation: string;

  @ApiProperty({
    description: 'the inventory status',
    example: 'vacant',
  })
  inventoryStatus: string;

  @ApiProperty({
    description: 'the inventory region',
    example: 'northcentral',
  })
  inventoryRegion: string;

  @ApiProperty({
    description: 'the inventory location state',
    example: 'lagos',
  })
  inventoryState: string;

  @ApiProperty({
    description: 'the inventory local government area',
    example: 'ikeja',
  })
  inventoryLga: string;

  // @ApiProperty({
  //   description: 'the inventory city',
  //   example: 'oregun',
  // })
  // inventoryCity: string;

  // @ApiProperty({
  //   description: 'the inventory location coordinate',
  //   example: '6.567, 3.567',
  // })
  // inventoryCoordinate: string;

  @ApiProperty({
    description: 'the inventory amount per annum',
    example: 135000,
  })
  inventoryAmountAnnum: number;

  @ApiProperty({
    description: 'number of inventory slot',
    example: 2,
  })
  inventorySlot: number;

  @ApiProperty({
    description: 'number of inventory face',
    example: 4,
  })
  inventoryFace: number;

  @ApiProperty({
    description: 'number of inventory unit',
    example: 3,
  })
  inventoryUnit: number;

  @ApiProperty({
    description: 'the inventory image url',
    example:
      'https://res.cloudinary.com/adesanza/image/upload/v1624979081/billboard-images/ISH010SU_mn0opx.jpg',
  })
  inventoryImage: string;
}
