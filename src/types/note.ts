export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  tag?: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type NewNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export interface FetchNotesResponse {
  data: Note[];
  page?: number;
  perPage?: number;
  total?: number;
  totalPages?: number;
}
