import { IsEnum, IsInt, IsString } from 'class-validator';
import { TipoCorrespondencia } from '@prisma/client';

export class RegistrarEntradaDto {
  @IsString()
  descricao: string;

  @IsEnum(TipoCorrespondencia)
  tipo: TipoCorrespondencia;

  @IsInt()
  porteiroId: number;

  @IsInt()
  condominoId: number;
}
