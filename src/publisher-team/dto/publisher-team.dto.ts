import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class PublisherTeamDto {
  @IsNumber()
  @Min(0)
  @Max(2)
  department: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ValidateIf((o) => o.profilePicture)
  @IsUrl()
  profilePicture: string;
}
