import React from "react";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

type Props = {
  notes: Note[];
  onDelete?: (id: string) => void;
};

const NoteList = ({ notes, onDelete }: Props) => {
  if (!notes || notes.length === 0) return <p>No notes found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            {onDelete && (
              <button
                className={css.button}
                onClick={() => onDelete(note.id)}
                aria-label="Delete note"
              >
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
