import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  content: string;
}
