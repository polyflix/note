import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OpenTelemetryModule } from "nestjs-otel";
import { HealthModule } from "../core/health/health.module";
import { KafkaModule } from "../core/kafka/kafka.module";
import { NoteEntity } from "./adapters/repositories/entities/note.entity";
import { NoteRepository } from "./adapters/repositories/note.repository";
import { NoteController } from "./controllers/note.controller";
import { NoteService } from "./service/note.service";

@Global()
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://root:root@localhost:27017/polyflix"),
    KafkaModule,
    HealthModule,
    OpenTelemetryModule.forRoot(),
    MongooseModule.forFeature([{ name: NoteEntity.name, schema: NoteEntity }])
  ],
  controllers: [NoteController],
  providers: [NoteRepository, NoteService]
})
export class InfrastructureModule {}
