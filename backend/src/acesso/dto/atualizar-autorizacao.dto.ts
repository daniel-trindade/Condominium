import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class AtualizarAutorizacaoDto {
  @ApiProperty()
  @IsBoolean()
  autorizado: boolean;
}
