import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class NotifyCondominoDto {
  @ApiProperty()
  @IsInt()
  condominoId: number;

  @ApiProperty()
  @IsString()
  descricao: string;
}
