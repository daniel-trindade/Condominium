import { IsString, IsEnum } from 'class-validator';
import { TipoUsuario } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  nome: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;

  @ApiProperty()
  @IsEnum(TipoUsuario)
  tipo: TipoUsuario;
}

