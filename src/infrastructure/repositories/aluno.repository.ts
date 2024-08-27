import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Aluno } from '../../domain/entities/aluno.entity';

@Injectable()
export class AlunoRepository {
  private alunos: Aluno[] = [];

  criar(aluno: Aluno): Aluno {
    aluno.id = uuidv4();
    this.alunos.push(aluno);
    return aluno;
  }

  listar(): Aluno[] {
    return this.alunos;
  }

  salvar(aluno: Aluno): Promise<Aluno> {
    return new Promise((resolve, reject) => {
      const index = this.alunos.findIndex((a) => a.id === aluno.id);
      if (index !== -1) {
        this.alunos[index] = aluno;
        resolve(aluno);
      } else {
        reject(new Error('Aluno não encontrado'));
      }
    });
  }
}
