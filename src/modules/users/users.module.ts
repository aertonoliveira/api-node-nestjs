import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controller/users.controller';
import { UserRepository } from 'src/repository/user/users.repository';
import { UsersService } from 'src/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  //
}
