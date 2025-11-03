import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CondominosModule } from './condominos/condominos.module';

@Module({
  imports: [AuthModule, UsuariosModule, CondominosModule],
})
export class AppModule {}
