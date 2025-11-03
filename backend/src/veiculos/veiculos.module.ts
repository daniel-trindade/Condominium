import { Module } from '@nestjs/common';
import { VeiculosController } from './veiculos.controller';
import { VeiculosService } from './veiculos.service';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  controllers: [VeiculosController],
  providers: [VeiculosService, PrismaService],
})
export class VeiculosModule {}
