import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { OpenTelemetryModule } from "nestjs-otel";
import { HealthModule } from "../core/health/health.module";
import { KafkaModule } from "../core/kafka/kafka.module";
import {
  NoteEntity,
  NoteSchema
} from "./adapters/repositories/entities/note.entity";
import { NoteRepository } from "./adapters/repositories/note.repository";
import { NoteController } from "./controllers/note.controller";
import { NoteService } from "./service/note.service";

@Global()
@Module({
  imports: [
    KafkaModule,
    HealthModule,
    OpenTelemetryModule.forRoot(),
    MongooseModule.forFeature([{ name: NoteEntity.name, schema: NoteSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("database.mongo.uri")
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [NoteController],
  providers: [NoteRepository, NoteService]
})
export class InfrastructureModule {}
