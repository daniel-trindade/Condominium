import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateReservasDto } from './dto/createReservas.dto';

@Injectable()
export class ReservasService {
  constructor(private prisma: PrismaService) {}

  async createReservation(data: CreateReservasDto) {
    // Converter para Date
    const start = new Date(data.start);
    const end = new Date(data.end);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date format for start/end.");
    }

    // 1. Buscar área pelo nome
    const area = await this.prisma.areaComum.findFirst({
      where: { nome: data.title },
    });

    if (!area) {
      throw new Error(`Área "${data.title}" não encontrada.`);
    }
    
    const condomino = await this.prisma.condomino.findFirst({
      where: {
        bloco: data.bloco,
        apartamento: data.apto,
      },
    });
    if (!condomino) {
      throw new Error(`Condômino ${data.bloco}-${data.apto} não encontrado.`);
    }

    // Impedir reservas no mesmo horário para a mesma área
    const conflict = await this.prisma.reserva.findFirst({
      where: {
        areaId: area.id,
        OR: [
          {
            dataInicio: { lte: start },
            dataFim: { gte: end },
          },
        ],
      },
    });

    if (conflict) {
      throw new Error('Já existe uma reserva para esta área neste horário.');
    }

    //Impedir mais de uma reserva no mesmo dia por condômino
    const sameDay = await this.prisma.reserva.findFirst({
      where: {
        condominoId: condomino.id,
        dataInicio: {
            gte: new Date(new Date(start).setHours(0, 0, 0, 0)),
          },
        dataFim: {
            lte: new Date(new Date(start).setHours(23, 59, 59, 999)),
        },
      },
    });

    if (sameDay) {
      throw new Error('Você já possui uma reserva neste dia.');
    }

    
    return this.prisma.reserva.create({ 
      data: {
        dataInicio: start,
        dataFim: end,
        areaId: area.id,
        condominoId: condomino.id,
      }, 
    });
}

private formatReservation(r: any){
  return {
      title: r.area.nome,
      apto: r.condomino.apartamento,
      bloco: r.condomino.bloco,
      start: [
        r.dataInicio.getFullYear(),
        r.dataInicio.getMonth() + 1,
        r.dataInicio.getDate(),
        r.dataInicio.getHours(),
        r.dataInicio.getMinutes(),
      ],
      end: [
        r.dataFim.getFullYear(),
        r.dataFim.getMonth() + 1,
        r.dataFim.getDate(),
        r.dataFim.getHours(),
        r.dataFim.getMinutes(),
      ],
      status: r.status,
      id: r.id,
    };
}

  async findAllReservations() {
    const reservas = await this.prisma.reserva.findMany({
      include: { area: true, condomino: { include: { usuario: true } } },
    });
    return reservas.map(r => this.formatReservation(r));

  }

  async findReservationById(id: number) {
    const r = await this.prisma.reserva.findUnique({
      where: { id },
      include: { area: true, condomino: true },
    });

    return this.formatReservation(r);
  }

  async updateReservation(id: number, data: { status?: string }) {
    return this.prisma.reserva.update({
      where: { id },
      data,
    });
  }

  async deleteReservation(id: number) {
    return this.prisma.reserva.delete({ where: { id } });
  }
}
