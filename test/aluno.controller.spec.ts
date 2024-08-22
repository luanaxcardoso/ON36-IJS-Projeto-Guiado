import { Test, TestingModule } from '@nestjs/testing';
import { AlunoController } from '../src/adapters/controllers/aluno.controller';
import { AlunoService } from '../src/aplication/services/aluno.service';
import { CreateAlunoDto } from '../src/aplication/dto/create-aluno.dto';
import { Aluno } from '../src/domain/entities/aluno.entity';
import { ConflictException, ForbiddenException } from '@nestjs/common';

describe('AlunoController', () => {
  let controller: AlunoController;

  const mockAlunoService = {
    cadastrar: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlunoController],
      providers: [{ provide: AlunoService, useValue: mockAlunoService }],
    }).compile();

    controller = module.get<AlunoController>(AlunoController);
    const service = module.get<AlunoService>(AlunoService);
  });

  it('deve cadastrar um aluno', async () => {
    const createAlunoDto: CreateAlunoDto = {
      nome: 'Luana Cardoso',
      endereco: 'Avenida das Rosas, 1556',
      telefone: '127654321',
      email: 'luana.cardoso@gmail.com',
      curso: 'Javascript',
      anoNascimento: 2000,
    };

    const aluno: Aluno = {
      id: 'some-uuid',
      ...createAlunoDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockAlunoService.cadastrar.mockResolvedValue(aluno);

    const result = await controller.cadastrar(createAlunoDto);

    expect(result).toBe(aluno);
    expect(mockAlunoService.cadastrar).toHaveBeenCalledWith(createAlunoDto);
    expect(mockAlunoService.cadastrar).toHaveBeenCalledTimes(1);
  });

  it('deve lançar uma exceção se o aluno já estiver cadastrado', async () => {
    const createAlunoDto: CreateAlunoDto = {
      nome: 'Luana Cardoso',
      endereco: 'Rua Amora, 129',
      telefone: '12999999',
      email: 'luana.cardoso@gmail.com',
      curso: 'Javascript',
      anoNascimento: 1986,
    };

    mockAlunoService.cadastrar.mockRejectedValue(
      new ConflictException('Já existe um aluno com esse nome.'),
    );

    await expect(controller.cadastrar(createAlunoDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('deve lançar uma exceção se a idade for menor que a mínima', async () => {
    const createAlunoDto: CreateAlunoDto = {
      nome: 'Paula Costa',
      endereco: 'Rua das Flores, 211',
      telefone: '1216549867',
      email: 'paula.costa@gmail.com',
      curso: 'Python',
      anoNascimento: new Date().getFullYear() - 15,
    };

    mockAlunoService.cadastrar.mockRejectedValue(
      new ForbiddenException('A idade mínima para cadastro é 17 anos.'),
    );

    await expect(controller.cadastrar(createAlunoDto)).rejects.toThrow(
      ForbiddenException,
    );
  });
});
