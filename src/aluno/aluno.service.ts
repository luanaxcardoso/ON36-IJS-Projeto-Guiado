import { Injectable, ForbiddenException, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { AlunoRepository } from './aluno.repository';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AlunoService {
  constructor(private readonly alunoRepository: AlunoRepository) {}

  cadastrar(createAlunoDto: CreateAlunoDto): Aluno {
    const alunoExistente = this.alunoRepository
      .listar()
      .find(aluno => aluno.nome === createAlunoDto.nome);

    if (alunoExistente) {
      throw new ConflictException('Já existe um aluno com esse nome.');
    }

    const anoAtual = new Date().getFullYear();
    const idade = anoAtual - createAlunoDto.anoNascimento;
    const IDADE_MIN_CADASTRO = 16;

    if (idade <= IDADE_MIN_CADASTRO) {
      throw new ForbiddenException('A idade mínima para cadastro é 17 anos.');
    }

    const novoAluno: Aluno = {
      id: uuidv4(), 
      ...createAlunoDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.alunoRepository.criar(novoAluno);

    return novoAluno;
  }

  listar(): Aluno[] {
    return this.alunoRepository.listar();
  }

  
}
