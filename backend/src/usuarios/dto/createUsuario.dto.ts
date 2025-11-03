import { IsString, IsEnum } from 'class-validator';
import { TipoUsuario } from '@prisma/client';

export class CreateUsuarioDto {
  @IsString()
  nome: string;
  email: string;
  senha: string;

  @IsEnum(TipoUsuario)
  tipo: TipoUsuario;
}

