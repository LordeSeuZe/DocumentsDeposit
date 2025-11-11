import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
//Rafael Cacho de Barros


@Injectable()
export class ProdutosService {

  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: MongoRepository<Produto>
  ) { }

  create(createProdutoDto: CreateProdutoDto) {
    const novoProduto = new Produto();
    novoProduto.nome = createProdutoDto.nome;
    novoProduto.preco = createProdutoDto.preco;
    return this.produtoRepository.save(novoProduto);
  }

  findAll() {
    return this.produtoRepository.find();
  }

  async findOne(_id: string) {
    return 'Buscar Produtos'
  }

  async findOneByName(nome: string): Promise<any> {

    const p = await this.produtoRepository.findOneBy({ nome: nome })
      .then((produtoBD) => {
        console.log(produtoBD)
        return produtoBD
      })
      .catch((erro) => {
        console.log(erro)
      })
    return p
  }

  async update(nome: string, updateProdutoDto: UpdateProdutoDto) {
    const atualizado = await this.produtoRepository.findOneAndUpdate({ nome: nome }, { $set: updateProdutoDto }) 
    .then((produtoBD) => {
      console.log(produtoBD)

      if (!produtoBD) {
        throw (`Não temos como atualizar um produto que não existe!`)
      }
      return `o Produto com o nome "${nome}" foi Atualizado!!!`;
    })
    .catch((erro) => {
      console.log(erro)
    })

    return atualizado;
  }

  async remove(nome: string) {
    const remover = await this.produtoRepository.findOneAndDelete({ nome: nome })
      .then((produtoBD) => {
        console.log(produtoBD)
        if (!produtoBD) {
          throw (`O produto com o nome "${nome}" não existe!`)
        }
        return `o Produto com o nome "${nome}" foi removido`;
      })
      .catch((erro) => {
        console.log(erro)
      })
    return remover
  }
}

