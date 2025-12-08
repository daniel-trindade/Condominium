import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CreatePorteiroDto } from './dto/create-porteiro.dto';
import { UpdatePorteiroDto } from './dto/update-porteiro.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PorteirosService {
  constructor(
    private prisma: PrismaService,
    private usuariosService: UsuariosService,
  ) {}

  async create(data: CreatePorteiroDto) {
    const usuario = await this.usuariosService.createUser({
      nome: data.nome,
      email: data.email,
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

  async findAll() {
    return this.prisma.porteiro.findMany({
      include: { usuario: true },
    });
  }

  async findByCpf(cpf: string) {
    return this.prisma.porteiro.findFirst({
      where: { cpf } ,
      include: { usuario: true },
    });
  }
  async update(id: number, data: UpdatePorteiroDto) {
    const porteiro = await this.prisma.porteiro.findUnique({ where: { id } });
    if (!porteiro) throw new NotFoundException('Porteiro não encontrado');

    const { nome, email, senha, ...porteiroData } = data;

    return this.prisma.porteiro.update({
      where: { id },
      data: {
        ...porteiroData,
        usuario: {
          update: {
            ...(nome && { nome }),
            ...(email && { email }),
            ...(senha && { senha: await bcrypt.hash(senha, 10) }),
          },
        },
      },
      include: { usuario: true },
    });
  }

  async remove(id: number) {
    const porteiro = await this.prisma.porteiro.findUnique({ where: { id } });
    if (!porteiro) throw new NotFoundException('Porteiro não encontrado');

    await this.prisma.porteiro.delete({
      where: { id },
    });

    // deletar o usuário vinculado
    await this.prisma.usuario.delete({
      where: { id: porteiro.usuarioId },
    });

    return { message: 'Porteiro removido com sucesso' };
  }

  
}