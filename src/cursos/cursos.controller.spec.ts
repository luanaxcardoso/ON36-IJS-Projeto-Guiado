import { Test, TestingModule } from '@nestjs/testing';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';
import { Curso } from './entities/curso.entity';
import { Aluno } from '../aluno/entities/aluno.entity';

describe('CursosController', () => {
  let controller: CursosController;

  const mockCursosService = {
    criar: jest.fn(),
    cadastrarAlunoEmCurso: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursosController],
      providers: [
        { provide: CursosService, useValue: mockCursosService },
      ],
    }).compile();

    controller = module.get<CursosController>(CursosController);
    const service = module.get<CursosService>(CursosService);
  });

  it('Deve cadastrar um aluno em um curso', async () => {
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

    
    mockCursosService.cadastrarAlunoEmCurso.mockResolvedValue({ ...curso, alunos: [aluno] });

    
    const resultado = await controller.cadastrarAlunoEmCurso(cursoId, alunoId);

    
    expect(resultado.alunos).toContainEqual(aluno);
    expect(resultado.alunos.length).toBe(1);
    expect(mockCursosService.cadastrarAlunoEmCurso).toHaveBeenCalledWith(alunoId, cursoId);
  });
});
