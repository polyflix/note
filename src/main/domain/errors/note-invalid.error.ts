export class NoteInvalidError extends Error {
  constructor(message?: string) {
    super(message ?? `The note is invalid.`);
  }
}
