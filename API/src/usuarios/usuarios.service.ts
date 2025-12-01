import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { MongoRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const CHAVE_JWT = process.env.CHAVE_JWT || "arruma isso!!"

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: MongoRepository<Usuario>
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const novoUsuario = new Usuario();
    novoUsuario.nome = createUsuarioDto.nome;
    novoUsuario.email = createUsuarioDto.email;
    novoUsuario.senha = await bcrypt.hash(createUsuarioDto.senha, 10);
    novoUsuario.cpf = await bcrypt.hash(createUsuarioDto.cpf, 10);
    return this.usuarioRepository.save(novoUsuario);
  
  }

  async login(email: string, senha: string) {
    const usuarioBD = await this.usuarioRepository.findOneBy({ email: email })

    if(usuarioBD === null) 
      return 'Usuário não cadastrado!';

    const senhaCorreta = await bcrypt.compare(senha, usuarioBD.senha);

    if(senhaCorreta) {
      const dadosParaEncriptar = { nome: usuarioBD.nome, email: usuarioBD.email }
      const token = jwt.sign(dadosParaEncriptar, CHAVE_JWT, { expiresIn: '1d' })
      return { token_jwt: token }
    }
    return '[ERRO]: Usuário ou senha incorretos!';
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: string) {
    return this.usuarioRepository.findOneBy({_id: new ObjectId(id)})
  }


  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const atualizado = await this.usuarioRepository.update({_id: new ObjectId(id)}, updateUsuarioDto).then((usuarioBD) => {
      console.log(usuarioBD);
      
      if (!usuarioBD) {
        throw ('Não à um usuário com essas credenciais')
      }

      return `Usuário de credenciais: ${id}, foi Atualizado!`
    }).catch((erro) => {
      console.log(erro);
    })

    return atualizado;
  }

  async remove(id: string) {
    await this.usuarioRepository.delete({_id: new ObjectId(id)})

    return `O usuário de gredenciais: ${id}, foi removido com sucesso!`;
  }
}
