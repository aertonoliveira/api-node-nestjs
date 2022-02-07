import { User } from 'src/entity/user.entity';

export class OutputUserDto {
  user?: User;
  users?: User[];
  message: string;
}
