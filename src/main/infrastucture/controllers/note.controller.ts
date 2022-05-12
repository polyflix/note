import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { CreateNoteDto } from "../../application/dto/create-note.dto";
import { NoteEntity } from "../adapters/repositories/entities/note.entity";
import { NoteService } from "../service/note.service";

@Controller("notes")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<NoteEntity> {
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
