import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  RegistrarEntradaDto,
  RegistrarRetiradaDto,
  NotificarCondominoDto,
} from './dto';

@Injectable()
export class CorrespondenciaService {
  constructor(private prisma: PrismaService) {}

  // 🔹 Registrar entrada de correspondência
  async registrarEntrada(dto: RegistrarEntradaDto) {
    return this.prisma.correspondencia.create({
      data: {
        descricao: dto.descricao,
        tipo: dto.tipo,
        dataRecebimento: new Date(),
        porteiroId: dto.porteiroId,
        condominoId: dto.condominoId,
      },
    });
  }

  // 🔹 Notificar condômino (gera notificação)
  async notificarCondomino(dto: NotificarCondominoDto) {
    return this.prisma.notificacao.create({
      data: {
        mensagem: `Você possui uma correspondência aguardando retirada: ${dto.descricao}`,
        condominoId: dto.condominoId,
      },
    });
  }

  // 🔹 Registrar retirada
  async registrarRetirada(id: number, dto: RegistrarRetiradaDto) {
    return this.prisma.correspondencia.update({
      where: { id },
      data: {
        dataRetirada: new Date(),
        retiradoPor: dto.retiradoPor,
      },
    });
  }

  // 🔹 Listar correspondências pendentes
  async listarPendentes() {
    return this.prisma.correspondencia.findMany({
      where: { dataRetirada: null },
      include: { condomino: true, porteiro: true },
    });
  }

  // 🔹 Histórico de correspondências
  async listarHistorico() {
    return this.prisma.correspondencia.findMany({
      include: { condomino: true, porteiro: true },
      orderBy: { dataRecebimento: 'desc' },
    });
  }
}
