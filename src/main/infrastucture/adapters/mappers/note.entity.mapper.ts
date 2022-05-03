import { Injectable } from "@nestjs/common";
import { AbstractMapper } from "src/main/core/helpers/abstract.mapper";
import { Note } from "src/main/domain/models/note.model";
import { NoteEntity } from "../repositories/entities/note.entity";

@Injectable()
export class NoteEntityMapper extends AbstractMapper<NoteEntity, Note> {
  apiToEntity(apiModel: Note): NoteEntity {
    const entity = new NoteEntity();
    Object.assign(entity, apiModel);
    return entity;
  }

  entityToApi(entity: NoteEntity): Note {
    const video = new Note();
    Object.assign(video, entity);
    return video;
  }
}
