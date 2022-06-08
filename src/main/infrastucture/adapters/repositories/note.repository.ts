import {
  Injectable,
  InternalServerErrorException,
  Logger
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Option, Result } from "@swan-io/boxed";
import { Model } from "mongoose";
import { CreateNoteDto } from "../../../application/dto/create-note.dto";
import { NoteDocument, NoteEntity } from "./entities/note.entity";

@Injectable()
export class NoteRepository implements NoteRepository {
  private readonly logger = new Logger(NoteRepository.name);

  constructor(
    @InjectModel(NoteEntity.name)
    private readonly noteModel: Model<NoteDocument>
  ) {}

  async findByUserAndVideo(
    videoId: string,
    userId: string
  ): Promise<Option<NoteEntity>> {
    this.logger.log(
      `Retrieving note created by user ${userId} for video ${videoId}`
    );
    try {
      return Option.fromNullable<NoteEntity>(
        await this.noteModel.findOne({ userId, videoId })
      );
    } catch (e) {
      this.logger.error(e);
      return Option.None();
    }
  }

  async save(
    videoId: string,
    userId: string,
    createNoteDto: CreateNoteDto
  ): Promise<Result<Promise<NoteEntity>, Error>> {
    return Result.fromExecution(async () => {
      this.logger.log(`Save note by user ${userId} for video ${videoId}`);
      return this.noteModel
        .findOneAndUpdate(
          { videoId, userId },
          {
            videoId,
            userId,
            ...createNoteDto
          },
          { upsert: true, new: true },
          (err, doc) => {
            if (err) throw new InternalServerErrorException(err);
            return doc;
          }
        )
        .clone();
    });
  }
}
