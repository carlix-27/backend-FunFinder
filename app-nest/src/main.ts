import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe()); Dato invalido tira error.
  await app.listen(3030);
}
bootstrap();
