import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculosDto } from './dto/create-veiculo.dto';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly service: VeiculosService) {}

  
  @Post()
  cadastrarVeiculos(@Body() dto: CreateVeiculosDto) {
    return this.service.cadastrarVeiculos(dto);
  }

  @Get(':placa')
  consultar(@Param('placa') placa: string) {
    return this.service.consultarPorPlaca(placa);
  }
}
