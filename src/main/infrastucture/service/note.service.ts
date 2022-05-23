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

  async findOne(id: string): Promise<NoteEntity> {
    return (await this.noteRepository.findOne(id)).match({
      Some: (note) => note,
      None: () => {
        throw new NotFoundException(`Note not found with id ${id}`);
      }
    });
  }

  async save(
    id: string,
    videoId: string,
    userId: string,
    createNoteDto: CreateNoteDto
  ): Promise<NoteEntity> {
    if (videoId || userId)
      (await this.noteRepository.findByUserAndVideo(videoId, userId)).match({
        Some: () => {
          if (!id)
            throw new ConflictException(
              `A note created by user ${userId} for video ${videoId} already exists`
            );
        },
        None: () => undefined
      });
    return (
      await this.noteRepository.save(id, videoId, userId, createNoteDto)
    ).match({
      Ok: (note) => note,
      Error: (error) => {
        throw error;
      }
    });
  }
}
