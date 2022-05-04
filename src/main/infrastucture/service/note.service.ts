import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNoteDto } from "../../application/dto/note-save.dto";
import { NoteRepository } from "../adapters/repositories/note.repository";
import { NoteEntity } from "../adapters/repositories/entities/note.entity";

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async findOne(userId: string, videoId: string): Promise<NoteEntity> {
    return (await this.noteRepository.findOne(userId, videoId)).match({
      Some: (note) => note,
      None: () => {
        throw new NotFoundException(
          `Note not found from user with id ${userId} in video with id ${videoId}`
        );
      }
    });
  }

  async save(createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    return (await this.noteRepository.save(createNoteDto)).match({
      Ok: (note) => note,
      Error: (error) => {
        throw error;
      }
    });
  }
}
