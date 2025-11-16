import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

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
  
  @IsNumber()
  andar: number;
} 