import ReactPaginate from "react-paginate";
import React from "react";
import styles from './Pagination.module.scss'

type PaginationPropsType = {
    currentPage:number
    onChangePage:(value:number)=>void
}
export const Pagination:React.FC<PaginationPropsType> = ({currentPage, onChangePage}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
        />
    )
}