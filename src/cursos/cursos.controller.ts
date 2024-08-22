import { Body, Controller, Post, Param } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { CursosService } from './cursos.service';

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
    @Param('alunoId') alunoId: string
  ) {
    console.log(`Cadastrando aluno ${alunoId} ao curso ${cursoId}`);
    try {
      const curso = await this.cursosService.cadastrarAlunoEmCurso(alunoId, cursoId);
      console.log('Aluno cadastrado no curso com sucesso:', curso);
      return curso;
    } catch (error) {
      console.error('Erro ao cadastrar aluno no curso:', error.message);
      throw error;
    }
  }
}
