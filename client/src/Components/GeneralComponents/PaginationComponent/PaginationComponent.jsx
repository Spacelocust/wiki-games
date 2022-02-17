import React from 'react';
import ReactPaginate from 'react-paginate';

function PaginationComponent({ className, pageCount, onPageChange }) {
    return (
        <div>
            <ReactPaginate
                onPageChange={(pageEl) => onPageChange(pageEl)}
                containerClassName={`component-pagination ${className}`}
                pageClassName='component-pagination-page-item'
                pageLinkClassName='component-pagination-page-link'
                previousLinkClassName='component-pagination-page-link'
                nextLinkClassName='component-pagination-page-link'
                activeLinkClassName='component-pagination-page-active'
                breakClassName='component-pagination-page-item'
                breakLinkClassName='component-pagination-page-link'
                breakLabel="..."
                nextLabel="suivant >"
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="< précédent"
                renderOnZeroPageCount={null}
            />
        </div>
    );
}
export default PaginationComponent;
