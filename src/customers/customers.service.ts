import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { randomUUID } from 'crypto';
import { prisma } from 'src/libs/prisma/prisma';

@Injectable()
export class CustomersService {

  private readonly customers: Customer[] = [];

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer| any> {
    const foundCustomer = await prisma.customer.findUnique({
      where : {cpf: createCustomerDto.cpf}
    })
    
    if(foundCustomer) {
      return { message : "Customer is exist" }
    }

    return await prisma.customer.create({
      data: createCustomerDto
    })
  }

  async findAll(): Promise<Customer[]> {
    return await prisma.customer.findMany();
  }

  async findOne(id: string): Promise<Customer | any>{
    const foundCustomer = await prisma.customer.findUnique({
      where: {id: id}
    })

    if (!foundCustomer) {
      return { message: "Customer not exist"}
    }
    return foundCustomer; 
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer |  any> {
    const foundCustomer = await prisma.customer.findUnique({
      where: {id: id}
    })

    if (!foundCustomer) {
      return { message: "Customer not exist to edite"}
    }

    const updateCustomer = await prisma.customer.update({
      where: {id: id},
      data: {...updateCustomerDto}
    })
    return updateCustomer;
  }


  async remove(id: string): Promise<void | any> {
    const foundCustomer = await prisma.customer.findUnique({
      where: {id: id}
    })

    if (!foundCustomer) {
      return { message: "Customer not exist to delete"}
    }

    await prisma.customer.delete( { where: { id: id } } );
  }

}
