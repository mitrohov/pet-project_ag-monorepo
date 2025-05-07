import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  {
    logger: ['log', 'debug', 'error', 'warn', 'verbose'],
  });

  app.enableCors({
    origin: (origin, callback) => {
      const WHITE_LIST: string[] = process.env.WHITE_LIST
        ? process.env.WHITE_LIST.split(',')
        : [];

      if (!origin || WHITE_LIST.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  const config = new DocumentBuilder()
    .addCookieAuth('access-token')
    .setTitle('api.anastasiageiko.ru')
    .setDescription('Anastasia Geiko CRM API description')
    .setVersion('2.0')
    .build();

  const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap().then();
