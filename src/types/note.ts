export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export default interface Note {
  id: string;
  title: string;
  content?: string;
  tag: NoteTag;

  createdAt?: string;
  updatedAt?: string;
}
