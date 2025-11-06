import { IsString } from 'class-validator';

export class RegistrarRetiradaDto {
  @IsString()
  retiradoPor: string;
}
