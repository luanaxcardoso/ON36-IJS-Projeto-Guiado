/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunoModule } from './aluno/aluno.module';
import { CursosModule } from './cursos/cursos.module';


@Module({
  imports: [AlunoModule, CursosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
