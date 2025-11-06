//import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCondominoDto {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  telefone: string;
  apartamento: string;
  andar: number;
} 