import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/input/CreateUserDto';
import { OutputUserDto } from '../dtos/user/output/output-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
    //
  }

  @Post()
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<OutputUserDto> {
    try {
      const user = await this.usersService.createAdminUser(createUserDto);
      return {
        user,
        message: 'Usuário criado com sucesso',
      };
    } catch (error: any) {
      return {
        message: error.message,
      };
    }
  }
  @Get()
  async getUsers(): Promise<OutputUserDto> {
    const users = await this.usersService.getUsers();
    return {
      users,
      message: 'Usuários listados com sucesso',
    };
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
