import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { RegistrarAcessoDto } from 'src/acesso/dto/registrar-acesso.dto';
import { RegisterOpenDto } from './dto/register-open.dto';
import { NotifyCondominoDto } from './dto/notify-condomino.dto';
import { RegisterPickupDto } from './dto/register-rpickup.dto';

@Injectable()
export class CorrespondenciaService {
  constructor(private prisma: PrismaService) {}

  async registrarEntrada(dto: RegisterOpenDto) {
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

  async notificarCondomino(dto: NotifyCondominoDto) {
    return this.prisma.notificacao.create({
      data: {
        mensagem: `Você possui uma correspondência aguardando retirada: ${dto.descricao}`,
        condominoId: dto.condominoId,
      },
    });
  }

  async registrarRetirada(id: number, dto: RegisterPickupDto) {
    return this.prisma.correspondencia.update({
      where: { id },
      data: {
        dataRetirada: new Date(),
        retiradoPor: dto.retiradoPor,
      },
    });
  }

  async listarPendentes() {
    return this.prisma.correspondencia.findMany({
      where: { dataRetirada: null },
      include: { condomino: true, porteiro: true },
    });
  }

  async listarHistorico() {
    return this.prisma.correspondencia.findMany({
      include: { condomino: true, porteiro: true },
      orderBy: { dataRecebimento: 'desc' },
    });
  }
}
