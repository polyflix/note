import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NoteDocument = NoteEntity & Document;

@Schema()
export class NoteEntity {
  @Prop()
  videoId: string;

  @Prop()
  userId: string;

  @Prop()
  content: string;
}

export const NoteSchema = SchemaFactory.createForClass(NoteEntity);
