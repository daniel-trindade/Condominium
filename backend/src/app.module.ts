import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CondominosModule } from './condominos/condominos.module';
import { PorteirosModule } from './porteiros/porteiros.module';
import { ReservasModule } from './reservas/reservas.module';
import { AcessoModule } from './acesso/acesso.module';
import { CorrespondenciaModule } from './correspondencia/correspondencia.module';
import { VeiculosModule } from './veiculos/veiculos.module';

@Module({
  imports: [AuthModule, UsuariosModule, CondominosModule, PorteirosModule, ReservasModule, AcessoModule, CorrespondenciaModule, VeiculosModule],
})
export class AppModule {}
