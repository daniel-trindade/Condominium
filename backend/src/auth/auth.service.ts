import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(cpf: string, senha: string) {
    // Tenta encontrar no Condômino
    const condominio = await this.prisma.condomino.findUnique({ where: { cpf } });
    if (condominio && await bcrypt.compare(senha, condominio.senha)) {
      return { id: condominio.id, role: 'condomino' };
    }

    // Tenta encontrar no Porteiro
    const porteiro = await this.prisma.porteiro.findUnique({ where: { cpf } });
    if (porteiro && await bcrypt.compare(senha, porteiro.senha)) {
      return { id: porteiro.id, role: 'porteiro' };
    }

    throw new UnauthorizedException('CPF ou senha inválidos');
  }

  async login(cpf: string, senha: string) {
    const user = await this.validateUser(cpf, senha);
    const payload = { sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
