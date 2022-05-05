import { AbstractMapper } from "../../../core/helpers/abstract.mapper";
import { Note } from "../../../domain/models/note.model";
import { NoteEntity } from "../repositories/entities/note.entity";

export class NoteEntityMapper extends AbstractMapper<NoteEntity, Note> {
  apiToEntity(apiModel: Note): NoteEntity {
    const entity = new NoteEntity();
    Object.assign(entity, apiModel);
    return entity;
  }

  entityToApi(entity: NoteEntity): Note {
    const note = new Note();
    Object.assign(note, entity);
    return note;
  }
}
