import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

import { CriarEntregadorDto } from './dto/criar-entregador.dto';
import { CriarVisitanteDto } from './dto/criar-visitante.dto';
import { RegistrarAcessoDto } from './dto/registrar-acesso.dto';
import { AtualizarAutorizacaoDto } from './dto/atualizar-autorizacao.dto';
@Injectable()
export class AcessoService {
  constructor(private prisma: PrismaService) {}

  
  async cadastrarVisitante(dto: CriarVisitanteDto) {
    return this.prisma.visitante.create({ data: dto });
  }

  
  async cadastrarEntregador(dto: CriarEntregadorDto) {
    return this.prisma.entregador.create({ data: dto });
  }

  
  async atualizarAutorizacao(
    tipo: 'visitante' | 'entregador',
    id: number,
    dto: AtualizarAutorizacaoDto,
  ) {
    if (tipo=== 'entregador') {
      const where = { id };
      return this.prisma.entregador.update({ where, data: dto });
    }
    if (tipo === 'visitante') {
      const where = { id };
      return this.prisma.visitante.update({ where, data: dto });
    }

  }

  
  async buscarPessoa(nome?: string) {
    const [visitantes, entregadores, condominos] = await Promise.all([
      this.prisma.visitante.findMany({
        where: { nome: { contains: nome ?? '' } },
      }),
      this.prisma.entregador.findMany({
        where: { nome: { contains: nome ?? '' } },
      }),
      this.prisma.condomino.findMany({
        where: { usuario: { is: { nome: { contains: nome ?? '' }  } } },
      }),
    ]); 

    return { visitantes, entregadores, condominos };
  }

 
  async registrarAcesso(dto: RegistrarAcessoDto) {
    return this.prisma.acesso.create({
      data: {
        tipo: dto.tipo,
        observacao: dto.observacao,
        porteiroId: dto.porteiroId,
        condominoId: dto.condominoId,
        visitanteId: dto.visitanteId,
        entregadorId: dto.entregadorId,
      },
    });
  }

  
  async registrarSaida(id: number) {
    return this.prisma.acesso.update({
      where: { id },
      data: { dataSaida: new Date() },
    });
  }

  
  async listarHistorico() {
    return this.prisma.acesso.findMany({
      include: {
        visitante: true,
        entregador: true,
        condomino: true,
        porteiro: true,
      },
      orderBy: { dataEntrada: 'desc' },
    });
  }
}
