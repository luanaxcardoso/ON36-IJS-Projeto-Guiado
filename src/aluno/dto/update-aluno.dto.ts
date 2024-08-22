import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsEmail, IsNumber, IsString, IsMobilePhone, Min, IsOptional } from 'class-validator';
import { CreateAlunoDto } from './create-aluno.dto';

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsMobilePhone('pt-BR')
  telefone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email inválido.' })
  email?: string;

  @IsOptional()
  @IsString()
  curso?: string;

  @IsOptional()
  @IsNumber({}, { message: 'O ano de nascimento deve ser um número.' })
  @Min(1900, { message: 'Ano de nascimento inválido.' })
  anoNascimento?: number;
}
