import { Test, TestingModule } from '@nestjs/testing';
import { PorteirosController } from './porteiros.controller';
import { PorteirosService } from './porteiros.service';
import { CreatePorteiroDto } from './dto/create-porteiro.dto';
import { UpdatePorteiroDto } from './dto/update-porteiro.dto';

// Mock do serviço
const mockPorteirosService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByCpf: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PorteirosController', () => {
  let controller: PorteirosController;
  let service: PorteirosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PorteirosController],
      providers: [
        {
          provide: PorteirosService,
          useValue: mockPorteirosService,
        },
      ],
    }).compile();

    controller = module.get<PorteirosController>(PorteirosController);
    service = module.get<PorteirosService>(PorteirosService);
    
    // Limpar mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a porteiro', async () => {
      const dto: CreatePorteiroDto = {
        nome: 'João Porteiro',
        cpf: '12345678900',
        email: 'joao@email.com',
        senha: 'senha123',
        telefone: '11999999999',
        dataAdmissao: new Date(),
      };

      const porteiroCriado = {
        id: 1,
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPorteirosService.create.mockResolvedValue(porteiroCriado);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(porteiroCriado);
    });
  });

  describe('getAll', () => {
    it('should return all porteiros', async () => {
      const porteiros = [
        {
          id: 1,
          nome: 'João Porteiro',
          cpf: '12345678900',
          email: 'joao@email.com',
        },
        {
          id: 2,
          nome: 'Maria Porteira',
          cpf: '98765432100',
          email: 'maria@email.com',
        },
      ];

      mockPorteirosService.findAll.mockResolvedValue(porteiros);

      const result = await controller.getAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(porteiros);
    });
  });

  describe('findByCpf', () => {
    it('should find a porteiro by CPF', async () => {
      const cpf = '12345678900';
      const porteiro = {
        id: 1,
        nome: 'João Porteiro',
        cpf,
        email: 'joao@email.com',
      };

      mockPorteirosService.findByCpf.mockResolvedValue(porteiro);

      const result = await controller.findBycpf(cpf);

      expect(service.findByCpf).toHaveBeenCalledWith(cpf);
      expect(result).toEqual(porteiro);
    });

    it('should return null when porteiro not found', async () => {
      const cpf = '00000000000';
      mockPorteirosService.findByCpf.mockResolvedValue(null);

      const result = await controller.findBycpf(cpf);

      expect(service.findByCpf).toHaveBeenCalledWith(cpf);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a porteiro', async () => {
      const id = '1';
      const dto: UpdatePorteiroDto = {
        nome: 'João Atualizado',
        telefone: '11988888888',
      };

      const porteiroAtualizado = {
        id: 1,
        nome: 'João Atualizado',
        cpf: '12345678900',
        email: 'joao@email.com',
        telefone: '11988888888',
        updatedAt: new Date(),
      };

      mockPorteirosService.update.mockResolvedValue(porteiroAtualizado);

      const result = await controller.update(id, dto);

      expect(service.update).toHaveBeenCalledWith(Number(id), dto);
      expect(result).toEqual(porteiroAtualizado);
    });
  });

  describe('delete', () => {
    it('should delete a porteiro', async () => {
      const id = '1';
      const porteiroRemovido = {
        id: 1,
        nome: 'João Porteiro',
        message: 'Porteiro removido com sucesso',
      };

      mockPorteirosService.remove.mockResolvedValue(porteiroRemovido);

      const result = await controller.delete(id);

      expect(service.remove).toHaveBeenCalledWith(Number(id));
      expect(result).toEqual(porteiroRemovido);
    });
  });
});
