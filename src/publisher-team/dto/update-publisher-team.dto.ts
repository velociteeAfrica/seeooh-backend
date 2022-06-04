import { Optional } from '@nestjs/common';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdatePublisherTeamDto {
  @Optional()
  @IsNumber()
  @Min(0)
  @Max(2)
  department: string;

  @Optional()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Optional()
  @IsString()
  @IsNotEmpty()
  position: string;

  @Optional()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ValidateIf((o) => o.profilePicture)
  @IsUrl()
  profilePicture: string;
}
