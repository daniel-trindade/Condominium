import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CondominosModule } from './condominos/condominos.module';
import { PorteirosModule } from './porteiros/porteiros.module';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [AuthModule, UsuariosModule, CondominosModule, PorteirosModule, ReservasModule],
})
export class AppModule {}
