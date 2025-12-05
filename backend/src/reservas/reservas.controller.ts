import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservasDto } from './dto/createReservas.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Reservas')
@Controller('reservas')
export class ReservasController {
  constructor(private service: ReservasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma reserva' })
  create(@Body() body: CreateReservasDto) {
    return this.service.createReservation(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as reservas' })
  findAll() {
    return this.service.findAllReservations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar reserva por ID' })
  findById(@Param('id') id: string) {
    return this.service.findReservationById(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar status da reserva' })
  update(@Param('id') id: string, @Body() body: { status?: string }) {
    return this.service.updateReservation(Number(id), body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar reserva' })
  delete(@Param('id') id: string) {
    return this.service.deleteReservation(Number(id));
  }
}
