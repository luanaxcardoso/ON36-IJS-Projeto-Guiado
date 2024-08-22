import { Injectable } from '@nestjs/common';
import { Presenca } from 'src/domain/entities/presenca.entity';

@Injectable()
export class PresencaRepository {
  private presencas: Presenca[] = [];

  listarPorCurso(cursoId: string): Presenca[] {
    return this.presencas.filter((p) => p.cursoId === cursoId);
  }

  salvar(presenca: Presenca): Presenca {
    this.presencas.push(presenca);
    return presenca;
  }
}
