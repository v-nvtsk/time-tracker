import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService, registerConflictMessage } from './auth.service';
import {
  AuthLoginRequestDto,
  AuthLoginFailedResponseDto,
  AuthLoginSuccessResponseDto,
  AuthRefreshFailedResponseDto,
  AuthRefreshSuccessResponseDto,
  AuthRegisterRequestDto,
  AuthRegisterFailedResponseDto,
  AuthRegisterSuccessResponseDto,
} from './auth.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '@/decorators/public';
import { GetUser } from '@/decorators/get-user.decorator';
import { JwtPayload } from '@/types';

@ApiTags(' Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    operationId: 'register',
    summary: 'Регистрация нового пользователя',
    description: 'Создаёт нового пользователя по имени и паролю',
  })
  @Public()
  @Post('register')
  @ApiCreatedResponse({
    description: 'Пользователь создан',
    type: AuthRegisterSuccessResponseDto,
  })
  @ApiConflictResponse({
    description: registerConflictMessage,
    type: AuthRegisterFailedResponseDto,
  })
  async register(
    @Body() body: AuthRegisterRequestDto,
  ): Promise<AuthRegisterSuccessResponseDto> {
    return await this.authService.register(body);
  }

  @ApiOperation({
    operationId: 'login',
    summary: 'Вход пользователя',
    description: 'Проверяет логин и пароль пользователя и возвращает jwt токен',
  })
  @Public()
  @Post('login')
  @ApiOkResponse({
    description: 'Пользователь авторизован',
    type: AuthLoginSuccessResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Неверный логин или пароль',
    type: AuthLoginFailedResponseDto,
  })
  async login(
    @Body() body: AuthLoginRequestDto,
  ): Promise<AuthLoginSuccessResponseDto> {
    return await this.authService.login(body);
  }

  @ApiOperation({
    operationId: 'refresh',
    summary: 'Обновление сессии',
    description: 'Проверяет jwt токен и возвращает новый',
  })
  @Get('refresh')
  @ApiOkResponse({
    description: 'Пользователь авторизован',
    type: AuthRefreshSuccessResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Неверный логин или пароль',
    type: AuthRefreshFailedResponseDto,
  })
  async refresh(
    @GetUser() user: JwtPayload,
  ): Promise<AuthRefreshSuccessResponseDto> {
    if (!user) {
      throw new UnauthorizedException('no token');
    }
    return await this.authService.refresh(user);
  }
}
