export interface Note {
  _id: string;
  id?: string;
  title: string;
  text: string;
  tag?: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  createdAt: string;
  updatedAt?: string;
}
