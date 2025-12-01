import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservasDto } from './dto/createReservas.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private service: ReservasService) {}

  @Post()
  create(@Body() body: CreateReservasDto) {
    return this.service.createReservation(body);
  }

  @Get()
  findAll() {
    return this.service.findAllReservations();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findReservationById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { status?: string }) {
    return this.service.updateReservation(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.deleteReservation(Number(id));
  }
}
