import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';


@Controller('produtos')
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

  //url_api/produtos/nome/Arroz
  @Get('/nome/:nomeProduto')
  findOneByName(@Param('nomeProduto') nomeProduto: string) {
    return this.produtosService.findOneByName(nomeProduto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtosService.remove(+id);
  }
}
