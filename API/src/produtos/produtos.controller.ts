import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';



@Controller('documentos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
   // console.log(process.env.BLA || 'VALOR_DEFAULT);
    //console.log(this.configService.get('BLA', 'VALOR_DEFAULT'))
    //console.log(this.configService.getOrThrow('BLA'))
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.produtosService.findOne(_id);
  }

 
  @Get('/pais/:nomePais')
  findOneByName(@Param('nomePais') nomeProduto: string) {
    return this.produtosService.findOneByName(nomeProduto);
  }

  @Patch(':nome')
  update(@Param('nome') nome: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(nome, updateProdutoDto);
  }

  @Delete(':nome')
  remove(@Param('nome') nome: string) {
    return this.produtosService.remove(nome);
  }
}
