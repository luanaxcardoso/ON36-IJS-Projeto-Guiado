import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { CreateCursoDto } from '../../aplication/dto/create-curso.dto';
import { CursosService } from '../../aplication/services/cursos.service';
import { Presenca } from '../../domain/entities/presenca.entity';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  async criar(@Body() createCursoDto: CreateCursoDto) {
    console.log('Criando curso:', createCursoDto);
    const curso = await this.cursosService.criar(createCursoDto);
    console.log('Curso criado:', curso);
    return curso;
  }

  @Post(':cursoId/alunos/:alunoId')
  async cadastrarAlunoEmCurso(
    @Param('cursoId') cursoId: string,
    @Param('alunoId') alunoId: string,
  ) {
    console.log(`Cadastrando aluno ${alunoId} ao curso ${cursoId}`);
    try {
      const curso = await this.cursosService.cadastrarAlunoEmCurso(
        alunoId,
        cursoId,
      );
      console.log('Aluno cadastrado no curso com sucesso:', curso);
      return curso;
    } catch (error) {
      console.error('Erro ao cadastrar aluno no curso:', error.message);
      throw error;
    }
  }

  @Post(':cursoId/presencas/:alunoId')
  async registrarPresenca(
    @Param('cursoId') cursoId: string,
    @Param('alunoId') alunoId: string,
  ) {
    console.log(`Registrando presença do aluno ${alunoId} no curso ${cursoId}`);
    try {
      const presenca = await this.cursosService.registrarPresenca(cursoId, alunoId);
      console.log('Presença registrada com sucesso:', presenca);
      return presenca;
    } catch (error) {
      console.error('Erro ao registrar presença:', error.message);
      throw error;
    }
  }

  @Get(':cursoId/presencas')
  async listarPresencas(@Param('cursoId') cursoId: string): Promise<Presenca[]> {
    console.log(`Listando presenças para o curso ${cursoId}`);
    try {
      const presencas = this.cursosService.listarPresencas(cursoId);
      console.log('Presenças listadas com sucesso:', presencas);
      return presencas;
    } catch (error) {
      console.error('Erro ao listar presenças:', error.message);
      throw error;
    }
  }
}
