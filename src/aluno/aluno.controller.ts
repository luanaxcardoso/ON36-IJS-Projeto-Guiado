import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  cadastrar(@Body() createAlunoDto: CreateAlunoDto): Aluno {
    return this.alunoService.cadastrar(createAlunoDto);
  }
}
