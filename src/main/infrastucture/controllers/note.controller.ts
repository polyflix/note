import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { CreateNoteDto } from "src/main/application/dto/note-save.dto";
import { Note } from "src/main/domain/entities/note.schema";
import { NoteService } from "../service/note.service";

@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async find(
    @Query("userId") userId: string,
    @Query("videoId") videoId: string
  ): Promise<Note> {
    return this.noteService.findOne(userId, videoId);
  }

  @Put()
  async save(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteService.save(createNoteDto);
  }
}
