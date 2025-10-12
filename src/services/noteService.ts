import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtzZW5hdWFAaWNsb3VkLmNvbSIsImlhdCI6MTc2MDA1Mzc2MX0.qaqx0S3mvGpx-ZuynKpcJuzU4y1-suw4MSmWYz2S5-Q";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await instance.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search },
  });
  return response.data;
};

export const createNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const response = await instance.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete<Note>(`/notes/${id}`);
  return response.data;
};
