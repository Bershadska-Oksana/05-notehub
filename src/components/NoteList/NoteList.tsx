import React from "react";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

type Props = {
  notes: Note[];
};

const NoteList = ({ notes }: Props) => {
  if (!notes || notes.length === 0) return <p>No notes found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.text}</p>
          <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
