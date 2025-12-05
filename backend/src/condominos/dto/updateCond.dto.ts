import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateCondominoDto } from './createCondomino.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateCondDto extends PartialType(CreateCondominoDto){
     // Dados do usuário
  @ApiProperty()
  nome?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  senha?: string;
}
