import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./table.css";
import "./styles.css";

const PAGE_SIZE = 5;

const Details = () => {
  const [details, setDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Invalid name")
      .trim()
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Invalid name")
      .trim(),
    email: Yup.string()
      .email("Invalid email")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter valid email address")
      .trim()
      .min(2, "Email address should contain at least 2")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone should contain only numbers")
      .min(10, "Phone should be at least 10 digits")
      .max(10, "Phone should not exceed 10 digits")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const fullName = `${values.firstName} ${values.lastName || ""}`;

      if (editIndex !== null) {
        const updatedDetails = [...details];
        updatedDetails[editIndex] = { ...values, name: fullName };
        setDetails(updatedDetails);
        setEditIndex(null);
      } else {
        setDetails([...details, { ...values, name: fullName }]);
      }

      setSearchResult([]);
      formik.resetForm();
    },
  });

  const deleteItem = (index) => {
    const updatedDetails = [...details];
    updatedDetails.splice(index, 1);
    setDetails(updatedDetails);
  };

  const handleSearch = () => {
    const searchTerms = search.toLowerCase().split(" ");

    const foundItems = details.filter((item) =>
      searchTerms.every(
        (term) =>
          item.firstName.toLowerCase().startsWith(term) ||
          item.lastName.toLowerCase().startsWith(term) ||
          item.email.toLowerCase().startsWith(term) ||
          item.phone.toLowerCase().startsWith(term)
      )
    );

    setSearchResult(foundItems);
  };

  const editData = (index) => {
    setEditIndex(index);
    const { firstName, lastName, email, phone } = details[index];
    formik.setValues({ firstName, lastName, email, phone });
  };

  const paginatedDetails = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return sortData.slice(startIndex, endIndex);
  };
  const sortData = details.sort((a, b) => a.name.localeCompare(b.name));
  const totalDetailPages = Math.ceil(details.length / PAGE_SIZE);

  const paginatedSearchResult = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return searchResult.slice(startIndex, endIndex);
  };

  const totalSearchPages = Math.ceil(searchResult.length / PAGE_SIZE);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = (totalPages, currentPage) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={i === currentPage ? "primary" : "secondary"}
          className="me-2"
          onClick={() => changePage(i)}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="container mt-5">
      {details.length > 0 && (
        <nav className="navbar navbar-light bg-light search-box">
          <div className="d-flex">
            <input
              className="form-control me-2"
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
        </nav>
      )}

      <form onSubmit={formik.handleSubmit} className="form-box">
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
                  formik.touched.firstName && formik.errors.firstName
                    ? "error"
                    : ""
                }`}
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "");
                  formik.handleChange({
                    target: {
                      name: "firstName",
                      value: inputValue,
                    },
                  });
                }}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-danger">{formik.errors.firstName}</div>
              )}
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                placeholder="Last Name(optional)"
                name="lastName"
                className={`form-control ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "error"
                    : ""
                }`}
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/[^A-Za-z\s]/g, "");
                  formik.handleChange({
                    target: {
                      name: "lastName",
                      value: inputValue,
                    },
                  });
                }}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-danger">{formik.errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "error" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              className={`form-control ${
                formik.touched.phone && formik.errors.phone ? "error" : ""
              }`}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              onChange={(e) => {
                const inputValue = e.target.value.replace(/\D/g, "");
                formik.handleChange(e);
                formik.setFieldValue("phone", inputValue.substring(0, 10));
              }}
              maxLength="10"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-danger">{formik.errors.phone}</div>
            )}
          </div>

          <Button variant="primary" className="mb-2" type="submit">
            {editIndex !== null ? "Update" : "Submit"}
          </Button>
        </div>
      </form>

      {searchResult.length > 0 ? (
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
              {paginatedSearchResult().map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {searchResult.length > PAGE_SIZE && (
            <div className="pagination-buttons">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous Page
              </Button>
              {renderPageNumbers(totalSearchPages, currentPage)}
              <Button
                variant="secondary"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalSearchPages}
              >
                Next Page
              </Button>
            </div>
          )}
        </div>
      ) : searchResult.length === 0 && search !== "" ? (
        <Alert variant="info" className="mt-3">
          No records found.
        </Alert>
      ) : (
        details.length > 0 && (
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
                      <Button
                        variant="danger"
                        onClick={() =>
                          deleteItem((currentPage - 1) * PAGE_SIZE + index)
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() =>
                          editData((currentPage - 1) * PAGE_SIZE + index)
                        }
                        className="ms-2"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {details.length > PAGE_SIZE && (
              <div className="pagination-buttons">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous Page
                </Button>
                {renderPageNumbers(totalDetailPages, currentPage)}
                <Button
                  variant="secondary"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalDetailPages}
                >
                  Next Page
                </Button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Details;
