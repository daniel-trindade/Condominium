import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CriarEntregadorDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  empresa?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  documento?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  autorizado?: boolean;
}
