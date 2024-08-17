/* eslint-disable prettier/prettier */
export class Aluno {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
    curso: string;
    idade: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(partial: Partial<Aluno>) {
      Object.assign(this, partial);
    }
  }
  