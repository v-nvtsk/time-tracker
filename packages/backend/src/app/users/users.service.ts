import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(UserResponseDto, users);
  }

  async findOneByName(username: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
