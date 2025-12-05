import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculosDto } from './dto/create-veiculo.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly service: VeiculosService) {}

  
  @Post()
  @ApiOperation({ summary: 'Cadastrar veículos de um condômino' })
  @ApiResponse({ status: 201, description: 'Veículos cadastrados com sucesso.' })
  cadastrarVeiculos(@Body() dto: CreateVeiculosDto) {
    return this.service.cadastrarVeiculos(dto);
  }

  @Get(':placa')
  @ApiOperation({ summary: 'Buscar veículo pela placa' })
  consultar(@Param('placa') placa: string) {
    return this.service.consultarPorPlaca(placa);
  }
}
