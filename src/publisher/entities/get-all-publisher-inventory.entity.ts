import { ApiProperty } from '@nestjs/swagger';
import { PublisherInventoryDocument } from 'src/publisher-inventory/schema';
// import { PublisherInventoryEntity } from '../../publisher-inventory/entities';

export class GetAllPublisherInventoryResponse {
  @ApiProperty({
    isArray: true,
  })
  result: PublisherInventoryDocument[];

  @ApiProperty({
    properties: {
      count: {
        type: 'number',
        example: 1,
      },
    },
  })
  metadata: {
    count: number;
    lastUpdated: Date;
  };
}
