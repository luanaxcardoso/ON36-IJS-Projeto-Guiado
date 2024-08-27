import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunoModule } from './modules/aluno.module'; 
import { CursosModule } from './modules/cursos.module'; 


@Module({
  imports: [AlunoModule, CursosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
