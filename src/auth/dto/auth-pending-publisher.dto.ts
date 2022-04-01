import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthActivatePendingPublisherDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsEmail()
  companyEmail: string;
}
