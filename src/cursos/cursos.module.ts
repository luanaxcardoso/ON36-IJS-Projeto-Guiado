import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { CursosRepository } from './cursos.repository'; 
import { AlunoRepository } from '../aluno/aluno.repository'; 
@Module({
  imports: [], 
  controllers: [CursosController],
  providers: [CursosService, CursosRepository, AlunoRepository],
  exports: [CursosRepository], 
})
export class CursosModule {}
