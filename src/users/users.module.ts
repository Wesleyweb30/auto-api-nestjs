import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
