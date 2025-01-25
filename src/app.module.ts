

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [UsersModule,AuthModule, ClientesModule],
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
})
export class AppModule {}
