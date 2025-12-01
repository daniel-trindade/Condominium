import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateReservasDto {
    title: string;
    apto: string;
    bloco: string;

    @IsDate()
    start: Date;
    @IsDate()
    end: Date;
  
} 