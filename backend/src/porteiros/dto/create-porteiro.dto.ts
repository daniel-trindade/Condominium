import { IsNotEmpty, IsString } from "class-validator";

export class CreatePorteiroDto {
    @IsString()
    nome: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsString()
    telefone: string;

    @IsString()
    @IsNotEmpty()
    senha: string;
    @IsString()
    turno: string;
}
