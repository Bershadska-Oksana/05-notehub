import React, { useState } from "react";
import { createNote } from "../../services/noteService";
import css from "./NoteForm.module.css";

type Props = {
  onClose: () => void;
};

const NoteForm = ({ onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !text) return;

    try {
      await createNote({ title, text, tag });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={css.buttons}>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
