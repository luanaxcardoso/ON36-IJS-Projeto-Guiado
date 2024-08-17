/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsNumber, Min, IsString } from 'class-validator';

export class CreateAlunoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  endereco: string;
  
  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  curso: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(16, { message: 'A idade mínima é 16 anos.' })
  idade: number;
}
