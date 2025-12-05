import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateReservasDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    apto: string;
    @ApiProperty()
    bloco: string;
    @ApiProperty()
    @IsDate()
    start: Date;
    @ApiProperty()
    @IsDate()
    end: Date;
  
} 