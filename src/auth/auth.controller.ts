import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './decorator';
import { AuthPublisherLoginDto, AuthPublisherSignupDto } from './dto';
import { AuthToken } from './entities';
import { AuthPublisher } from './entities/auth-publisher.entity';
import { JwtRefreshGuard } from './guard';

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
  ): Promise<AuthPublisher> {
    return this.authService.authPublisherSignup(dto);
  }

  @Post('publisher/logout')
  @HttpCode(HttpStatus.OK)
  async authPublisherLogout(@GetCurrentUserId() publisherId: string) {
    return this.authService.authPublisherLogout(publisherId);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('publisher/refresh')
  @HttpCode(HttpStatus.OK)
  async authPublisherRefreshTokens(
    @GetCurrentUserId() publisherId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<AuthToken> {
    return this.authService.authPublisherRefreshTokens(
      publisherId,
      refreshToken,
    );
  }
}
