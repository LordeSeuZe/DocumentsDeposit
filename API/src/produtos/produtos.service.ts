import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Documento } from './entities/produto.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
//Rafael Cacho de Barros


@Injectable()
export class ProdutosService {

  constructor(
    @InjectRepository(Documento)
    private readonly produtoRepository: MongoRepository<Documento>
  ) { }

  create(createProdutoDto: CreateProdutoDto) {
    const novoProduto = new Documento(); 
    novoProduto.pais = createProdutoDto.pais;
    novoProduto.cidade = createProdutoDto.cidade;
    return this.produtoRepository.save(novoProduto);
  }

  findAll() {
    return this.produtoRepository.find();
  }

  async findOne(_id: string) {
    return 'Buscar Produtos'
  }

  async findOneByName(pais: string): Promise<any> {

    const p = await this.produtoRepository.findOneBy({ pais: pais })
      .then((produtoBD) => {
        console.log(produtoBD)
        return produtoBD
      })
      .catch((erro) => {
        console.log(erro)
      })
    return p
  }

  async update(pais: string, updateProdutoDto: UpdateProdutoDto) {
    const atualizado = await this.produtoRepository.findOneAndUpdate({ pais: pais }, { $set: updateProdutoDto }) 
    .then((produtoBD) => {
      console.log(produtoBD)

      if (!produtoBD) {
        throw (`Não temos como atualizar um produto que não existe!`)
      }
      return `o pais "${pais}" foi Atualizado!!!`;
    })
    .catch((erro) => {
      console.log(erro)
    })

    return atualizado;
  }

  async remove(pais: string) {
    const remover = await this.produtoRepository.findOneAndDelete({ pais: pais })
      .then((produtoBD) => {
        console.log(produtoBD)
        if (!produtoBD) {
          throw (`O produto com o pais "${pais}" não existe!`)
        }
        return `o Produto com o pais "${pais}" foi removido`;
      })
      .catch((erro) => {
        console.log(erro)
      })
    return remover
  }
}

