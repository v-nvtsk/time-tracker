import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { GetUser } from '@/decorators/get-user.decorator';
import { JwtPayload } from '@/types';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id')
  async findOne(
    @GetUser() user: JwtPayload,
    @Param('id') id: number,
  ): Promise<UserResponseDto> {
    if (user && user.sub === id) {
      const userData = await this.userService.findOneByName(user.username);
      if (!userData) {
        throw new BadRequestException('User not found');
      }
      return userData;
    }
    throw new BadRequestException('Access denied');
  }
}
