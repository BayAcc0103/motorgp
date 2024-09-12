import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import './Account.css';

const RacersAndTeam = () => {
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
            <th>Time</th>
            <th>Location</th>
            <th>Racer and Team</th>
            <th>Image</th> {/* Thêm cột ảnh */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12/1/2024</td>
            <td>Inferno</td>
            <td>Nigga</td>
            <td>
              <img 
                src="https://via.placeholder.com/100" 
                alt="Racer 1" 
                style={{ width: '100px', height: 'auto' }} 
              />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>11/9/2024</td>
            <td>Twin tower</td>
            <td>Alabama</td>
            <td>
              <img 
                src="https://via.placeholder.com/100" 
                alt="Racer 2" 
                style={{ width: '100px', height: 'auto' }} 
              />
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Các nút Thêm, Sửa, Xóa */}
      <div className="button-group mt-4">
        <Button variant="primary" className="me-2">Add</Button>
        <Button variant="success" className="me-2">Edit</Button>
        <Button variant="danger" className="me-2">Delete</Button>
        <Button variant="info">Save</Button>
      </div>
    </div>
  );
};

export default RacersAndTeam;
