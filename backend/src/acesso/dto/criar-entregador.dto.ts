import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CriarEntregadorDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  empresa?: string;

  @IsOptional()
  @IsString()
  documento?: string;

  @IsOptional()
  @IsBoolean()
  autorizado?: boolean;
}
