import { IsNotEmpty, IsEmail, IsNumber, IsString, IsMobilePhone, Min } from 'class-validator';

export class CreateAlunoDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  @IsString()
  endereco: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @IsMobilePhone('pt-BR')
  telefone: string;

  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'Email inválido.' })
  email: string;

  @IsNotEmpty({ message: 'O curso é obrigatório.' })
  @IsString()
  curso: string;

  @IsNotEmpty({ message: 'O ano de nascimento é obrigatório.' })
  @IsNumber({}, { message: 'O ano de nascimento deve ser um número.' })
  @Min(1900, { message: 'Ano de nascimento inválido.' })
  anoNascimento: number;
}
