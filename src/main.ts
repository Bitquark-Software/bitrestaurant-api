import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common'
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();
  app.use(cors());
  app.setGlobalPrefix('/users');
  await app.listen(process.env.APP_PORT ||3000);
}
bootstrap();
