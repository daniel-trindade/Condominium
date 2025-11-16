import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';

@Controller('users')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @Post()
  async createUser(@Body() data: CreateUsuarioDto) {
    return this.usuarioService.create(data);
  }

  @Get()
  async listar() {
    return this.usuarioService.findAll();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

}
