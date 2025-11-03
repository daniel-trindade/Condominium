import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class ReservasService {
  constructor(private prisma: PrismaService) {}

  async criarReserva(data: {
  dataReserva: Date;
  horarioInicio: Date;
  horarioFim: Date;
  areaId: number;
  condominoId: number;
}) {
  // Impedir reservas no mesmo horário para a mesma área
  const conflito = await this.prisma.reserva.findFirst({
    where: {
      areaId: data.areaId,
      dataReserva: data.dataReserva,
      OR: [
        {
          horarioInicio: { lte: data.horarioFim },
          horarioFim: { gte: data.horarioInicio },
        },
      ],
    },
  });

  if (conflito) {
    throw new Error('Já existe uma reserva para esta área neste horário.');
  }

  //Impedir mais de uma reserva no mesmo dia por condômino
  const reservaExistente = await this.prisma.reserva.findFirst({
    where: {
      condominoId: data.condominoId,
      dataReserva: data.dataReserva,
    },
  });

  if (reservaExistente) {
    throw new Error('Você já possui uma reserva neste dia.');
  }

  
  return this.prisma.reserva.create({ data });
}


  async listarReservas() {
    return this.prisma.reserva.findMany({
      include: { area: true, condomino: { include: { usuario: true } } },
    });
  }

  async buscarPorId(id: number) {
    return this.prisma.reserva.findUnique({
      where: { id },
      include: { area: true, condomino: { include: { usuario: true } } },
    });
  }

  async atualizarReserva(id: number, data: Partial<{ status: string }>) {
    return this.prisma.reserva.update({
      where: { id },
      data,
    });
  }

  async deletarReserva(id: number) {
    return this.prisma.reserva.delete({ where: { id } });
  }
}
