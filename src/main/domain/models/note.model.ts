import { Result } from "@swan-io/boxed";
import { NoteInvalidError } from "../errors/note-invalid.error";

export class NoteProps {
  userId: string;
  videoId: string;
  content: string;
}

export class Note {
  private constructor(
    private readonly userId: string,
    private readonly videoId: string,
    private content: string
  ) {}

  static create(props: NoteProps): Note {
    const note = new Note(props.userId, props.videoId, props.content);

    return note.validate().match({
      Ok: () => note,
      Error: (e) => {
        throw new NoteInvalidError(e);
      }
    });
  }

  getUserId() {
    return this.userId;
  }

  getVideoId() {
    return this.videoId;
  }

  getContent() {
    return this.content;
  }

  setContent(content: string) {
    this.content = content;
  }

  private validate(): Result<string, string> {
    return Result.Ok("Model Valid");
  }
}
