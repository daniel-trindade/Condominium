import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CreateCondominoDto } from './dto/createCondomino.dto';

@Injectable()
export class CondominosService {
  constructor( 
    private prisma: PrismaService,
    private usuariosService: UsuariosService,
  ) {}

  async cadastrar (data: CreateCondominoDto){
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

  listar() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.prisma.condomino.findMany({
      include: { usuario: true },
    });
  }

  async pesquisarPorFiltros(filtros: {
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

  // 🔹 Se vier apartamento e andar, busca pelos dois juntos
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

}