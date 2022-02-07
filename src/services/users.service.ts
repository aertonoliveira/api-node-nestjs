import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user/input/CreateUserDto';
import { User } from 'src/entity/user.entity';
import { UserRole } from 'src/enums/user-roles.enum';
import { UserRepository } from 'src/repository/user/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    //
  }

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
    }
  }
  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }
}
