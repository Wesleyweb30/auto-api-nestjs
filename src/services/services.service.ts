import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ServicesService {
  private readonly services: Service[] = [];

  create(createServiceDto: CreateServiceDto): Service {
    const newService: Service = {
      id: randomUUID(),
      ...createServiceDto,
    };
    this.services.push(newService);
    return newService;
  }

  findAll(): Service[] {
    return this.services;
  }

  findOne(id: string): Service {
    const service = this.services.find((s) => s.id === id);
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  update(id: string, updateServiceDto: UpdateServiceDto): Service {
    const serviceIndex = this.services.findIndex((s) => s.id === id);
    if (serviceIndex === -1) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    const updatedService = {
      ...this.services[serviceIndex],
      ...updateServiceDto,
    };
    this.services[serviceIndex] = updatedService;
    return updatedService;
  }

  remove(id: string): void {
    const serviceIndex = this.services.findIndex((s) => s.id === id);
    if (serviceIndex === -1) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    this.services.splice(serviceIndex, 1);
  }
}
