import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CondominosService } from './condominos.service';
import { CreateCondominoDto } from './dto/createCondomino.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateCondDto } from './dto/updateCond.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Condôminos')

@Controller('condominiums')
export class CondominosController {
  constructor(private readonly service: CondominosService) {}

  @Post() 
  @ApiOperation({ summary: 'Criar novo condômino' })
  async createUnitOwner(@Body() createDto: CreateCondominoDto) {
    return this.service.registerUnitOwner(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os condôminos' })
  findUnitOwner() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.service.findAllUnitOwner();
  }
  @Post('search')
  @ApiOperation({ summary: 'Pesquisar condôminos por filtros' })
  async search(
    @Body()
    filtros: {
      nome?: string;
      cpf?: string;
      apartamento?: string;
      andar?: number;
    },
  ) {
    return this.service.searchByFilters(filtros); 
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar condômino' })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCondDto,
  ) {
    return this.service.update(Number(id), updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover condômino' })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }

}


