import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { prisma } from 'src/libs/prisma/prisma';

@Injectable()
export class ServicesService {

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = await prisma.service.create({
      data: { ...createServiceDto }
    });

    if (!newService) {
      throw new NotFoundException('Erro ao criar');
    }

    return {
      ...newService,
      price: newService.price.toNumber(),
    };
  }

  async findAll(): Promise<Service[]> {
    const services = await prisma.service.findMany();
    return services.map(service => ({
      ...service,
      price: service.price.toNumber(),
    }));
  }

  async findOne(id: string): Promise<Service> {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return {
      ...service,
      price: service.price.toNumber(),
    };
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: { ...updateServiceDto },
    });

    return {
      ...updatedService,
      price: updatedService.price.toNumber(),
    };
  }

  async remove(id: string): Promise<void> {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    await prisma.service.delete({
      where: { id },
    });
  }
}