// RacersAdmin.js
import React, { useState } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import './Account.css';

const RacersAdmin = () => {
  const [racers, setRacers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [currentRacerId, setCurrentRacerId] = useState(null);
  const [racerData, setRacerData] = useState({ time: '', location: '', name: '', image: '' });
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRacerData({ ...racerData, [name]: value });
    setHasUnsavedChanges(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      setRacers(racers.map((racer) => (racer.id === currentRacerId ? { ...racer, ...racerData } : racer)));
    } else {
      setRacers([...racers, { ...racerData, id: racers.length + 1 }]);
    }
    handleClose();
    setHasUnsavedChanges(true);
  };

  const handleRowClick = (racer) => {
    setCurrentRacerId(racer.id);
  };

  const deleteRacer = () => {
    if (currentRacerId) {
      setRacers(racers.filter((racer) => racer.id !== currentRacerId));
      setCurrentRacerId(null);
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

      <h2>Racers</h2>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Location</th>
            <th>Racer</th>
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
                <img src={racer.image} alt={racer.name} style={{ width: '100px', height: 'auto' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="button-group mt-4 d-flex justify-content-center">
        <Button variant="primary" onClick={handleShowAdd}>Add Racer</Button>
        <Button variant="success" className="mx-2" disabled={!currentRacerId} onClick={handleShowEdit}>Edit</Button>
        <Button variant="danger" disabled={!currentRacerId} onClick={deleteRacer}>Delete</Button>
        <Button variant="info" className="mx-2" onClick={handleSave} disabled={!hasUnsavedChanges}>Save</Button>
      </div>

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
              <Form.Label>Racer Name</Form.Label>
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

export default RacersAdmin;
