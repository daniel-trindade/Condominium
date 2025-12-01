import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class CreateCondominoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  cpf: string;

  @IsString()
  senha: string;

  @IsString()
  telefone: string;

  @IsString()
  apartamento: string;
  
  @IsString()
  bloco: string;
  
  @IsOptional()
  data_nasc: Date;

  @IsOptional()
  @IsString()
  foto?: string;
} 