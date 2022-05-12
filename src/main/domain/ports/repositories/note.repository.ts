import { Note } from "../../models/note.model";

export abstract class NoteRepository {
  abstract save(note: Note): Promise<Note>;
  abstract findOne(id: string): Promise<Note>;
}
