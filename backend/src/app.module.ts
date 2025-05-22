import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { SnippetController } from './snippet.controller';
import { SnippetService } from './snippet.service';

@Module({
  imports: [],
  controllers: [AppController, SnippetController],
  providers: [AppService, SnippetService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
