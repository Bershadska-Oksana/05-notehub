export interface Note {
  _id: string;
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  createdAt: string;
  updatedAt?: string;
}

export type NewNote = Omit<Note, "_id" | "createdAt" | "updatedAt">;

export interface FetchNotesResponse {
  data: Note[];
  totalPages: number;
}
