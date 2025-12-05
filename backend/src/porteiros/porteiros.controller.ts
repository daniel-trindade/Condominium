import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PorteirosService } from './porteiros.service';
import { CreatePorteiroDto } from './dto/create-porteiro.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdatePorteiroDto } from './dto/update-porteiro.dto';

@Controller('porteiros')
export class PorteirosController {
  constructor(private readonly service: PorteirosService) {}

  @Post()
  async create(@Body() dto: CreatePorteiroDto) {
    return this.service.create(dto);
  }

  @Get()
  async getAll() {
    return this.service.findAll();
  }

  @Get('cpf/:cpf')
  async findBycpf(@Param('cpf') cpf: string) {
    return this.service.findByCpf(cpf);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePorteiroDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }

}
