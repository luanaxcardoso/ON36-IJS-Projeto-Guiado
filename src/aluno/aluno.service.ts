/* eslint-disable prettier/prettier */
import { Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunoService {
  private readonly alunos: Aluno[] = [];

  cadastrar(createAlunoDto: CreateAlunoDto): Aluno {
    
    const alunoExistente = this.alunos.find(aluno => aluno.nome === createAlunoDto.nome);
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
      id: this.alunos.length + 1,
      ...createAlunoDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.alunos.push(novoAluno);

    return novoAluno;
  }
}
