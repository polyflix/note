import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { CreateNoteDto } from "../../application/dto/note-save.dto";
import { NoteEntity } from "../adapters/repositories/entities/note.entity";
import { NoteService } from "../service/note.service";

@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(":id")
  async find(@Param("id") id: string): Promise<NoteEntity> {
    return this.noteService.findOne(id);
  }

  @Put(":id?")
  async save(
    @Body() createNoteDto: CreateNoteDto,
    @Param("id") id: string
  ): Promise<NoteEntity> {
    return this.noteService.save(id, createNoteDto);
  }
}
