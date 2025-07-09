import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true, // ganti dengan alamat frontend kamu
    credentials: true, // jika pakai cookie/session
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('LMS SERVICE API')
    .setDescription('Dokumentasi RESTful API untuk LMS')
    .setVersion('1.0')
    .addBearerAuth() // untuk auth JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // akses di /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
