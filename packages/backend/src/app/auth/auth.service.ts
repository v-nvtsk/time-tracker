import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import {
  AuthLoginRequestDto,
  AuthLoginSuccessResponseDto,
  AuthRegisterRequestDto,
  AuthRegisterSuccessResponseDto,
} from './auth.dto';
import { checkPassword, hashPassword } from '@/utils/password';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { JwtPayload } from '@/types';

@Injectable()
export class AuthService {
  jwtSecret: string;
  jwtExpiresIn: number;
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('app.jwtSecret')!;
    this.jwtExpiresIn = this.configService.get<number>('app.jwtExpiresIn')!;
  }

  async register({
    username,
    password,
  }: AuthRegisterRequestDto): Promise<AuthRegisterSuccessResponseDto> {
    const existingUser = await this.usersService.findOneByName(username);
    if (existingUser) {
      throw new ConflictException(registerConflictMessage);
    }

    const hashedPassword = hashPassword(password);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    const result = await this.usersRepository.save(user);

    return plainToInstance(AuthRegisterSuccessResponseDto, result);
  }

  async login(
    payload: AuthLoginRequestDto,
  ): Promise<AuthLoginSuccessResponseDto> {
    const user = await this.usersService.findOneByName(payload.username);
    if (!user || !checkPassword(payload.password, user.password)) {
      throw new UnauthorizedException('Login failed');
    }
    const token = await this.jwtService.signAsync(
      { username: user.username, sub: user.id },
      {
        secret: this.jwtSecret,
        expiresIn: this.jwtExpiresIn,
      },
    );
    return { username: payload.username, token };
  }

  async refresh(payload: JwtPayload) {
    const user = await this.usersService.findOneByName(payload.username);
    if (!user) {
      throw new UnauthorizedException('Login failed');
    }
    const token = await this.jwtService.signAsync(
      { username: user.username, sub: user.id },
      {
        secret: this.jwtSecret,
        expiresIn: this.jwtExpiresIn,
      },
    );
    return { username: payload.username, token };
  }
}

export const registerConflictMessage =
  'Пользователь с таким именем уже существует';
