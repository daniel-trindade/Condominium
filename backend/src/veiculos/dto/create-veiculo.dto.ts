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
  @IsString()
  @IsNotEmpty()
  cor: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  placa: string;

  @IsNumber()
  @IsNotEmpty()
  ano: number;

  @IsString()
  @IsNotEmpty()
  bloco: string;

  @IsString()
  @IsNotEmpty()
  apartamento: string;
}

export class CreateVeiculosDto {
  @IsInt()
  @IsNotEmpty()
  condominoId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VeiculoDto)
  veiculos: VeiculoDto[];
}
