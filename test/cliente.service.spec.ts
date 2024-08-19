/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from '../src/aluno/aluno.service';
import { CreateAlunoDto } from '../src/aluno/dto/create-aluno.dto';
import { Aluno } from '../src/aluno/entities/aluno.entity';
import { ForbiddenException, ConflictException } from '@nestjs/common';

describe('AlunoService', () => {
  let service: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlunoService],
    }).compile();

    service = module.get<AlunoService>(AlunoService);
  });

  it('deve cadastrar um aluno com sucesso', () => {
    const createAlunoDto: CreateAlunoDto = {
      nome: 'Marcos Oliveira',
      endereco: 'Avenida das Rosas, 456',
      telefone: '127654321',
      email: 'marcos.oliveira@gmail.com',
      curso: 'Java',
      anoNascimento: 2000,
    };

    const aluno: Aluno = service.cadastrar(createAlunoDto);

    expect(aluno).toBeDefined();
    expect(aluno.nome).toBe(createAlunoDto.nome);
    expect(aluno.id).toBe(1); 
    expect(service['alunos'].length).toBe(1); 
  });

  it('deve lançar uma exceção de conflito se o aluno já estiver cadastrado', () => {
    const createAlunoDto: CreateAlunoDto = {
      nome: 'Luana Cardoso',
      endereco: 'Rua Amora, 129',
      telefone: '12999999',
      email: 'luana.cardoso@gmail.com',
      curso: 'Javascript',
      anoNascimento: 1986,
    };

    service.cadastrar(createAlunoDto);

    expect(() => service.cadastrar(createAlunoDto)).toThrow(ConflictException);
  });

  it('deve lançar uma exceção de proibido se a idade for menor que a mínima', () => {
    const createAlunoDto: CreateAlunoDto = {
      nome: 'Paula Costa',
      endereco: 'Rua das Flores, 21',
      telefone: '1216549867',
      email: 'paula.costa@gmail.com',
      curso: 'Python',
      anoNascimento: new Date().getFullYear() - 15, 
    };

    expect(() => service.cadastrar(createAlunoDto)).toThrow(ForbiddenException);
  });
});
