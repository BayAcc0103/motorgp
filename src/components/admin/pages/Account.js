import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import './Account.css';

const Accounts = () => {
  const [accounts, setAccounts] = useState([
    { _id: 1, name: 'Account 1', email: 'account1@example.com', role: 'Admin' },
    { _id: 2, name: 'Account 2', email: 'account2@example.com', role: 'User' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false); 
  const [currentAccountId, setCurrentAccountId] = useState(null); 
  const [accountData, setAccountData] = useState({ name: '', email: '', role: '' });
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            setAccounts(data);
        } catch (error) {
            console.error("Error fetching event data:", error);
        }
    };

    fetchUsers();
}, []);

  useEffect(() => {
    if(accounts){
      console.log(accounts)
    }
  },[accounts])

  
  
  // Handle saving changes
  const handleSave = async () => {
    try {
      // Loop through all events and send updates to the backend
      for (const account of accounts) {
        if (account.isNew) {
          // If the event is new, POST it to the backend
          await fetch('/api/calendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(account),
          });
        } else if (account.isDeleted) {
          // If the event is deleted, delete it from the backend
          await fetch(`/api/users/${account._id}`, {
            method: 'DELETE',
          });
        }
        else if (account.isEdited){
          // Otherwise, update the event via PUT using its UUID
          await fetch(`/api/users/${account._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(account),
          });
        }
      }

      // re-fetch the updated list of events from the backend after save
      const response = await fetch('/api/users');
      const updatedUsers = await response.json();
      setAccounts(updatedUsers);

      setChangesSaved(true);
      setHasUnsavedChanges(false); // Reset the unsaved changes flag
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

const handleSelectUser = (_id) => {
  setSelectedUsers((prevSelected) =>
    prevSelected.includes(_id)
      ? prevSelected.filter((userId) => userId !== _id)
      : [...prevSelected, _id]
  );
};

  // Handle showing the modal
  const handleShowAdd = () => {
    setShowModal(true);
    setOnEdit(false); 
    setAccountData({ name: '', email: '', role: '' });
  };

  const handleShowEdit = () => {
    if (currentAccountId) {
      const selectedAccount = accounts.find((account) => account._id === currentAccountId);
      setAccountData({
        name: selectedAccount.name,
        email: selectedAccount.email,
        role: selectedAccount.role,
      });
      setOnEdit(true);
      setShowModal(true); 
    }
  };

  const handleClose = () => setShowModal(false);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
    setHasUnsavedChanges(true);
  };

  // Handle adding or editing an account
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      setAccounts(accounts.map((account) => (account._id === currentAccountId ? { ...account, ...accountData, isEdited: true } : account)));
    } else {
      setAccounts([...accounts, { ...accountData, isNew: true }]);
    }
    handleClose();
    setHasUnsavedChanges(true);
  };

  const handleRowClick = (account) => {
    setCurrentAccountId(account._id); 
  };



  const deleteSelectedUsers = () => {
    setAccounts(accounts.map(account =>
      selectedUsers.includes(account._id) ? { ...account, isDeleted: true } : account
    ));
    setSelectedUsers([]); // Clear the selected events after deletion
    setHasUnsavedChanges(true);
  };

  return (
    <div className="account-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      {/* Alert when changes are saved */}
      {changesSaved && (
        <Alert variant="success" onClose={() => setChangesSaved(false)} dismissible>
          Changes saved successfully!
        </Alert>
      )}

      {/* Search bar */}
      <Form className="search-form mb-4" inline>
        <Form.Control type="search" placeholder="Search..." className="mr-sm-2" />
      </Form>

      {/* Table */}
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Account Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr 
              key={account._id} 
              onClick={() => handleRowClick(account)} 
              style={{ cursor: 'pointer', backgroundColor: account._id === currentAccountId ? '#f0f8ff' : '' }} 
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(account._id)}
                  onChange={() => handleSelectUser(account._id)}
                />
              </td>
              <td>{account._id}</td>
              <td>{account.name}</td>
              <td>{account.email}</td>
              <td>{account.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Buttons */}
      <div className="button-group mt-4 d-flex justify-content-center">
        <Button variant="primary" onClick={handleShowAdd}>Add</Button>
        <Button 
          variant="success" 
          className="mx-2" 
          disabled={!currentAccountId} 
          onClick={handleShowEdit}>
          Edit
        </Button>
        <Button 
          variant="danger" 
          disabled={!currentAccountId} 
          onClick={deleteSelectedUsers}>
          Delete
        </Button>
        <Button 
          variant="info" 
          className="mx-2" 
          onClick={handleSave} 
          disabled={!hasUnsavedChanges}>
          Save
        </Button>
      </div>

      {/* Add/Edit Account Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Account' : 'Add New Account'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Account Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={accountData.name} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={accountData.email} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              {/* <Form.Control 
                type="text" 
                name="role" 
                value={accountData.role} 
                onChange={handleInputChange} 
                required 
              /> */}
              <Form.Control
                as="select"
                name="role"
                value={accountData.role}
                onChange={handleInputChange}
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>/
                <option value="user">User</option>/
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              {onEdit ? 'Save Changes' : 'Add Account'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Accounts;
