/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { OutputUserDto } from '../dtos/user/output/output-user.dto';
import { CreateUserDto } from '../dtos/user/input/CreateUserDto';
import { User } from '../entity/user.entity';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

// const userList: User[] = [
//   new User({
//     id: '9c6efdbe-83b3-41f0-a63f-01325255f03d',
//     email: 'kraus@gmail.com',
//     name: 'kraus',
//     role: 'ADMIN',
//     status: true,
//     password: '$2b$10$cyKpvVhtP93XHSVvQe7Pi.vAqY0XvdcAwCgAwkCud2Epp78x7RfNm',
//     salt: '$2b$10$cyKpvVhtP93XHSVvQe7Pi.',
//     confirmationToken:
//       'c19d84d0236b22ccf0b04326bb75b9df0166adad0ab82229bf82afa9bce86043',
//     recoverToken: null,
//     createdAt: '2022-02-07T17:04:11.393Z',
//     updatedAt: '2022-02-07T17:04:11.393Z'
//   })
// ];
const userEntity: User = {
  id: '9c6efdbe-83b3-41f0-a63f-01325255f03d',
  email: 'kraus@gmail.com',
  name: 'kraus',
  role: 'ADMIN',
  status: true,
  password: '',
  salt: '',
  confirmationToken: '',
  recoverToken: '',
}
const userDtoOutput: OutputUserDto = {
  user: userEntity,
  message: 'Administrador cadastrado com sucesso',
};
const userDtoInput: CreateUserDto = {
  email: "kraus.mal@gmail.gmail",
  name: "kraus",
  password: "123456",
  passwordConfirmation: "123456",
};
describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {
            // findById: jest.fn().mockResolvedValue(userList[0]),
            createAdminUser: jest.fn().mockResolvedValue(userEntity),
            // getUsers: jest.fn().mockResolvedValue(userList),
          },
        },
      ],
      controllers: [UsersController],
    }).compile();

    controller = app.get<UsersController>(UsersController);
    service = app.get<UsersService>(UsersService);
  });

  it('Definindo controle', () => {
    expect(controller).toBeDefined();
  });
  it('Definindo service', () => {
    expect(service).toBeDefined();
  });

  // it('Deve retornar um usuário', async () => {
  //   const user = new User();
  //   user.id = '1';
  //   user.name = 'Teste';
  //   user.email = 'kraus.mal@gmail.com';
  //   user.password = '123456';
  //   user.role = 'ADMIN';
  //   const result = await controller.getUserById('1');
  //   expect(result).toEqual(user);
  // });

  //criar teste para criar usuário
  it('Cadastro usuario', async () => {
    const result = await controller.createAdminUser(userDtoInput);
    expect(result).toEqual(userDtoOutput);
  });

  // it('getUser', async () => {
  // jest.spyOn(service, 'findById').mockImplementationOnce(() =>
  //   of({
  //     username: 'hantsy',
  //     password: 'mysecret',
  //     email: 'hantsy@example.com',
  //     firstName: 'hantsy',
  //     lastName: 'bai',
  //   } as any),
  // );
  // const user = await controller.getUser('id');
  // expect(user.email).toBe('hantsy');
  // expect(user.name).toBe('bai');
  // expect(service.findById).toBeCalledWith('id', false);
  // });
});
