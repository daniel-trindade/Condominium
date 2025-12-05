import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';

class VeiculoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cor: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  modelo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  marca: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  placa: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ano: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bloco: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  apartamento: string;
  foto: string;
}

export class CreateVeiculosDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  condominoId: number;

  @ApiProperty({ type: [VeiculoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeiculoDto)
  veiculos: VeiculoDto[];
}
