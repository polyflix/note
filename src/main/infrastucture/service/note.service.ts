import {
  ConflictException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { CreateNoteDto } from "../../application/dto/create-note.dto";
import { NoteRepository } from "../adapters/repositories/note.repository";
import { NoteEntity } from "../adapters/repositories/entities/note.entity";

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async findOne(videoId: string, userId: string): Promise<NoteEntity> {
    return (
      await this.noteRepository.findByUserAndVideo(videoId, userId)
    ).match({
      Some: (note) => note,
      None: () => {
        throw new NotFoundException(
          `Note not found for video ${videoId} and user ${userId}`
        );
      }
    });
  }

  async save(
    videoId: string,
    userId: string,
    createNoteDto: CreateNoteDto
  ): Promise<NoteEntity> {
    return (
      await this.noteRepository.save(videoId, userId, createNoteDto)
    ).match({
      Ok: (note) => note,
      Error: (error) => {
        throw error;
      }
    });
  }
}
