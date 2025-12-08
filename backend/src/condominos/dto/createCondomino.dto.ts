import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class CreateCondominoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsString()
  senha: string;

  @ApiProperty()
  @IsString()
  telefone: string;

  @ApiProperty()
  @IsString()
  apartamento: string;
  
  @ApiProperty()
  @IsString()
  bloco: string;
  
  @ApiProperty()
  @IsOptional()
  data_nasc: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  foto?: string;
} 