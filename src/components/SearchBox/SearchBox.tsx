import React from "react";
import css from "./SearchBox.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBox = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      className={css.input}
      placeholder="Search notes..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBox;
