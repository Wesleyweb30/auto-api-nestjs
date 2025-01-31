import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {hashSync as bcryptHashSync} from 'bcrypt'

@Injectable()
export class UsersService {

  private readonly users: User[] = [
    {
      id: '1',
      username: 'admin',
      password: '$2b$10$cFw7sECP5Vi0EwB0u5JYhuQZuDjYNUnWjujPIcw2rENWdV3p2aaOC',
    },
    {
      id: '2',
      username: 'maria',
      password: 'guess',
    },
  ];

  create(createUserDto: CreateUserDto) {
    createUserDto.password = bcryptHashSync(createUserDto.password, 10);
    this.users.push(createUserDto)
    return createUserDto;
  }

  findAll(): User[] {
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return 'This action delete a id user'
  }
}
