import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CondominosService } from './condominos.service';
import { CreateCondominoDto } from './dto/createCondomino.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateCondDto } from './dto/updateCond.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('condominiums')
export class CondominosController {
  constructor(private readonly service: CondominosService) {}

  @Post() 
  async createUnitOwner(@Body() createDto: CreateCondominoDto) {
    return this.service.registerUnitOwner(createDto);
  }

  @Get()
  findUnitOwner() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.service.findAllUnitOwner();
  }
  @Post('search')
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
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCondDto,
  ) {
    return this.service.update(Number(id), updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }

}


