import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CustomersModule } from './customers/customers.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [UsersModule,AuthModule, CustomersModule, ServicesModule, AppointmentsModule],
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
})
export class AppModule {}
