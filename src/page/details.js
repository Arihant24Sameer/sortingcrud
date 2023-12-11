import React, { useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
    const searchTerms = search.toLowerCase().trim().split(" ");
    const foundItems = details.filter((item) =>
      searchTerms.every((term) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      )
    );

    if (foundItems.length === 0) {
      setMsg(true);
    } else {
      setMsg(false);
    }
    setSearchResult(foundItems);
    setSearch("");
    setEditIndex(null);
    setCurrentPage(1);
  };

  const editData = (index) => {
    setEditIndex(index);
    const { firstName, lastName, email, phone } = details[index];
    setInput({ firstName, lastName, email, phone });

    const clickedPageIndex = Math.ceil((index + 1) / PAGE_SIZE);
    setCurrentPage(clickedPageIndex);
  };

  const validateInputs = () => {
    const errors = {};
    if (!input.firstName.trim()) {
      errors.firstName = "First Name is required";
    } else if (!/^[A-Za-z]{3,}$/.test(input.firstName)) {
      errors.firstName = "First Name should contain at least 3 letters";
    }
    if (!input.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!input.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(input.phone)) {
      errors.phone = "Invalid phone number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

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
  };

  const renderContent = () => {
    if (details.length === 0 && searchResult.length === 0) {
      return null;
    }

    const showPaginationDetails = details.length > PAGE_SIZE;
    const showPaginationSearchResult = searchResult.length > PAGE_SIZE;

    if (searchResult.length > 0) {
      return (
        <div className="table-container">
          <h2>Search Result:</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDetails().map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {showPaginationSearchResult && (
            <div className="d-flex justify-content-center mb-2">
              {renderPageNumbers(
                Math.ceil(searchResult.length / PAGE_SIZE),
                searchResult
              )}
            </div>
          )}
        </div>
      );
    } else if (msg === true) {
      return (
        <Alert variant="info" className="mt-3">
          No records found
        </Alert>
      );
    } else {
      return (
        <div className="table-container">
          <h2>Submitted Details:</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDetails().map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteItem(index)}>
                      Delete
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => editData(index)}
                      className="ms-2"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {showPaginationDetails && (
            <div className="d-flex justify-content-center mb-2">
              {renderPageNumbers(
                Math.ceil(details.length / PAGE_SIZE),
                details
              )}
            </div>
          )}
        </div>
      );
    }
  };

  const renderPageNumbers = (totalPages, array) => {
    return (
      <div className="d-flex justify-content-center mb-3">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            variant={index + 1 === currentPage ? "primary" : "secondary"}
            className="me-2"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    );
  };

  const paginatedDetails = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return sortData(searchResult.length > 0 ? searchResult : details).slice(
      startIndex,
      endIndex
    );
  };

  const sortData = (data) => {
    return data.sort((a, b) => a.firstName.localeCompare(b.firstName));
  };

  return (
    <div className="container mt-5">
      {details.length > 0 && (
        <nav className="navbar navbar-light bg-light search-box">
          <div className="d-flex">
            <input
              className={`form-control me-2 ${
                validationErrors.search ? "is-invalid" : ""
              }`}
              type="search"
              placeholder="Search"
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
            <div className="invalid-feedback">{validationErrors.search}</div>
          )}
        </nav>
      )}

      <form onSubmit={handleSubmit} className="form-box">
        <div className="mb-3">
          <h2>Register Now</h2>
          <hr></hr>
          <div className="mb-3 row">
            <div className="col-sm-6">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                className={`form-control ${
                  validationErrors.firstName ? "is-invalid" : ""
                }`}
                value={input.firstName}
                onChange={(e) =>
                  setInput({
                    ...input,
                    firstName: e.target.value.replace(/[^A-Za-z\s]/g, ""),
                  })
                }
              />

              {validationErrors.firstName && (
                <div className="invalid-feedback">
                  {validationErrors.firstName}
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                placeholder="Last Name(optional)"
                name="lastName"
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
            <input
              type="text"
              placeholder="Email"
              name="email"
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
            <input
              type="text"
              placeholder="Phone"
              name="phone"
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

          <Button variant="primary" className="mb-2" type="submit">
            {editIndex !== null ? "Update" : "Submit"}
          </Button>
        </div>
      </form>

      {renderContent()}
    </div>
  );
};

export default UserDetails;
