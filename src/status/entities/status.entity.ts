import { ApiProperty } from '@nestjs/swagger';

export class AppStatus {
  @ApiProperty({
    description: 'server status',
  })
  status: string;

  @ApiProperty({
    description: 'server status response message',
  })
  message: string;

  @ApiProperty({
    description: 'server environment',
  })
  environment: string;
}
