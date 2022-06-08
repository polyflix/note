import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { MeId } from "@polyflix/x-utils";
import { UpsertNote } from "src/main/application/dto/upsert-note.dto";
import { NoteEntity } from "../adapters/repositories/entities/note.entity";
import { NoteService } from "../service/note.service";

@Controller("notes")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get("/:videoId")
  async findOne(
    @MeId() userId: string,
    @Param("videoId") videoId: string
  ): Promise<NoteEntity> {
    return this.noteService.findOne(videoId, userId);
  }

  @Put(":videoId")
  async save(
    @Body() upsertNote: UpsertNote,
    @Param("videoId") videoId: string,
    @MeId() userId: string
  ): Promise<NoteEntity> {
    return this.noteService.save(videoId, userId, upsertNote);
  }
}
