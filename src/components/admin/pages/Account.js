import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import './Account.css';

const Account = () => {
  return (
    <div className="account-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      {/* Thanh tìm kiếm */}
      <Form className="search-form mb-4" inline>
        <Form.Control type="search" placeholder="Search..." className="mr-sm-2" />
      </Form>

      {/* Bảng */}
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Account name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Nguyễn Văn A</td>
            <td>a.nguyen@example.com</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Trần Văn B</td>
            <td>b.tran@example.com</td>
            <td>User</td>
          </tr>
        </tbody>
      </Table>

      {/* Các nút Thêm, Sửa, Xóa */}
      <div className="button-group mt-4">
        <Button variant="primary" className="me-2">Add</Button>
        <Button variant="success" className="me-2">Edit</Button>
        <Button variant="danger"className="me-2">Delete</Button>
        <Button variant="info">Save</Button>
      </div>
    </div>
  );
};

export default Account;