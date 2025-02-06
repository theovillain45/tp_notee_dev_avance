import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activer CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Remplacez par l'origine de votre client
    methods: 'GET,POST,PUT,DELETE', // Méthodes HTTP autorisées
    credentials: true,              // Si vous utilisez des cookies ou des headers d'authentification
  });
  
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
