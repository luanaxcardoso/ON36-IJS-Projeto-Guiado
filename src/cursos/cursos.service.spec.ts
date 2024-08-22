import { Test, TestingModule } from '@nestjs/testing';
import { CursosService } from './cursos.service';
import { CursosRepository } from './cursos.repository';
import { AlunoRepository } from '../aluno/aluno.repository';
import { Curso } from './entities/curso.entity';
import { Aluno } from '../aluno/entities/aluno.entity';

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CursosService,
        { provide: CursosRepository, useValue: mockCursosRepository },
        { provide: AlunoRepository, useValue: mockAlunoRepository },
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
    mockCursosRepository.salvar.mockResolvedValue({ ...curso, alunos: [aluno] });
    mockAlunoRepository.salvar.mockResolvedValue({ ...aluno, curso: 'Javascript' }); // 

    const resultado = await service.cadastrarAlunoEmCurso(alunoId, cursoId);

   
    expect(resultado.alunos).toContainEqual(aluno);
    expect(resultado.alunos.length).toBe(1);
    expect(mockCursosRepository.salvar).toHaveBeenCalledWith({ ...curso, alunos: [aluno] });
    expect(mockAlunoRepository.salvar).toHaveBeenCalledWith({ ...aluno, curso: 'Javascript' }); 
  });
});
