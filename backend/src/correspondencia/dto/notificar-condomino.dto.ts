import { IsInt, IsString } from 'class-validator';

export class NotificarCondominoDto {
  @IsInt()
  condominoId: number;

  @IsString()
  descricao: string;
}
