import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import css from "./NoteForm.module.css";

export interface NoteFormProps {
  onClose: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  content: Yup.string(),
  tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]),
});

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: FormValues) => createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      onClose();
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: { title: "", content: "", tag: "Todo" },
    validationSchema,
    onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => {
      mutation.mutate(values);
      helpers.setSubmitting(false);
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <p className={css.error}>{formik.errors.title}</p>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={6}
        />
        {formik.touched.content && formik.errors.content && (
          <p className={css.error}>{formik.errors.content}</p>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={formik.values.tag}
          onChange={formik.handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          className={css.submitButton}
          type="submit"
          disabled={mutation.isLoading || formik.isSubmitting}
        >
          Save
        </button>
        <button
          className={css.cancelButton}
          type="button"
          onClick={() => {
            formik.resetForm();
            onClose();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
