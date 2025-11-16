import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class PorteirosService {
  constructor(
    private prisma: PrismaService,
    private usuariosService: UsuariosService,
  ) {}

  async criar(data: {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    senha: string;
    turno: string; // ex: "manhã", "tarde", "noite"
  }) {
    const usuario = await this.usuariosService.createUser({
      nome: data.nome,
      email: data.cpf,
      senha: data.senha,
      tipo: 'PORTEIRO',
    });

    return this.prisma.porteiro.create({
      data: {
        cpf: data.cpf,
        telefone: data.telefone,
        turno: data.turno,
        usuarioId: usuario.id,
      },
      include: { usuario: true },
    });
  }

  async listar() {
    return this.prisma.porteiro.findMany({
      include: { usuario: true },
    });
  }

  async buscarPorCpf(cpf: string) {
    return this.prisma.porteiro.findFirst({
      where: { cpf } ,
      include: { usuario: true },
    });
  }

  
}