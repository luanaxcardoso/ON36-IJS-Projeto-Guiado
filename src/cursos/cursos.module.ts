import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';

@Module({
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
