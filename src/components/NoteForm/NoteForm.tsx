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
  const [titleError, setTitleError] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    if (!value) {
      setTitleError("Title is required");
    } else if (value.length < 3) {
      setTitleError("Title must be at least 3 characters");
    } else {
      setTitleError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setTitleError("Title is required");
      return;
    }
    if (title.length < 3) {
      setTitleError("Title must be at least 3 characters");
      return;
    }
    if (!content) return;

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
      <div className={css.formGroup}>
        <label>Title</label>
        <input
          className={css.input}
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <p className={css.error}>{titleError}</p>}
      </div>

      <div className={css.formGroup}>
        <label>Content</label>
        <textarea
          className={css.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label>Category</label>
        <select
          className={css.select}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button className={css.submitButton} type="submit">
          Save
        </button>
        <button className={css.cancelButton} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
