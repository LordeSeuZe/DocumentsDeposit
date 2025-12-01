import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
const CHAVE_JWT = process.env.CHAVE_JWT || "arruma isso!!"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    //const token = req.headers.authorization;
    if(!token) {
      throw new UnauthorizedException('[ERRO]: Não autorizado! Token não enviado!')
    }
    try {
      const tokenDecodificado = await jwt.verify(token, CHAVE_JWT);
     // req['usuarios'] = tokenDecodificado;
      next()
    }       catch (erro) {
      throw new UnauthorizedException('[ERRO]: O token é inválido ou expirado!')
    }
  }
}
