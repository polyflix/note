import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { loadConfiguration } from "./config/loader.config";
import { logger } from "./config/logger.config";
import { configureOTel } from "./config/tracing.config";

export const API_VERSION = "2.0.0";

async function bootstrap() {
  const config = loadConfiguration(logger);

  // Must be started before NestFactory
  const telemetry = configureOTel(config, logger);
  await telemetry.start();

  // Gracefully shutdown OTel data, it ensures that all data
  // has been dispatched before shutting down the server
  process.on("SIGTERM", () => {
    telemetry.shutdown().finally(() => process.exit(0));
  });

  const app = await NestFactory.create(AppModule.bootstrap({ config }), {
    logger
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: API_VERSION
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  const port = config["server"]["port"] || 3000;

  await app.startAllMicroservices();

  await app.listen(port, () => {
    logger.log(`Server listening on port ${port}`, "NestApplication");
  });
}

bootstrap();
