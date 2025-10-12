import React, { useState } from "react";
import { createNote } from "../../services/noteService";
import css from "./NoteForm.module.css";

type Props = {
  onClose: () => void;
};

const NoteForm = ({ onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Todo");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      await createNote({ title, content, tag });
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

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
