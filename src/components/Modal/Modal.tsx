import React from "react";
import css from "./Modal.module.css";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const Modal = ({ onClose, children, title }: Props) => {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {title && <h2 style={{ marginBottom: "16px" }}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
