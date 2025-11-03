import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateVeiculosDto } from './dto/create-veiculo.dto';

@Injectable()
export class VeiculosService {
  constructor(private prisma: PrismaService) {}

  // 🔹 Cadastrar vários veículos
   async cadastrarVeiculos(dto: CreateVeiculosDto) {
    const { condominoId, veiculos } = dto;

    return this.prisma.veiculo.createMany({
      data: veiculos.map((v) => ({
        cor: v.cor,
        modelo: v.modelo,
        marca: v.marca,
        placa: v.placa,
        ano: v.ano,
        bloco: v.bloco,
        apartamento: v.apartamento,
        condominoId: condominoId,
      })),
    });
  }

  // Consultar veículo por placa
  async consultarPorPlaca(placa: string) {
    return this.prisma.veiculo.findUnique({
      where: { placa },
      include: { condomino: true },
    });
  }
}
