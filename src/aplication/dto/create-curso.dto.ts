import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateCursoDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;


  @IsNotEmpty({ message: 'A duração é obrigatória.' })
  @IsNumber({}, { message: 'A duração deve ser um número.' })
  @Min(1, { message: 'A duração deve ser maior que zero.' })
  duracao: number;
}
