import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateVeiculosDto } from './dto/create-veiculo.dto';

@Injectable()
export class VeiculosService {
  constructor(private prisma: PrismaService) {}

  
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
        foto: v.foto,
        condominoId: condominoId,
      })),
    });
  }

 
  async consultarPorPlaca(placa: string) {
    const veiculo = await this.prisma.veiculo.findUnique({
      where: { placa },
      include: { condomino: true },
    });

    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }

    return {
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano,
      placa: veiculo.placa,
      cor: veiculo.cor,
      bloco: veiculo.bloco,
      apartamento: veiculo.apartamento,
      foto: veiculo.foto
    };
  }
}
