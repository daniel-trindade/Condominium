import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AcessoService } from './acesso.service';
import {
  CriarVisitanteDto,
  CriarEntregadorDto,
  RegistrarAcessoDto,
  AtualizarAutorizacaoDto,
} from './dto';

@Controller('acesso')
export class AcessoController {
  constructor(private readonly service: AcessoService) {}

  @Post('visitantes')
  cadastrarVisitante(@Body() dto: CriarVisitanteDto) {
    return this.service.cadastrarVisitante(dto);
  }

  @Post('entregadores')
  cadastrarEntregador(@Body() dto: CriarEntregadorDto) {
    return this.service.cadastrarEntregador(dto);
  }

  @Patch(':tipo/:id/autorizacao')
  atualizarAutorizacao(
    @Param('tipo') tipo: 'visitante' | 'entregador',
    @Param('id') id: string,
    @Body() dto: AtualizarAutorizacaoDto,
  ) {
    return this.service.atualizarAutorizacao(tipo, Number(id), dto);
  }

  @Get('pessoas')
  buscarPessoa(@Query('nome') nome?: string) {
    return this.service.buscarPessoa(nome);
  }

  @Post('entrada')
  registrarAcesso(@Body() dto: RegistrarAcessoDto) {
    return this.service.registrarAcesso(dto);
  }

  @Patch('saida/:id')
  registrarSaida(@Param('id') id: string) {
    return this.service.registrarSaida(Number(id));
  }

  @Get('historico')
  listarHistorico() {
    return this.service.listarHistorico();
  }
}
