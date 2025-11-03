import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PorteirosService } from './porteiros.service';

@Controller('porteiros')
export class PorteirosController {
  constructor(private readonly service: PorteirosService) {}

  @Post()
  async criar(
    @Body()
    body: {
      nome: string;
      email: string;
      cpf: string;
      telefone: string;
      senha: string;
      turno: string;
    },
  ) {
    return this.service.criar(body);
  }

  @Get()
  async listar() {
    return this.service.listar();
  }

  @Get('cpf/:cpf')
  async findBycpf(@Param('cpf') cpf: string) {
    return this.service.buscarPorCpf(cpf);
  }

}
