import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { TipoUsuario } from '@prisma/client';
import { CreateUsuarioDto } from './dto/createUsuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async criarUsuario(data: CreateUsuarioDto) {
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

  async listarUsuarios() {
    return this.prisma.usuario.findMany();
  }

}
