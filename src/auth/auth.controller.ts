import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUserId, Public } from './decorator';
import {
  AuthActivatePendingPublisherDto,
  AuthPublisherLoginDto,
  AuthPublisherSignupDto,
} from './dto';
import { AuthPublisher } from './entities/auth-publisher.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('publisher/login')
  @HttpCode(HttpStatus.OK)
  async authPublisherLogin(
    @Body() dto: AuthPublisherLoginDto,
  ): Promise<AuthPublisher> {
    return this.authService.authPublisherLogin(dto);
  }

  @Public()
  @Post('publisher/signup')
  @HttpCode(HttpStatus.CREATED)
  async authPublisherSignup(
    @Body() dto: AuthPublisherSignupDto,
  ): Promise<{ success: boolean }> {
    return this.authService.authPublisherSignup(dto);
  }

  @Public()
  @Post('publisher/pending/activate')
  @HttpCode(HttpStatus.CREATED)
  async authActivatePendingPublisher(
    @Body() dto: AuthActivatePendingPublisherDto,
  ): Promise<{ success: boolean }> {
    return this.authService.authActivatePendingPublisher(dto);
  }

  @Post('publisher/logout')
  @HttpCode(HttpStatus.OK)
  async authPublisherLogout(@GetCurrentUserId() publisherId: string) {
    return this.authService.authPublisherLogout(publisherId);
  }

  @Post('publisher/session')
  @HttpCode(HttpStatus.OK)
  async authPublisherSession(
    @GetCurrentUserId() publisherId: string,
  ): Promise<AuthPublisher> {
    return this.authService.authPublisherSession(publisherId);
  }
}
