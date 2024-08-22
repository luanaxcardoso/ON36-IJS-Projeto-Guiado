import { Test, TestingModule } from '@nestjs/testing';
import { CursosController } from '../src/adapters/controllers/cursos.controller';
import { CursosService } from '../src/aplication/services/cursos.service';
import { Curso } from '../src/domain/entities/curso.entity';
import { Aluno } from '../src/domain/entities/aluno.entity';
import { Presenca } from '../src/domain/entities/presenca.entity';

describe('CursosController', () => {
  let controller: CursosController;

  const mockCursosService = {
    criar: jest.fn(),
    cadastrarAlunoEmCurso: jest.fn(),
    registrarPresenca: jest.fn(),
    listarPresencas: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursosController],
      providers: [{ provide: CursosService, useValue: mockCursosService }],
    }).compile();

    controller = module.get<CursosController>(CursosController);
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

    mockCursosService.cadastrarAlunoEmCurso.mockResolvedValue({
      ...curso,
      alunos: [aluno],
    });

    const resultado = await controller.cadastrarAlunoEmCurso(cursoId, alunoId);

    expect(resultado.alunos).toContainEqual(aluno);
    expect(resultado.alunos.length).toBe(1);
    expect(mockCursosService.cadastrarAlunoEmCurso).toHaveBeenCalledWith(
      alunoId,
      cursoId,
    );
  });

  it('Deve registrar a presença de um aluno em um curso', async () => {
    const cursoId = 'curso-id';
    const alunoId = 'aluno-id';

    const presenca = new Presenca();
    presenca.alunoId = alunoId;
    presenca.cursoId = cursoId;

    mockCursosService.registrarPresenca.mockResolvedValue(presenca);

    const resultado = await controller.registrarPresenca(cursoId, alunoId);

    expect(resultado).toEqual(presenca);
    expect(mockCursosService.registrarPresenca).toHaveBeenCalledWith(
      cursoId,
      alunoId,
    );
  });

  it('Deve listar as presenças de um curso', async () => {
    const cursoId = 'curso-id';
    
    const presencas = [
      new Presenca(),
      new Presenca(),
    ];

    mockCursosService.listarPresencas.mockResolvedValue(presencas);

    const resultado = await controller.listarPresencas(cursoId);

    expect(resultado).toEqual(presencas);
    expect(mockCursosService.listarPresencas).toHaveBeenCalledWith(cursoId);
  });
});
