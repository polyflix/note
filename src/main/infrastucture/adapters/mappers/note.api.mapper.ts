import { Injectable } from "@nestjs/common";
import { AbstractMapper } from "../../../core/helpers/abstract.mapper";
import { Note } from "../../../domain/models/note.model";
import { NoteEntity } from "../repositories/entities/note.entity";

@Injectable()
export class VideoApiMapper extends AbstractMapper<Note, NoteEntity> {
  apiToEntity(apiModel: NoteEntity): Note {
    const entity = new Note();
    Object.assign(entity, apiModel);
    return entity;
  }

  entityToApi(entity: Note): NoteEntity {
    const note = new NoteEntity();
    Object.assign(note, entity);
    return note;
  }
}
