import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CorrespondenciaService } from './correspondencia.service';

import { RegistrarAcessoDto } from 'src/acesso/dto/registrar-acesso.dto';
import { RegistrarEntradaDto } from './dto/registrar-entrada.dto';
import { NotificarCondominoDto } from './dto/notificar-condomino.dto';
import { RegistrarRetiradaDto } from './dto/registrar-retirada.dto';

@Controller('correspondencias')
export class CorrespondenciaController {
  constructor(private readonly service: CorrespondenciaService) {}

  @Post('entrada')
  registrarEntrada(@Body() dto: RegistrarEntradaDto) {
    return this.service.registrarEntrada(dto);
  }

  @Post('notificar')
  notificarCondomino(@Body() dto: NotificarCondominoDto) {
    return this.service.notificarCondomino(dto);
  }

  @Patch('retirada/:id')
  registrarRetirada(@Param('id') id: string, @Body() dto: RegistrarRetiradaDto) {
    return this.service.registrarRetirada(Number(id), dto);
  }

  @Get('pendentes')
  listarPendentes() {
    return this.service.listarPendentes();
  }

  @Get('historico')
  listarHistorico() {
    return this.service.listarHistorico();
  }
}
