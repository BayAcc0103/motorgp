import React, { useState } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import './Account.css';

const RacersAndTeam = () => {
  const [racers, setRacers] = useState([
    { id: 1, time: '12/1/2024', location: 'Inferno', name: 'Racer 1', image: 'https://via.placeholder.com/100' },
    { id: 2, time: '11/9/2024', location: 'Twin Tower', name: 'Racer 2', image: 'https://via.placeholder.com/100' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false); 
  const [currentRacerId, setCurrentRacerId] = useState(null); 
  const [racerData, setRacerData] = useState({ time: '', location: '', name: '', image: '' });
  const [changesSaved, setChangesSaved] = useState(false); // New state for tracking save
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); // Track unsaved changes

  // Handle showing the modal
  const handleShowAdd = () => {
    setShowModal(true);
    setOnEdit(false); 
    setRacerData({ time: '', location: '', name: '', image: '' });
  };

  const handleShowEdit = () => {
    if (currentRacerId) {
      const selectedRacer = racers.find((racer) => racer.id === currentRacerId);
      setRacerData({
        time: selectedRacer.time,
        location: selectedRacer.location,
        name: selectedRacer.name,
        image: selectedRacer.image,
      });
      setOnEdit(true);
      setShowModal(true); 
    }
  };

  const handleClose = () => setShowModal(false);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRacerData({ ...racerData, [name]: value });
    setHasUnsavedChanges(true); // Mark unsaved changes
  };

  // Handle adding or editing a racer
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      setRacers(racers.map((racer) => (racer.id === currentRacerId ? { ...racer, ...racerData } : racer)));
    } else {
      setRacers([...racers, { ...racerData, id: racers.length + 1 }]);
    }
    handleClose();
    setHasUnsavedChanges(true); // Mark unsaved changes
  };

  const handleRowClick = (racer) => {
    setCurrentRacerId(racer.id); 
  };

  const deleteRacer = () => {
    if (currentRacerId) {
      setRacers(racers.filter((racer) => racer.id !== currentRacerId));
      setCurrentRacerId(null);
      setHasUnsavedChanges(true); // Mark unsaved changes
    }
  };

  // Handle saving changes
  const handleSave = () => {
    setChangesSaved(true); // Simulate save
    setHasUnsavedChanges(false); // Reset unsaved changes
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
            <th>Time</th>
            <th>Location</th>
            <th>Racer and Team</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {racers.map((racer) => (
            <tr 
              key={racer.id} 
              onClick={() => handleRowClick(racer)} 
              style={{ cursor: 'pointer', backgroundColor: racer.id === currentRacerId ? '#f0f8ff' : '' }} 
            >
              <td>{racer.id}</td>
              <td>{racer.time}</td>
              <td>{racer.location}</td>
              <td>{racer.name}</td>
              <td>
                <img 
                  src={racer.image} 
                  alt={racer.name} 
                  style={{ width: '100px', height: 'auto' }} 
                />
              </td>
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
          disabled={!currentRacerId} 
          onClick={handleShowEdit}>
          Edit
        </Button>
        <Button 
          variant="danger" 
          disabled={!currentRacerId} 
          onClick={deleteRacer}>
          Delete
        </Button>
        <Button 
          variant="info" 
          className="mx-2" 
          onClick={handleSave} 
          disabled={!hasUnsavedChanges}> {/* Save button is disabled unless there are unsaved changes */}
          Save
        </Button>
      </div>

      {/* Add/Edit Racer Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Racer' : 'Add New Racer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formTime" className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control 
                type="text" 
                name="time" 
                value={racerData.time} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formLocation" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                name="location" 
                value={racerData.location} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Racer and Team</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={racerData.name} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                name="image" 
                value={racerData.image} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {onEdit ? 'Save Changes' : 'Add Racer'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RacersAndTeam;
