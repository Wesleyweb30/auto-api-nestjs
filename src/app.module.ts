import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CustomersModule } from './customers/customers.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [UsersModule,AuthModule, CustomersModule, ServicesModule],
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
})
export class AppModule {}
