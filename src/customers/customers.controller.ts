import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';


@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Customer {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(): Customer[] {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Customer {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Customer {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.customersService.remove(id);
  }
}
