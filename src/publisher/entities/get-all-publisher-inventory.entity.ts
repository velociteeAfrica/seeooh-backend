import { ApiProperty } from '@nestjs/swagger';
import { PublisherInventoryEntity } from '../../publisher-inventory/entities';

export class GetAllPublisherInventoryResponse {
  @ApiProperty({
    isArray: true,
  })
  result: PublisherInventoryEntity;

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
  };
}
