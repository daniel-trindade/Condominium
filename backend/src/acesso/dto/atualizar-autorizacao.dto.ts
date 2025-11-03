import { IsBoolean } from 'class-validator';

export class AtualizarAutorizacaoDto {
  @IsBoolean()
  autorizado: boolean;
}
