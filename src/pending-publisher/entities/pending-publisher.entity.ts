import { ApiProperty } from '@nestjs/swagger';

export class PendingPublisherReturn {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  companyEmail: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  companyPhone: string;

  @ApiProperty()
  jobTitle: string;

  @ApiProperty()
  createdAt: Date;
}
