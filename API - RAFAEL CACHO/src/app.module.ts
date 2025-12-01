import { MiddlewareConsumer, Module, NestModule,RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { ConfigModule , ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthMiddleware } from './auth/auth.middleware';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env']
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.URL_BD || 'INSERIR URL DE CONEXAO AQUI!',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true, //recria toda vez que a aplicação roda
      logging: true
    }),
    ProdutosModule,
    UsuariosModule
  ], //todos os imports
  controllers: [AppController], //garçom das req
  providers: [AppService], //executa regras de negócio
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .exclude(
        { path: "usuarios", method: RequestMethod.POST },
        { path: "usuarios/login", method: RequestMethod.POST }
      )
      .forRoutes("produtos", "usuarios")
  }
}
