import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CursosRepository } from './cursos.repository';
import { AlunoRepository } from '../aluno/aluno.repository';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';

@Injectable()
export class CursosService {
  constructor(
    private readonly cursoRepository: CursosRepository,
    private readonly alunoRepository: AlunoRepository,
  ) {}

  async criar(createCursoDto: CreateCursoDto): Promise<Curso> {
    console.log('Criando curso com DTO:', createCursoDto);
    const curso = new Curso({
      ...createCursoDto,
      alunos: [],
    });
    const resultado = await this.cursoRepository.salvar(curso);
    console.log('Curso criado:', resultado);
    return resultado;
  }

  async cadastrarAlunoEmCurso(alunoId: string, cursoId: string): Promise<Curso> {
    console.log(`Buscando curso com ID ${cursoId}`);
    const curso = await this.cursoRepository.buscarPorId(cursoId);

    if (!curso) {
      throw new NotFoundException('Curso não encontrado.');
    }

    console.log(`Buscando aluno com ID ${alunoId}`);
    const aluno = this.alunoRepository.listar().find(aluno => aluno.id === alunoId);

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado.');
    }

    if (curso.alunos.find(a => a.id === aluno.id)) {
      throw new ConflictException('Aluno já está cadastrado neste curso.');
    }

    curso.alunos.push(aluno);
    aluno.curso = curso.nome;
    await this.cursoRepository.salvar(curso);
    await this.alunoRepository.salvar(aluno);

    console.log('Aluno adicionado ao curso:', aluno);
    console.log('Curso atualizado:', curso);
    return curso;
  }
}
