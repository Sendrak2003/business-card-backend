
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.getHttpAdapter().get('/', (req, res) => {
    res.status(200).send('OK');
  });

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(
    `HTTP server listening on: ${JSON.stringify(app.getHttpServer().address())}`,
  );
}

bootstrap();
