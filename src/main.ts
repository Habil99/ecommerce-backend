import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  app.enableCors({
    origin: "*",
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Ecommerce API with NestJS")
    .setDescription("API Documentation for Ecommerce API with NestJS")
    .setVersion("1.0")
    .addTag("ecommerce")
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, swaggerDocument);

  await app.listen(3000);
}

bootstrap();
