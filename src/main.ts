import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "src/all-exceptions.filter";
// import { MyLoggerService } from "src/my-logger/my-logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  // app.useLogger(app.get(MyLoggerService));
  app.enableCors();
  app.setGlobalPrefix("api/v1");
  await app.listen(6000);
}
bootstrap();
