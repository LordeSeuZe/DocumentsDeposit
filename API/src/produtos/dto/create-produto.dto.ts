import { IsNotEmpty, IsString } from "class-validator";

export class CreateProdutoDto {
    @IsString()
    @IsNotEmpty()
    pais: string;

    @IsString()
    @IsNotEmpty()
    cidade: string;
}
