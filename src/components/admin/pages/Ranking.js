import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import './Account.css';

const Ranking = () => {
  return (
    <div className="account-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      {/* Thanh tìm kiếm */}
      <Form className="search-form mb-4" inline>
        <Form.Control type="search" placeholder="Search...." className="mr-sm-2" />
      </Form>

      {/* Bảng */}
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Racers and Team</th>
            <th>Location</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Nigga</td>
            <td>Inferno</td>
            <td>10</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Alabama</td>
            <td>Twin tower</td>
            <td>119</td>
          </tr>
        </tbody>
      </Table>

      {/* Các nút Thêm, Sửa, Xóa, Xuất */}
      <div className="button-group mt-4">
        <Button variant="primary" className="me-2">Add</Button>
        <Button variant="success" className="me-2">Edit</Button>
        <Button variant="danger"className="me-2">Delete</Button>
        <Button variant="info">Save</Button>
      </div>
    </div>
  );
};

export default Ranking;
