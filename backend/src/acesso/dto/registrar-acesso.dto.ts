import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TipoAcesso } from '@prisma/client';

export class RegistrarAcessoDto {
  @IsEnum(TipoAcesso)
  tipo: TipoAcesso;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsOptional()
  @IsInt()
  condominoId?: number;

  @IsOptional()
  @IsInt()
  visitanteId?: number;

  @IsOptional()
  @IsInt()
  entregadorId?: number;

  @IsInt()
  porteiroId: number;
}
