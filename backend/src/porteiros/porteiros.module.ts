import { Module } from '@nestjs/common';
import { PorteirosService } from './porteiros.service';
import { PorteirosController } from './porteiros.controller';
import { PrismaService } from 'src/common/prisma.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule],
  controllers: [PorteirosController],
  providers: [PorteirosService, PrismaService],
})
export class PorteirosModule {}
