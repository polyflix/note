import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NoteDocument = NoteEntity & Document;

@Schema({
  timestamps: true
})
export class NoteEntity {
  @Prop()
  userId: string;

  @Prop()
  videoId: string;

  @Prop()
  content: string;
}

export const NoteSchema = SchemaFactory.createForClass(NoteEntity);
