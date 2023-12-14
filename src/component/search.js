// SearchComponent.js
import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchComponent = ({ value, onChange, onSearch }) => {
  return (
    <div className="d-flex">
      <input
        type="search"
        placeholder="Search your record !!"
        aria-label="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button variant="primary" className="submit-button" onClick={onSearch}>
        <FontAwesomeIcon icon={faSearch} />
        Search
      </Button>
    </div>
  );
};

export default SearchComponent;
