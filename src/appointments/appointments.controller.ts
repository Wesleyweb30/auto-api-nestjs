import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Appointment } from './entities/appointment.entity';

@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) : Promise<Appointment> {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll():  Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Appointment | null> {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>  {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appointmentService.remove(id);
  }
}
