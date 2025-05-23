import React from "react";
import "../stylesheets/Pagination.css"

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="arrow">&#8592;</span> Previous
        </button>
  
        {pageNumbers.slice(0, 3).map(number => (
          <button
            key={number}
            className={`page-number ${currentPage === number ? 'active' : ''}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
  
        <span className="dots">...</span>
  
        <button
          className="page-number"
          onClick={() => onPageChange(totalPages - 1)}
        >
          {totalPages - 1}
        </button>
        <button
          className="page-number"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
  
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <span className="arrow">&#8594;</span>
        </button>
      </div>
    );
  }
  
  export default Pagination;
  