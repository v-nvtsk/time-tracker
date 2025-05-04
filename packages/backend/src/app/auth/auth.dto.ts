import { HttpStatus } from '@nestjs/common';
import { ApiHideProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ErrorResponseDto } from '@/types/error.response.dto';
import { Exclude } from 'class-transformer';

@ApiSchema({ name: 'LoginRequest' })
export class AuthLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

@ApiSchema({ name: 'LoginSuccessResponse' })
export class AuthLoginSuccessResponseDto {
  username: string;
  token: string;
}

@ApiSchema({ name: 'LogoutSuccessResponse' })
export class AuthLogoutResponseDto {
  @IsString()
  token: string;
}

@ApiSchema({ name: 'RegisterRequest' })
export class AuthRegisterRequestDto extends AuthLoginRequestDto {}

@ApiSchema({ name: 'RegisterSuccessResponse' })
export class AuthRegisterSuccessResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  password: string;
}

@ApiSchema({ name: 'LoginFailedResponse' })
export class AuthLoginFailedResponseDto extends ErrorResponseDto {
  constructor() {
    super(HttpStatus.UNAUTHORIZED);
  }
}

@ApiSchema({ name: 'RegisterFailedResponse' })
export class AuthRegisterFailedResponseDto extends ErrorResponseDto {
  constructor() {
    super(HttpStatus.CONFLICT);
  }
}

@ApiSchema({ name: 'RefreshAuthRequest' })
export class AuthRefreshRequestDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

@ApiSchema({ name: 'RefreshAuthSuccessResponse' })
export class AuthRefreshSuccessResponseDto extends AuthLoginSuccessResponseDto {}

@ApiSchema({ name: 'RefreshAuthFailedResponse' })
export class AuthRefreshFailedResponseDto extends AuthLoginFailedResponseDto {}
