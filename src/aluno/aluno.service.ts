/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunoService {
  private readonly alunos: Aluno[] = [];

  cadastrar(createAlunoDto: CreateAlunoDto): Aluno {
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
