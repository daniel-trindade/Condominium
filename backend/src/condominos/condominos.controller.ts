import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CondominosService } from './condominos.service';
import { CreateCondominoDto } from './dto/createCondomino.dto';

@Controller('condominos')
export class CondominosController {
  constructor(private readonly service: CondominosService) {}

  @Post()
  async cadastrar(@Body() createDto: CreateCondominoDto) {
    return this.service.cadastrar(createDto);
  }

  @Get()
  listar() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.service.listar();
  }
  @Post('pesquisar')
  async pesquisar(
    @Body()
    filtros: {
      nome?: string;
      cpf?: string;
      apartamento?: string;
      andar?: number;
    },
  ) {
    return this.service.pesquisarPorFiltros(filtros); 
  }

}