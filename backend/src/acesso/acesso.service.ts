import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  CriarVisitanteDto,
  CriarEntregadorDto,
  RegistrarAcessoDto,
  AtualizarAutorizacaoDto,
} from './dto';

@Injectable()
export class AcessoService {
  constructor(private prisma: PrismaService) {}

  // 🔹 Cadastrar visitante
  async cadastrarVisitante(dto: CriarVisitanteDto) {
    return this.prisma.visitante.create({ data: dto });
  }

  // 🔹 Cadastrar entregador
  async cadastrarEntregador(dto: CriarEntregadorDto) {
    return this.prisma.entregador.create({ data: dto });
  }

  // 🔹 Atualizar autorização
  async atualizarAutorizacao(
    tipo: 'visitante' | 'entregador',
    id: number,
    dto: AtualizarAutorizacaoDto,
  ) {
    const model = tipo === 'visitante' ? this.prisma.visitante : this.prisma.entregador;
    return model.update({
      where: { id },
      data: { autorizado: dto.autorizado },
    });
  }

  // 🔹 Buscar pessoa (visitante, entregador ou condômino)
  async buscarPessoa(nome?: string) {
    const [visitantes, entregadores, condominos] = await Promise.all([
      this.prisma.visitante.findMany({
        where: { nome: { contains: nome ?? '' } },
      }),
      this.prisma.entregador.findMany({
        where: { nome: { contains: nome ?? '' } },
      }),
      this.prisma.condomino.findMany({
        where: { nome: { contains: nome ?? '' } },
      }),
    ]);

    return { visitantes, entregadores, condominos };
  }

  // 🔹 Registrar acesso
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

  // 🔹 Registrar saída
  async registrarSaida(id: number) {
    return this.prisma.acesso.update({
      where: { id },
      data: { dataSaida: new Date() },
    });
  }

  // 🔹 Histórico de acessos
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
