export class Aluno {
  id: string; 
  nome: string;
  endereco?: string; 
  telefone?: string; 
  email: string;
  curso: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Aluno>) {
    if (!partial.nome || !partial.email || !partial.curso) {
      throw new Error('Os campos nome, email e curso são obrigatórios.');
    }

    Object.assign(this, partial);
  }
}
