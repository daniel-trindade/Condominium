import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterPickupDto {
  @ApiProperty()
  @IsString()
  retiradoPor: string;
}
