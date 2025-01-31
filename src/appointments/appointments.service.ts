import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { prisma } from 'src/libs/prisma/prisma';

@Injectable()
export class AppointmentsService {
  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { date, customerId, serviceIds } = createAppointmentDto;

    const customerExists = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customerExists) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        date,
        customerId,
        services: {
          create: serviceIds.map((serviceId) => ({
            service: {
              connect: { id: serviceId },
            },
          })),
        },
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });

    // Calcula o preço total somando os preços dos serviços
    const totalPrice = newAppointment.services.reduce((total, s) => total + Number(s.service.price), 0);

    return {
      id: newAppointment.id,
      date: newAppointment.date,
      customerId: newAppointment.customerId,
      services: newAppointment.services.map((s) => ({
        id: s.service.id,
        name: s.service.name,
        price: Number(s.service.price),
      })),
      totalPrice,
    };
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await prisma.appointment.findMany({
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });

    return appointments.map((appointment) => {
      const totalPrice = appointment.services.reduce((total, s) => total + Number(s.service.price), 0);
      return {
        id: appointment.id,
        date: appointment.date,
        customerId: appointment.customerId,
        services: appointment.services.map((s) => ({
          id: s.service.id,
          name: s.service.name,
          price: Number(s.service.price),
        })),
        totalPrice,
      };
    });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    const totalPrice = appointment.services.reduce((total, s) => total + Number(s.service.price), 0);

    return {
      id: appointment.id,
      date: appointment.date,
      customerId: appointment.customerId,
      services: appointment.services.map((s) => ({
        id: s.service.id,
        name: s.service.name,
        price: Number(s.service.price),
      })),
      totalPrice,
    };
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const { date, customerId, serviceIds } = updateAppointmentDto;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        services: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    await prisma.appointmentService.deleteMany({
      where: { appointmentId: id },
    });

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        date,
        customerId,
        services: {
          create: serviceIds.map((serviceId) => ({
            service: {
              connect: { id: serviceId },
            },
          })),
        },
      },
      include: {
        services: {
          include: {
            service: true,
          },
        },
      },
    });

    const totalPrice = updatedAppointment.services.reduce((total, s) => total + Number(s.service.price), 0);

    return {
      id: updatedAppointment.id,
      date: updatedAppointment.date,
      customerId: updatedAppointment.customerId,
      services: updatedAppointment.services.map((s) => ({
        id: s.service.id,
        name: s.service.name,
        price: Number(s.service.price),
      })),
      totalPrice,
    };
  }

  async remove(id: string): Promise<void> {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    await prisma.appointmentService.deleteMany({
      where: { appointmentId: id },
    });

    await prisma.appointment.delete({
      where: { id },
    });
  }
}
