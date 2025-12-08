import { IsEnum, IsInt, IsString } from 'class-validator';
import { TipoCorrespondencia } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterOpenDto {
  @ApiProperty()
  @IsString()
  descricao: string;

  @ApiProperty()
  @IsEnum(TipoCorrespondencia)
  tipo: TipoCorrespondencia;

  @ApiProperty()
  @IsInt()
  porteiroId: number;

  @ApiProperty()
  @IsInt()
  condominoId: number;
}
