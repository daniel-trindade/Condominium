import { Module } from '@nestjs/common';
import { AcessoService } from './acesso.service';
import { AcessoController } from './acesso.controller';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  controllers: [AcessoController],
  providers: [AcessoService, PrismaService],
})
export class AcessoModule {}
