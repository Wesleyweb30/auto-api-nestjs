import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {hashSync as bcryptHashSync} from 'bcrypt'
import { prisma } from 'src/libs/prisma/prisma';

@Injectable()
export class UsersService {

  private readonly users: User[] = [];

  async create(createUserDto: CreateUserDto) : Promise<User | undefined> {
    const {username, password} = createUserDto;
    const newUser = await prisma.user.create({
      data: {
        username,
        password : bcryptHashSync(password, 10)
      }
    })
    if(!newUser){
      return;
    }

    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany()
  }


  async findOne(username: string) : Promise<User | undefined> {
    const foundUser = await prisma.user.findUnique({
      where: {username : username}  
    })
    if(!foundUser) {
      return null;
    }

    return foundUser;
  }

  async findById(id: string) : Promise<User | undefined> {
    const foundUser = await prisma.user.findUnique({
      where: {id : id}  
    })
    if(!foundUser) {
      return null;
    }

    return foundUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) : Promise<User | undefined> {
    const foundUserr = await prisma.user.findUnique({
      where: {id: id}
    })

    if(!foundUserr) {
      return;
    }

    const updateUser = await prisma.user.update({
      where: {id: id},
      data: updateUserDto
    })

    return updateUser;
  }

  async remove(id: string){
    await prisma.user.delete({
      where: {id : id}
    });
  }
}
