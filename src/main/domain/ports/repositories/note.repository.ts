import { CreateNoteDto } from "src/main/application/dto/note-save.dto";
import { Note } from "src/main/domain/entities/note.schema";

export abstract class NoteRepository {
  abstract save(createNoteDto: CreateNoteDto): Promise<Note>;
  abstract findOne(userId: string, videoId: string): Promise<Note>;
}
