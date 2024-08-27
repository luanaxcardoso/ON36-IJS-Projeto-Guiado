import { Test, TestingModule } from '@nestjs/testing';
import { CursosService } from '../src/aplication/services/cursos.service';
import { CursosRepository } from '../src/infrastructure/repositories/cursos.repository';
import { AlunoRepository } from '../src/infrastructure/repositories/aluno.repository';
import { PresencaRepository } from '../src/infrastructure/repositories/presenca.repository'; // Adicionado
import { Curso } from '../src/domain/entities/curso.entity';
import { Aluno } from '../src/domain/entities/aluno.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('CursosService', () => {
  let service: CursosService;

  const mockCursosRepository = {
    buscarPorId: jest.fn(),
    salvar: jest.fn(),
  };

  const mockAlunoRepository = {
    listar: jest.fn(),
    salvar: jest.fn(),
  };

  const mockPresencaRepository = {
    
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CursosService,
        { provide: CursosRepository, useValue: mockCursosRepository },
        { provide: AlunoRepository, useValue: mockAlunoRepository },
        { provide: PresencaRepository, useValue: mockPresencaRepository }, 
      ],
    }).compile();

    service = module.get<CursosService>(CursosService);
  });

  it('deve adicionar um aluno a um curso', async () => {
    const cursoId = 'curso-id';
    const alunoId = 'aluno-id';

    const curso = new Curso({
      id: cursoId,
      nome: 'Javascript',
      duracao: 60,
      alunos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const aluno = new Aluno({
      id: alunoId,
      nome: 'Luana Cardoso',
      email: 'luana@gmail.com',
      curso: 'Javascript',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockCursosRepository.buscarPorId.mockResolvedValue(curso);
    mockAlunoRepository.listar.mockReturnValue([aluno]);
    mockCursosRepository.salvar.mockResolvedValue({
      ...curso,
      alunos: [aluno],
    });
    mockAlunoRepository.salvar.mockResolvedValue({
      ...aluno,
      curso: 'Javascript',
    });

    const resultado = await service.cadastrarAlunoEmCurso(alunoId, cursoId);

    expect(resultado.alunos).toContainEqual(aluno);
    expect(resultado.alunos.length).toBe(1);
    expect(mockCursosRepository.buscarPorId).toHaveBeenCalledWith(cursoId);
    expect(mockAlunoRepository.listar).toHaveBeenCalled();
    expect(mockCursosRepository.salvar).toHaveBeenCalledWith({
      ...curso,
      alunos: [aluno],
    });
    expect(mockAlunoRepository.salvar).toHaveBeenCalledWith({
      ...aluno,
      curso: 'Javascript',
    });
  });

  it('deve lançar NotFoundException se o curso não for encontrado', async () => {
    const cursoId = 'curso-id';
    const alunoId = 'aluno-id';

    mockCursosRepository.buscarPorId.mockResolvedValue(null);

    await expect(service.cadastrarAlunoEmCurso(alunoId, cursoId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve lançar NotFoundException se o aluno não for encontrado', async () => {
    const cursoId = 'curso-id';
    const alunoId = 'aluno-id';

    const curso = new Curso({
      id: cursoId,
      nome: 'Javascript',
      duracao: 60,
      alunos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockCursosRepository.buscarPorId.mockResolvedValue(curso);
    mockAlunoRepository.listar.mockReturnValue([]);

    await expect(service.cadastrarAlunoEmCurso(alunoId, cursoId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('deve lançar ConflictException se o aluno já estiver matriculado no curso', async () => {
    const cursoId = 'curso-id';
    const alunoId = 'aluno-id';

    const curso = new Curso({
      id: cursoId,
      nome: 'Javascript',
      duracao: 60,
      alunos: [
        new Aluno({
          id: alunoId,
          nome: 'Luana Cardoso',
          email: 'luana@gmail.com',
          curso: 'Javascript',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const aluno = new Aluno({
      id: alunoId,
      nome: 'Luana Cardoso',
      email: 'luana@gmail.com',
      curso: 'Javascript',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockCursosRepository.buscarPorId.mockResolvedValue(curso);
    mockAlunoRepository.listar.mockReturnValue([aluno]);

    await expect(service.cadastrarAlunoEmCurso(alunoId, cursoId)).rejects.toThrow(
      ConflictException,
    );
  });
});
