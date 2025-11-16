import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateCondominoDto } from './createCondomino.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCondDto extends PartialType(CreateCondominoDto){}
