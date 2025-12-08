import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CorrespondenciaService } from './correspondencia.service';

import { RegistrarAcessoDto } from 'src/acesso/dto/registrar-acesso.dto';
import { RegisterOpenDto } from './dto/register-open.dto';
import { NotifyCondominoDto } from './dto/notify-condomino.dto';
import { RegisterPickupDto } from './dto/register-rpickup.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Correspondências')
@Controller('correspondencias')
export class CorrespondenciaController {
  constructor(private readonly service: CorrespondenciaService) {}

  @Post('entrada')
  @ApiOperation({ summary: 'Registrar entrada de correspondência' })
  registrarEntrada(@Body() dto: RegisterOpenDto) {
    return this.service.registrarEntrada(dto);
  }

  @Post('notificar')
  @ApiOperation({ summary: 'Notificar condômino sobre correspondência' })
  notificarCondomino(@Body() dto: NotifyCondominoDto) {
    return this.service.notificarCondomino(dto);
  }

  @Patch('retirada/:id')
  @ApiOperation({ summary: 'Registrar retirada de correspondência' })
  registrarRetirada(@Param('id') id: string, @Body() dto: RegisterPickupDto) {
    return this.service.registrarRetirada(Number(id), dto);
  }

  @Get('pendentes')
  @ApiOperation({ summary: 'Listar correspondências pendentes' })
  listarPendentes() {
    return this.service.listarPendentes();
  }

  @Get('historico')
  @ApiOperation({ summary: 'Listar histórico de correspondências' })
  listarHistorico() {
    return this.service.listarHistorico();
  }
}
