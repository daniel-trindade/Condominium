import { Module } from '@nestjs/common';
import { CondominosService } from './condominos.service';
import { CondominosController } from './condominos.controller';
import { PrismaService } from 'src/common/prisma.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsuariosModule, AuthModule],
  controllers: [CondominosController],
  providers: [RolesGuard,CondominosService, PrismaService],
})
export class CondominosModule {}
