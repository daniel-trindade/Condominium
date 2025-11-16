import { Test, TestingModule } from '@nestjs/testing';
import { AcessoController } from './acesso.controller';
import { AcessoService } from './acesso.service';
import { CriarVisitanteDto } from './dto/criar-visitante.dto';
import { CriarEntregadorDto } from './dto/criar-entregador.dto';
import { RegistrarAcessoDto } from './dto/registrar-acesso.dto';
import { AtualizarAutorizacaoDto } from './dto/atualizar-autorizacao.dto';
import { TipoAcesso } from '@prisma/client';

const mockAcessoService = {
  cadastrarVisitante: jest.fn(),
  cadastrarEntregador: jest.fn(),
  atualizarAutorizacao: jest.fn(),
  buscarPessoa: jest.fn(),
  registrarAcesso: jest.fn(),
  registrarSaida: jest.fn(),
  listarHistorico: jest.fn(),
};

describe('AcessoController', () => {
  let controller: AcessoController;
  let service: AcessoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcessoController],
      providers: [
        {
          provide: AcessoService,
          useValue: mockAcessoService,
        },
      ],
    }).compile();

    controller = module.get<AcessoController>(AcessoController);
    service = module.get<AcessoService>(AcessoService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('cadastrarVisitante', () => {
    it('should call service.cadastrarVisitante with correct data', async () => {
      const visitanteDto: CriarVisitanteDto = {
        nome: 'João Silva',
        documento: '123456789',
      };

      const resultadoEsperado = { 
        id: 1, 
        ...visitanteDto, 
        autorizado: false // valor padrão do Prisma
      };
      
      mockAcessoService.cadastrarVisitante.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.cadastrarVisitante(visitanteDto);

      expect(service.cadastrarVisitante).toHaveBeenCalledWith(visitanteDto);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('cadastrarEntregador', () => {
    it('should call service.cadastrarEntregador with correct data', async () => {
      const entregadorDto: CriarEntregadorDto = {
        nome: 'Empresa Entregas',
        documento: '987654321',
        empresa: 'Entregas Rápidas',
      };

      const resultadoEsperado = { 
        id: 1, 
        ...entregadorDto,
        autorizado: false
      };
      
      mockAcessoService.cadastrarEntregador.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.cadastrarEntregador(entregadorDto);

      expect(service.cadastrarEntregador).toHaveBeenCalledWith(entregadorDto);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('atualizarAutorizacao', () => {
    it('should call service.atualizarAutorizacao with correct parameters for visitante', async () => {
      const autorizacaoDto: AtualizarAutorizacaoDto = {
        autorizado: true,
      };

      const resultadoEsperado = { 
        id: 1, 
        autorizado: true,
        nome: 'Visitante Teste'
      };
      
      mockAcessoService.atualizarAutorizacao.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.atualizarAutorizacao(
        'visitante',
        '1',
        autorizacaoDto,
      );

      expect(service.atualizarAutorizacao).toHaveBeenCalledWith(
        'visitante',
        1,
        autorizacaoDto,
      );
      expect(resultado).toEqual(resultadoEsperado);
    });

    it('should call service.atualizarAutorizacao with correct parameters for entregador', async () => {
      const autorizacaoDto: AtualizarAutorizacaoDto = {
        autorizado: false,
      };

      const resultadoEsperado = { 
        id: 2, 
        autorizado: false,
        nome: 'Entregador Teste'
      };
      
      mockAcessoService.atualizarAutorizacao.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.atualizarAutorizacao(
        'entregador',
        '2',
        autorizacaoDto,
      );

      expect(service.atualizarAutorizacao).toHaveBeenCalledWith(
        'entregador',
        2,
        autorizacaoDto,
      );
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('buscarPessoa', () => {
    it('should call service.buscarPessoa with the correct name', async () => {
      const nome = 'João';
      const resultadoEsperado = {
        visitantes: [{
            id: 1,
            nome: 'João Silva',
            documento: '123456789',
            autorizado: false 
        }],
        entregadores: [],
        condominos: []
      };
      
      mockAcessoService.buscarPessoa.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.buscarPessoa(nome);

      expect(service.buscarPessoa).toHaveBeenCalledWith(nome);
      expect(resultado).toEqual(resultadoEsperado);
    });

    it('should call service.buscarPessoa without a name when not provided', async () => {
      const resultadoEsperado = {
        visitantes: [],
        entregadores: [],
        condominos: []
      };
      
      mockAcessoService.buscarPessoa.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.buscarPessoa();

      expect(service.buscarPessoa).toHaveBeenCalledWith(undefined);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('registrarAcesso', () => {
    it('should call service.registrarAcesso with correct data', async () => {
      const acessoDto: RegistrarAcessoDto = {
        tipo: TipoAcesso.VISITANTE,
        observacao: 'Visita programada',
        visitanteId: 1,
        porteiroId: 1,
      };

      const resultadoEsperado = { 
        id: 1, 
        ...acessoDto, 
        dataEntrada: new Date() 
      };
      
      mockAcessoService.registrarAcesso.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.registrarAcesso(acessoDto);

      expect(service.registrarAcesso).toHaveBeenCalledWith(acessoDto);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('registrarSaida', () => {
    it('should call service.registrarSaida with the correct ID', async () => {
      const id = '1';
      const resultadoEsperado = { 
        id: 1, 
        dataSaida: new Date() 
      };
      
      mockAcessoService.registrarSaida.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.registrarSaida(id);

      expect(service.registrarSaida).toHaveBeenCalledWith(1);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('listarHistorico', () => {
    it('should call service.listarHistorico', async () => {
      const resultadoEsperado = [
        { 
          id: 1, 
          tipo: TipoAcesso.VISITANTE,
          dataEntrada: new Date(),
          visitante: { nome: 'João Silva' },
          porteiro: { nome: 'Porteiro Teste' }
        },
      ];
      
      mockAcessoService.listarHistorico.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.listarHistorico();

      expect(service.listarHistorico).toHaveBeenCalled();
      expect(resultado).toEqual(resultadoEsperado);
    });
  });
});