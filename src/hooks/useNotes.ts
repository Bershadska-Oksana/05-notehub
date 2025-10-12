import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote, deleteNote } from "../services/noteService";
import type { Note } from "../types/note";

export const useNotes = (page: number, search: string) => {
  const queryClient = useQueryClient();

  const notesQuery = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
  });

  const addNote = useMutation({
    mutationFn: (note: Omit<Note, "id">) => createNote(note),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const removeNote = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  return { notesQuery, addNote, removeNote };
};
