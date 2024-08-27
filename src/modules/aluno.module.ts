import { Module } from '@nestjs/common';
import { AlunoService } from '../aplication/services/aluno.service';
import { AlunoController } from '../adapters/controllers/aluno.controller';
import { AlunoRepository } from '../infrastructure/repositories/aluno.repository';

@Module({
  controllers: [AlunoController],
  providers: [AlunoService, AlunoRepository],
})
export class AlunoModule {}
