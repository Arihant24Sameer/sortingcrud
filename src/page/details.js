import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Table } from "react-bootstrap";
import Modal from "../component/search";

const PAGE_SIZE = 5;

const Details = () => {
  const [details, setDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  const [show, setShow] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone should contain only numbers")
      .min(10, "Phone should be at least 10 digits")
      .max(10, "Phone should not exceed 10 digits")
      .required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (editIndex !== null) {
        const updatedDetails = [...details];
        updatedDetails[editIndex] = { ...values };
        setDetails(updatedDetails);
        setEditIndex(null);
      } else {
        setDetails([...details, { ...values }]);
      }

      formik.resetForm();
    },
  });

  const deleteItem = (index) => {
    const updatedDetails = [...details];
    updatedDetails.splice(index, 1);
    setDetails(updatedDetails);
  };

  const handleSearch = () => {
    const foundItem = sortedData.find((item) => item.name === search);
    setSearchResult(foundItem ? [foundItem] : []);
    setShow(true);
  };

  const editData = (index) => {
    setEditIndex(index);
    formik.setValues(details[index]);
  };

  const totalPages = Math.ceil(details.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  let sortedData = details.sort((a, b) => a.name.localeCompare(b.name));

  const paginatedDetails = sortedData.slice(startIndex, endIndex);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-light bg-light">
        <div className="form-inline">
          <input
            className=""
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button type="button" onClick={handleSearch}>
            Search
          </Button>

          <Modal show={show} onClose={() => setShow(false)}>
            <h2>Search Result:</h2>
            <ul className="list-group">
              {searchResult.map((item, index) => (
                <li key={index} className="list-group-item">
                  {item.name}, {item.email}, {item.phone}
                </li>
              ))}
            </ul>
          </Modal>
        </div>
      </nav>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          )}
        </div>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-2">
          <input
            type="number"
            placeholder="Phone"
            name="phone"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div style={{ color: "red" }}>{formik.errors.phone}</div>
          )}
        </div>

        <Button className="btn btn-primary mb-2" type="submit">
          {editIndex !== null ? "Update" : "Submit"}
        </Button>
      </form>

      <div>
        {details.length > 0 && (
          <div>
            <h2>Submitted Details:</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteItem(startIndex + index)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => editData(startIndex + index)}
                        className="ml-2"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="mt-3">
              <Button
                className="btn btn-secondary mr-2"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous Page
              </Button>
              <Button
                className="btn btn-secondary"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next Page
              </Button>
            </div>
          </div>
        )}
      </div>

      <Modal show={show} onClose={() => setShow(false)}>
        <h2>Search Result:</h2>
        <ul className="list-group">
          {searchResult.map((item, index) => (
            <li key={index} className="list-group-item">
              {item.name}, {item.email}, {item.phone}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Details;
