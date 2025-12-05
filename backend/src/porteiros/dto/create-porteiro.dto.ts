import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePorteiroDto {
    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @ApiProperty()
    @IsString()
    telefone: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    senha: string;
    @ApiProperty()
    @IsString()
    turno: string;
}
