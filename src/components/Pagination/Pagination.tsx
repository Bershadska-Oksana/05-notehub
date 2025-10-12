import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

type Props = {
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
};

const Pagination = ({ pageCount, onPageChange }: Props) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousLabel={"<"}
      nextLabel={">"}
    />
  );
};

export default Pagination;
