import { Note } from "../../models/note.model";

export abstract class NoteRepository {
  abstract save(note: Note): Promise<Note>;
  abstract findOne(userId: string, videoId: string): Promise<Note>;
}
