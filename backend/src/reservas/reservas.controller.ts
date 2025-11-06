import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservasService } from './reservas.service';

@Controller('reservas')
export class ReservasController {
  constructor(private service: ReservasService) {}

  @Post()
  criar(@Body() body: {
    dataReserva: Date;
    horarioInicio: Date;
    horarioFim: Date;
    areaId: number;
    condominoId: number;
  }) {
    return this.service.criarReserva(body);
  }

  @Get()
  listar() {
    return this.service.listarReservas();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.service.buscarPorId(Number(id));
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() body: { status?: string }) {
    return this.service.atualizarReserva(Number(id), body);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.service.deletarReserva(Number(id));
  }
}
