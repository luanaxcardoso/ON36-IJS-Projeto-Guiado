import { Injectable } from '@nestjs/common';
import { Curso } from '../../domain/entities/curso.entity';

@Injectable()
export class CursosRepository {
  private cursos: Curso[] = [];

  criar(curso: Curso): Curso {
    this.cursos.push(curso);
    return curso;
  }

  listar(): Curso[] {
    return this.cursos;
  }

  buscarPorId(id: string): Curso | undefined {
    return this.cursos.find((curso) => curso.id === id);
  }

  salvar(curso: Curso): Curso {
    const index = this.cursos.findIndex((c) => c.id === curso.id);
    if (index !== -1) {
      this.cursos[index] = curso;
      return curso;
    }
    throw new Error('Curso não encontrado');
  }
}
