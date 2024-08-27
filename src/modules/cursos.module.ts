import { Module } from '@nestjs/common';
import { CursosService } from '../aplication/services/cursos.service';
import { CursosController } from '../adapters/controllers/cursos.controller';
import { CursosRepository } from '../infrastructure/repositories/cursos.repository';
import { AlunoRepository } from '../infrastructure/repositories/aluno.repository';
import { PresencaRepository } from '../infrastructure/repositories/presenca.repository'; 

@Module({
  imports: [],
  controllers: [CursosController],
  providers: [
    CursosService,
    CursosRepository,
    AlunoRepository,
    PresencaRepository, 
  ],
  exports: [CursosRepository],
})
export class CursosModule {}
