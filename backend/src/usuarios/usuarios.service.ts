import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { TipoUsuario } from '@prisma/client';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUsuarioDto) {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email: data.email }
    });

    if (usuarioExistente) {
      throw new BadRequestException('E-mail já está cadastrado.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const senhaCriptografada = await bcrypt.hash(data.senha, 10);


    return this.prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        senha: senhaCriptografada,
        tipo: data.tipo, // 'admin', 'porteiro' ou 'condomino'
      },
    });
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async updateUser(id: number, data: UpdateUsuarioDto) {
    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }

    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async removeUser(id: number) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }



}
