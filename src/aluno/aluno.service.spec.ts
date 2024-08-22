import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { ForbiddenException, ConflictException } from '@nestjs/common';
import { AlunoRepository } from './aluno.repository';

describe('AlunoService', () => {
  let service: AlunoService;
  let mockAlunoRepository: Partial<AlunoRepository>;

  beforeEach(async () => {
    
    mockAlunoRepository = {
      listar: jest.fn(),
      criar: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlunoService,
        { provide: AlunoRepository, useValue: mockAlunoRepository }, 
      ],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
  });

  it('Deve cadastrar um aluno', async () => {
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

    mockAlunoRepository.listar = jest.fn().mockReturnValue([]);
    mockAlunoRepository.criar = jest.fn().mockReturnValue(aluno);

    const resultado = await service.cadastrar(createAlunoDto);

    expect(resultado).toBeDefined();
    expect(resultado.nome).toBe(createAlunoDto.nome);
    expect(resultado.id).toBeDefined(); 
    expect(mockAlunoRepository.criar).toHaveBeenCalledWith(resultado);
  });

});