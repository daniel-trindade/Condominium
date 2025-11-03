import { Module } from '@nestjs/common';
import { CorrespondenciaService } from './correspondencia.service';
import { CorrespondenciaController } from './correspondencia.controller';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  controllers: [CorrespondenciaController],
  providers: [CorrespondenciaService, PrismaService],
})
export class CorrespondenciaModule {}
