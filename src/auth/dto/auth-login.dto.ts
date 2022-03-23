import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthPublisherLoginDto {
  @IsEmail()
  companyEmail: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
