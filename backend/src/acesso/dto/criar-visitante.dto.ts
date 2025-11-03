import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CriarVisitanteDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  documento?: string;

  @IsOptional()
  @IsBoolean()
  autorizado?: boolean;
}
