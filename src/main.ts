import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  console.log(
    `Launching NestJS app on port ${port}, URL: http://0.0.0.0:${port}`,
  );

  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
