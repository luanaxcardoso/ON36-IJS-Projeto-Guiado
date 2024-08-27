import {
  Injectable,
  ForbiddenException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlunoDto } from '../dto/create-aluno.dto';
import { Aluno } from '../../domain/entities/aluno.entity';
import { AlunoRepository } from '../../infrastructure/repositories/aluno.repository';
import { AlunoAdapter } from '../../adapters/adapter/aluno.adapter';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlunoService {
  private alunoAdapter = new AlunoAdapter();

  constructor(private readonly alunoRepository: AlunoRepository) {}

  async cadastrar(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const alunoExistente = this.alunoRepository
      .listar()
      .find((aluno) => aluno.nome === createAlunoDto.nome);

    if (alunoExistente) {
      throw new ConflictException('Já existe um aluno com esse nome.');
    }

    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - createAlunoDto.anoNascimento;
    const IDADE_MIN_CADASTRO = 16;

    if (idade <= IDADE_MIN_CADASTRO) {
      throw new ForbiddenException('A idade mínima para cadastro é 17 anos.');
    }

    const dadosAluno = {
      id: uuidv4(),
      nome: createAlunoDto.nome,
      email: createAlunoDto.email,
      curso: createAlunoDto.curso,
    };

    const novoAluno: Aluno = this.alunoAdapter.adaptaAluno(dadosAluno);

    this.alunoRepository.criar(novoAluno);

    return novoAluno;
  }

  listar(): Aluno[] {
    return this.alunoRepository.listar();
  }
}
