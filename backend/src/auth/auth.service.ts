import { Body, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    // Tenta encontrar no Condômino
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if(!usuario ||  !(await bcrypt.compare(senha, usuario.senha))) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }
    const condominio = await this.prisma.condomino.findUnique({ where: { usuarioId: usuario.id }})
    if (condominio) {
      return { 
        id: condominio.id, 
        nome: usuario.nome,
        role: 'condomino', 
      };
    }

    // Tenta encontrar no Porteiro
    const porteiro = await this.prisma.porteiro.findUnique({ where: { usuarioId: usuario.id }});
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (porteiro) {
      return { 
        id: porteiro.id,
        nome: usuario.nome,
        role: 'porteiro',
      };
    }

    return {
      id: usuario.id,
      nome: usuario.nome,
      role: 'admin',
    };
  }

  async login(email: string, senha: string) {
    const user = await this.validateUser(email, senha);
    const payload = { sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
  
}
