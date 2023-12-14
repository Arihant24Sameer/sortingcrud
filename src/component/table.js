import React from "react";
import { Table, Button } from "react-bootstrap";

const CustomTable = ({ data, deleteItem, editData, onClick }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th  style={{ cursor: "pointer" }} onClick={() => onClick(data)}>
            
            First Name
          </th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>
              <Button variant="danger" onClick={() => deleteItem(index)}>
                Delete
              </Button>
              <Button variant="info" onClick={() => editData(index)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomTable;
