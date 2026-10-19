import "reflect-metadata";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ResponseInterceptorInterceptor } from "./common/interceptor/response.interceptor";

import cookieParser from 'cookie-parser';
// somewhere in your initialization file




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rawPort = (process.env.PORT ?? "").trim();
  const parsedPort = rawPort.length > 0 ? Number(rawPort) : Number.NaN;
  const port =
    Number.isFinite(parsedPort) && parsedPort >= 0 && parsedPort <= 65535
      ? parsedPort
      : 5000;

  // app.use(helmet())

  // cookie parser
  app.use(cookieParser());
  // set global api url localhost:5000/api/v1
  app.setGlobalPrefix("api/v1");

  // cors
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  // set global response formate
  app.useGlobalInterceptors(new ResponseInterceptorInterceptor());

  // data validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // listening
  await app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
