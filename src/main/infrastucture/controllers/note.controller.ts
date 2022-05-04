import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { CreateNoteDto } from "../../application/dto/note-save.dto";
import { NoteEntity } from "../adapters/repositories/entities/note.entity";
import { NoteService } from "../service/note.service";

@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  async find(
    @Query("userId") userId: string,
    @Query("videoId") videoId: string
  ): Promise<NoteEntity> {
    return this.noteService.findOne(userId, videoId);
  }

  @Put()
  async save(@Body() createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    return this.noteService.save(createNoteDto);
  }
}
