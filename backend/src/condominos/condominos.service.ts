import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CreateCondominoDto } from './dto/createCondomino.dto';
import { UpdateCondDto } from './dto/updateCond.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CondominosService {
  constructor( 
    private prisma: PrismaService,
    private usuariosService: UsuariosService,
  ) {}

  async registerUnitOwner(data: CreateCondominoDto){
    const usuario = await this.usuariosService.createUser({
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      tipo: 'CONDOMINO',
    });
    return this.prisma.condomino.create({
      data: {
        cpf: data.cpf,
        telefone: data.telefone,
        apartamento: data.apartamento,
        andar: data.andar,
        usuarioId: usuario.id,
      },
      include: { usuario: true },
    });
  }

  findAllUnitOwner() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.prisma.condomino.findMany({
      include: { usuario: true },
    });
  }

  async searchByFilters(filtros: {
    nome?: string;
    cpf?: string;
    apartamento?: string;
    andar?: number;
  }) {
    const { nome, cpf, apartamento, andar } = filtros;

    const where: any = {
      AND: [],
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (nome) where.AND.push({ usuario: { nome: { contains: nome } } });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (cpf) where.AND.push({ cpf: { contains: cpf } });

  
    if (apartamento && andar) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      where.AND.push({
        AND: [
          { apartamento: { equals: apartamento } },
          { andar: { equals: Number(andar) } },
        ],
      });
    } 

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (where.AND.length === 0) delete where.AND;

    return this.prisma.condomino.findMany({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where,
      include: { usuario: true },
    });
  }

  async update(id: number, data: UpdateCondDto) {
    const { nome, email, senha, ...condominoData } = data
    const cond = await this.prisma.condomino.findUnique({ where: { id } });

    if (!cond) throw new NotFoundException('Condômino não encontrado.');

    let senhaCriptografada;
    if(data.senha) senhaCriptografada = await bcrypt.hash(data.senha, 10);

    return this.prisma.condomino.update({
    where: { id },
    data: {
      ...condominoData,
      usuario: {
        update: {
          ...(nome && { nome }),
          ...(email && { email }),
          ...(senhaCriptografada && { senha: senhaCriptografada }),
        },
      },
    },
    include: { usuario: true },
  });
  }

  // ----------------------------
  // DELETE
  // ----------------------------
  async remove(id: number) {
    const cond = await this.prisma.condomino.findUnique({ where: { id } });

    if (!cond) throw new NotFoundException('Condômino não encontrado.');

    await this.prisma.condomino.delete({
      where: { id },
    });

    // Exclui o usuário vinculado junto
    await this.usuariosService.removeUser(cond.usuarioId);
    
    return { message: 'Condômino removido com sucesso' };
  }
  

}