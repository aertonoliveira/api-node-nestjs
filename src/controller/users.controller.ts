import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/input/CreateUserDto';
import { OutputUserDto } from 'src/dtos/user/output/output-user.dto';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
    //
  }

  @Post()
  async createAdminUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<OutputUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }
  @Get()
  async getUsers(): Promise<OutputUserDto> {
    const users = await this.usersService.getUsers();
    return {
      users,
      message: 'Usuários listados com sucesso',
    };
  }
}
