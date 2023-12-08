import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const PaginatedItems = ({ itemsPerPage, items }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = items.slice(itemOffset, itemOffset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <p>First Name: {item.firstName}</p>
            <p>Last Name: {item.lastName}</p>
            <p>Email: {item.email}</p>
            <p>Phone: {item.phone}</p>
          </div>
        ))}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedItems;
