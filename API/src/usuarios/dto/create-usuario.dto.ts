import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty({ message: 'E-mail não pode ser vazio' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres'})
    senha: string;

    @IsString()
    @IsNotEmpty()
    cpf: string;
}
