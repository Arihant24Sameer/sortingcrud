import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import validateInputs from "../component/validation";
import Button from "../component/button";
import CustomPagination from "../component/paginatedItems";
import CustomTable from "../component/table";
import Input from "../component/input";
import SearchComponent from "../component/search";
import "./table.css";
import "./styles.css";

const PAGE_SIZE = 5;

const UserDetails = () => {
  const [details, setDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [msg, setMsg] = useState(false);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [sortedData, setSortedData] = useState([]);

  const deleteItem = (index) => {
    const updatedDetails = [...details];
    updatedDetails.splice(index, 1);
    setDetails(updatedDetails);
    setInput({ firstName: "", lastName: "", email: "", phone: "" });

    const newTotalDetailPages = Math.ceil(updatedDetails.length / PAGE_SIZE);
    if (currentPage > newTotalDetailPages) {
      setCurrentPage(newTotalDetailPages);
    }
  };

  const handleSearch = () => {
    const trimmedSearch = search.trim();
    console.log("handleSearch");
    if (trimmedSearch === "") {
      return;
    }

    const searchTerms = trimmedSearch.toLowerCase().split(" ");
    const foundItems = details.filter((item) =>
      searchTerms.some((term) =>
        ["firstName", "email", "phone"].some(
          (field) =>
            item[field] && String(item[field]).toLowerCase().includes(term)
        )
      )
    );

    if (foundItems.length === 0) {
      setMsg(true);
    } else {
      setMsg(false);
    }

    setValidationErrors({
      ...validationErrors,
      search: foundItems.length === 0 ? "No matching records found" : "",
    });

    setSearchResult(foundItems);
    setSearch("");
    setEditIndex(null);
    setCurrentPage(1);

    if (foundItems.length === 0) {
      setSearchResult([]);
    }
  };
  useEffect(() => {
    console.log("Sorted Data:", sortedData);
  }, [sortedData]);
  const editData = (index) => {
    const originalIndex = (currentPage - 1) * PAGE_SIZE + index;
    setEditIndex(originalIndex);
    const { firstName, lastName, email, phone } = details[originalIndex];
    setInput({ firstName, lastName, email, phone });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("handleClick submit...");
    const errors = validateInputs(input);

    if (Object.keys(errors).length === 0) {
      if (editIndex !== null) {
        const updatedDetails = [...details];
        updatedDetails[editIndex] = { ...input };
        setDetails(updatedDetails);
        setEditIndex(null);
      } else {
        setDetails([...details, input]);
      }

      setSearchResult([]);
      setCurrentPage(1);

      setInput({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
      setValidationErrors({});
    } else {
      setValidationErrors(errors);
    }
  };

  const renderContent = () => {
    if (details.length === 0 && searchResult.length === 0) {
      return null;
    }

    const showPaginationDetails = details.length > PAGE_SIZE;
    const showSearchPagination =
      searchResult.length > 0 && searchResult.length > PAGE_SIZE;

    if (searchResult.length > 0) {
      return (
        <div className="table-container">
          <nav className="navbar navbar-light bg-light search-box">
            <h2>Search Result</h2>
            <div className="d-flex">
              <SearchComponent
                value={search}
                onChange={(value) => setSearch(value)}
                onSearch={handleSearch}
              />
            </div>
            {validationErrors.search && (
              <div className="invalid-feedback">{validationErrors.search}</div>
            )}
          </nav>
          <CustomTable
            data={paginatedDetails()}
            deleteItem={deleteItem}
            editData={editData}
          />
          {showSearchPagination && (
            <div className="d-flex justify-content-center mb-2">
              <CustomPagination
                totalPages={Math.ceil(searchResult.length / PAGE_SIZE)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      );
    } else if (msg === true) {
      return (
        <Alert variant="info" className="mt-3">
          No records found. Would you like to search other record?
          <Button
            variant="primary"
            className="ms-2"
            onClick={() => setMsg(false)}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> back
          </Button>
        </Alert>
      );
    } else {
      return (
        <div className="table-container">
          {details.length > 0 && (
            <nav className="navbar navbar-light bg-light search-box">
              <h2>Submitted Details</h2>
              <div className="d-flex">
                <Input
                  type="search"
                  placeholder="Search your record here !!"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  variant="primary"
                  className="submit-button"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
              {validationErrors.search && (
                <div className="invalid-feedback">
                  {validationErrors.search}
                </div>
              )}
            </nav>
          )}
          <CustomTable
            data={
              sortedData.length > 0 ? paginatedDetails() : paginatedDetails()
            }
            deleteItem={deleteItem}
            editData={editData}
            onClick={sortData}
          />
          {showPaginationDetails && (
            <div className="d-flex justify-content-center mb-2">
              <CustomPagination
                totalPages={Math.ceil(details.length / PAGE_SIZE)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      );
    }
  };

  const paginatedDetails = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const dataToDisplay = searchResult.length > 0 ? searchResult : details;
    // return dataToDisplay(searchResult.length > 0 ? searchResult : details).slice(
    //   startIndex,
    //   endIndex
    // );
    return dataToDisplay.slice(startIndex, endIndex);
  };

  const sortData = (data) => {
    console.log(
      "cliked !!",
      data.sort((a, b) => a.firstName.localeCompare(b.firstName))
    );
    const updatedData = data.sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
    setSortedData(updatedData);
    // return data.sort((a, b) => a.firstName.localeCompare(b.firstName));
  };
  console.log(sortedData, "sortedData");
  console.log(details, "details array data ");
  return (
    <div className="container mt-5">
      <form className="form-box">
        <div className="mb-3">
          <h2>Register Now</h2>
          <hr />
          <div className="mb-3 row">
            <div className="col-sm-6">
              <Input
                type="text"
                placeholder="First Name"
                value={input.firstName}
                onChange={(e) =>
                  setInput({
                    ...input,
                    firstName: e.target.value.replace(/[^A-Za-z\s]/g, ""),
                  })
                }
                className={`form-control ${
                  validationErrors.firstName ? "is-invalid" : ""
                }`}
              />
              {validationErrors.firstName && (
                <div className="invalid-feedback">
                  {validationErrors.firstName}
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <Input
                type="text"
                placeholder="Last Name(optional)"
                className="form-control"
                onChange={(e) =>
                  setInput({
                    ...input,
                    lastName: e.target.value.replace(/[^A-Za-z\s]/g, ""),
                  })
                }
                value={input.lastName}
              />
            </div>
          </div>

          <div className="mb-3">
            <Input
              type="text"
              placeholder="Email"
              className={`form-control ${
                validationErrors.email ? "is-invalid" : ""
              }`}
              onChange={(e) =>
                setInput({
                  ...input,
                  email: e.target.value.replace(/[^A-Za-z0-9@_\.-]/g, ""),
                })
              }
              value={input.email}
            />
            {validationErrors.email && (
              <div className="invalid-feedback">{validationErrors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <Input
              type="text"
              placeholder="Phone"
              className={`form-control ${
                validationErrors.phone ? "is-invalid" : ""
              }`}
              value={input.phone}
              onChange={(e) =>
                setInput({
                  ...input,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
            />
            {validationErrors.phone && (
              <div className="invalid-feedback">{validationErrors.phone}</div>
            )}
          </div>

          <Button
            variant="primary"
            type="submit"
            name="searchButton"
            onClick={handleClick}
          >
            {editIndex !== null ? "Update" : "Submit"}
          </Button>
        </div>
      </form>

      {renderContent()}
    </div>
  );
};

export default UserDetails;
