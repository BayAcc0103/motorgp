import React, { useState } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import './Account.css';

const RiderAdmin= () => {
  const [riders, setRiders] = useState([
    // Example data
    // { id: '1', name: 'Rider 1', teamId: 'Team A', constructor_name: 'Constructor 1', rider_country_iso: 'USA', year: 2024, totalPoints: 10, position: 1, team_color: '#FF0000', text_color: '#FFFFFF', imageUrl: 'https://via.placeholder.com/100' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false); 
  const [currentRiderId, setCurrentRiderId] = useState(null); 
  const [riderData, setRiderData] = useState({ 
    name: '', 
    teamId: '', 
    constructor_name: '', 
    rider_country_iso: '', 
    year: '', 
    totalPoints: 0, 
    position: 0, 
    team_color: '', 
    text_color: '', 
    imageUrl: '' });
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleShowAdd = () => {
    setShowModal(true);
    setOnEdit(false);
    setRiderData({ name: '', teamId: '', constructor_name: '', rider_country_iso: '', year: '', totalPoints: 0, position: 0, team_color: '', text_color: '', imageUrl: '' });
  };

  const handleShowEdit = () => {
    if (currentRiderId) {
      const selectedRider = riders.find((rider) => rider.id === currentRiderId);
      setRiderData(selectedRider);
      setOnEdit(true);
      setShowModal(true); 
    }
  };

  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRiderData({ ...riderData, [name]: value });
    setHasUnsavedChanges(true);
  };

  /**
   * Handles the submission of the form for adding or editing a rider.
   * If onEdit is true, updates the rider with the corresponding id in the riders array with the values from riderData.
   * If onEdit is false, adds a new rider with the values from riderData to the end of the riders array.
   * Resets the form and sets hasUnsavedChanges to true.
   * @param {Event} e - The form submission event.
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      setRiders(riders.map((rider) => (rider.id === currentRiderId ? { ...rider, ...riderData } : rider)));
    } else {
      setRiders([...riders, { ...riderData, id: (riders.length + 1).toString() }]);
    }
    handleClose();
    setHasUnsavedChanges(true);
  };

  const handleRowClick = (rider) => {
    setCurrentRiderId(rider.id); 
  };

  const deleteRider = () => {
    if (currentRiderId) {
      setRiders(riders.filter((rider) => rider.id !== currentRiderId));
      setCurrentRiderId(null);
      setHasUnsavedChanges(true);
    }
  };

  const handleSave = () => {
    setChangesSaved(true);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="account-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      {changesSaved && (
        <Alert variant="success" onClose={() => setChangesSaved(false)} dismissible>
          Changes saved successfully!
        </Alert>
      )}

      <Form className="search-form mb-4" inline>
        <Form.Control type="search" placeholder="Search..." className="mr-sm-2" />
      </Form>

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Team ID</th>
            <th>Constructor Name</th>
            <th>Country</th>
            <th>Year</th>
            <th>Total Points</th>
            <th>Position</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <tr 
              key={rider.id} 
              onClick={() => handleRowClick(rider)} 
              style={{ cursor: 'pointer', backgroundColor: rider.id === currentRiderId ? '#f0f8ff' : '' }} 
            >
              <td>{rider.id}</td>
              <td>{rider.name}</td>
              <td>{rider.teamId}</td>
              <td>{rider.constructor_name}</td>
              <td>{rider.rider_country_iso}</td>
              <td>{rider.year}</td>
              <td>{rider.totalPoints}</td>
              <td>{rider.position}</td>
              <td>
                <img 
                  src={rider.imageUrl} 
                  alt={rider.name} 
                  style={{ width: '100px', height: 'auto' }} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="button-group mt-4 d-flex justify-content-center">
        <Button variant="primary" onClick={handleShowAdd}>Add</Button>
        <Button 
          variant="success" 
          className="mx-2" 
          disabled={!currentRiderId} 
          onClick={handleShowEdit}>
          Edit
        </Button>
        <Button 
          variant="danger" 
          disabled={!currentRiderId} 
          onClick={deleteRider}>
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Rider' : 'Add New Rider'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={riderData.name} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formTeamId" className="mb-3">
              <Form.Label>Team ID</Form.Label>
              <Form.Control 
                type="text" 
                name="teamId" 
                value={riderData.teamId} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formConstructorName" className="mb-3">
              <Form.Label>Constructor Name</Form.Label>
              <Form.Control 
                type="text" 
                name="constructor_name" 
                value={riderData.constructor_name} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formCountry" className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control 
                type="text" 
                name="rider_country_iso" 
                value={riderData.rider_country_iso} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formYear" className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control 
                type="number" 
                name="year" 
                value={riderData.year} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formTotalPoints" className="mb-3">
              <Form.Label>Total Points</Form.Label>
              <Form.Control 
                type="number" 
                name="totalPoints" 
                value={riderData.totalPoints} 
                onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId="formPosition" className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control 
                type="number" 
                name="position" 
                value={riderData.position} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formTeamColor" className="mb-3">
              <Form.Label>Team Color</Form.Label>
              <Form.Control 
                type="text" 
                name="team_color" 
                value={riderData.team_color} 
                onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId="formTextColor" className="mb-3">
              <Form.Label>Text Color</Form.Label>
              <Form.Control 
                type="text" 
                name="text_color" 
                value={riderData.text_color} 
                onChange={handleInputChange} 
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                name="imageUrl" 
                value={riderData.imageUrl} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {onEdit ? 'Save Changes' : 'Add Rider'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RiderAdmin;
