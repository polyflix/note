import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Option, Result } from "@swan-io/boxed";
import { Model } from "mongoose";
import { CreateNoteDto } from "../../../application/dto/note-save.dto";
import { NoteEntity, NoteDocument } from "./entities/note.entity";

@Injectable()
export class NoteRepository {
  private readonly logger = new Logger(NoteRepository.name);

  constructor(
    @InjectModel(NoteEntity.name)
    private readonly noteModel: Model<NoteDocument>
  ) {}

  async findOne(userId: string, videoId: string): Promise<Option<NoteEntity>> {
    this.logger.log(
      `Retrieving note from user with id ${userId} in video with id ${videoId}`
    );
    return Option.fromNullable<NoteEntity>(
      await this.noteModel.findOne({ userId, videoId }).exec()
    );
  }

  async save(createNoteDto: CreateNoteDto): Promise<Result<NoteEntity, Error>> {
    return Result.fromExecution(() => {
      this.logger.log(
        `Creating/Updating from user with id ${createNoteDto.userId} in video with id ${createNoteDto.videoId} with content : ${createNoteDto.content}`
      );
      const createdNote = new this.noteModel(createNoteDto);
      createdNote.save();
      return createdNote;
    });
  }
}
