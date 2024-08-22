import { Aluno } from "src/aluno/entities/aluno.entity";
import { v4 as uuidv4 } from 'uuid';


export class Curso {
    id: string;
    nome: string;
    duracao: number;
    alunos: Aluno[];
    createdAt: Date;
    updatedAt: Date;
  
    constructor(partial: Partial<Curso>) {
      if (!partial.nome || !partial.duracao) {
        throw new Error('Os campos nome e duracao da hora são obrigatórios.');
      }
  
      this.id = partial.id ?? uuidv4();
      this.createdAt = partial.createdAt ?? new Date();
      this.updatedAt = partial.updatedAt ?? new Date();
  
      Object.assign(this, partial);
    }
  }


  