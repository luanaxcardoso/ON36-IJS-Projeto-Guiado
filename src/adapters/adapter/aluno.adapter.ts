import { Injectable } from '@nestjs/common';
import { Aluno } from '../../domain/entities/aluno.entity';
import { DadosAluno } from '../../domain/interfaces/aluno.interface';

@Injectable()
export class AlunoAdapter {
  adaptaAluno(dados: DadosAluno): Aluno {
    return new Aluno({
      id: dados.id,
      nome: dados.nome,
      email: dados.email,
      curso: dados.curso,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
