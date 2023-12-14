import React from "react";
import { Button } from "react-bootstrap";

const CustomPagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="d-flex justify-content-center mb-3">
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={pageNumber === currentPage ? "primary" : "secondary"}
          className="me-2"
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
    </div>
  );
};

export default CustomPagination;
