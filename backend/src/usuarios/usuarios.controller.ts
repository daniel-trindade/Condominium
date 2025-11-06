import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/createUsuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Post()
  async criar(@Body() data: CreateUsuarioDto) {
    return this.service.criarUsuario(data);
  }

  @Get()
  async listar() {
    return this.service.listarUsuarios();
  }
}
