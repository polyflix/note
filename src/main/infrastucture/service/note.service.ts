import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNoteDto } from "../../application/dto/note-save.dto";
import { NoteRepository } from "../adapters/repositories/note.repository";
import { NoteEntity } from "../adapters/repositories/entities/note.entity";

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async findOne(id: string): Promise<NoteEntity> {
    return (await this.noteRepository.findOne(id)).match({
      Some: (note) => note,
      None: () => {
        throw new NotFoundException(`Note not found with id ${id}`);
      }
    });
  }

  async save(id: string, createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    return (await this.noteRepository.save(id, createNoteDto)).match({
      Ok: (note) => note,
      Error: (error) => {
        throw error;
      }
    });
  }
}
