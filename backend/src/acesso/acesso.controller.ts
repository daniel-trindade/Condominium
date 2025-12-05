import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AcessoService } from './acesso.service';
import { CriarEntregadorDto } from './dto/criar-entregador.dto';
import { CriarVisitanteDto } from './dto/criar-visitante.dto';
import { RegistrarAcessoDto } from './dto/registrar-acesso.dto';
import { AtualizarAutorizacaoDto } from './dto/atualizar-autorizacao.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Acesso')
@Controller('acesso')
export class AcessoController {
  constructor(private readonly service: AcessoService) {}

  @Post('visitantes')
  @ApiOperation({ summary: 'Cadastrar visitante' })
  cadastrarVisitante(@Body() dto: CriarVisitanteDto) {
    return this.service.cadastrarVisitante(dto);
  }

  @Post('entregadores')
  @ApiOperation({ summary: 'Cadastrar entregador' })
  cadastrarEntregador(@Body() dto: CriarEntregadorDto) {
    return this.service.cadastrarEntregador(dto);
  }

  @Patch(':tipo/:id/autorizacao')
  @ApiOperation({ summary: 'Atualizar autorização' })
  atualizarAutorizacao(
    @Param('tipo') tipo: 'visitante' | 'entregador',
    @Param('id') id: string,
    @Body() dto: AtualizarAutorizacaoDto,
  ) {
    return this.service.atualizarAutorizacao(tipo, Number(id), dto);
  }

  @Get('pessoas')
  @ApiOperation({ summary: 'Buscar pessoas por nome' })
  buscarPessoa(@Query('nome') nome?: string) {
    return this.service.buscarPessoa(nome);
  }

  @Post('entrada')
  @ApiOperation({ summary: 'Registrar entrada' })
  registrarAcesso(@Body() dto: RegistrarAcessoDto) {
    return this.service.registrarAcesso(dto);
  }

  @Patch('saida/:id')
  @ApiOperation({ summary: 'Registrar saída' })
  registrarSaida(@Param('id') id: string) {
    return this.service.registrarSaida(Number(id));
  }

  @Get('historico')
  @ApiOperation({ summary: 'Listar histórico de acessos' })
  listarHistorico() {
    return this.service.listarHistorico();
  }
}
