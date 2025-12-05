import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CriarVisitanteDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  documento?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  autorizado?: boolean;
}
