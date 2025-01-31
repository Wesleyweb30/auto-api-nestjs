import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { randomUUID } from 'crypto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  private list: Appointment[] = [];

  create(createAppointmentDto: CreateAppointmentDto) {
    const newAppointment: Appointment = {
      id: randomUUID(),
      date: createAppointmentDto.date,
      customerId: createAppointmentDto.customerId,
      serviceIds: createAppointmentDto.serviceIds,
    };

    this.list.push(newAppointment);
    return newAppointment;
  }

  findAll() {
    return this.list;
  }

  findOne(id: string) {
    return this.list.find((appointment) => appointment.id === id);
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const index = this.list.findIndex((appointment) => appointment.id === id);
    if (index === -1) return null;

    this.list[index] = { ...this.list[index], ...updateAppointmentDto };
    return this.list[index];
  }

  remove(id: string) {
    const index = this.list.findIndex((appointment) => appointment.id === id);
    if (index === -1) return null;

    return this.list.splice(index, 1)[0];
  }
}
