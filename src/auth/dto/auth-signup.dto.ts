import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthPublisherSignupDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  companyEmail: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  companyPhone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
