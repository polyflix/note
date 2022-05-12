import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Option, Result } from "@swan-io/boxed";
import { Model } from "mongoose";
import { CreateNoteDto } from "../../../application/dto/create-note.dto";
import { NoteEntity, NoteDocument } from "./entities/note.entity";

@Injectable()
export class NoteRepository implements NoteRepository {
  private readonly logger = new Logger(NoteRepository.name);

  constructor(
    @InjectModel(NoteEntity.name)
    private readonly noteModel: Model<NoteDocument>
  ) {}

  async findOne(id: string): Promise<Option<NoteEntity>> {
    this.logger.log(`Retrieving note with id ${id}`);
    try {
      return Option.fromNullable<NoteEntity>(
        await this.noteModel.findById(id).exec()
      );
    } catch (e) {
      this.logger.error(e);
      return Option.None();
    }
  }

  async save(
    id: string,
    createNoteDto: CreateNoteDto
  ): Promise<Result<NoteEntity, Error>> {
    return Result.fromExecution(() => {
      this.logger.log(`Creating/Updating note with id : ${id}`);
      const note = new this.noteModel(createNoteDto);
      note.save();
      return note;
    });
  }
}
