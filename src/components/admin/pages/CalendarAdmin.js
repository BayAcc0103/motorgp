import React, { useState } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import './Account.css';

const CalendarAdmin = () => {
  const [events, setEvents] = useState([
    { id: 1, time: '12/1/2024', location: 'Inferno', racers: 'Racer 1' },
    { id: 2, time: '11/9/2024', location: 'Twin Tower', racers: 'Racer 2' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false); 
  const [currentEventId, setCurrentEventId] = useState(null); 
  const [eventData, setEventData] = useState({ sponcorname:'', datestart:'', dateend:'', name: '', season_id: '', circuitname: '', countryname:'' });
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Handle showing the modal
  const handleShowAdd = () => {
    setShowModal(true);
    setOnEdit(false); 
    setEventData({ sponcorname:'', datestart:'', dateend:'', name: '', season_id: '', circuitname: '', countryname:'' });
  };

  const handleShowEdit = () => {
    if (currentEventId) {
      const selectedEvent = events.find((event) => event.id === currentEventId);
      setEventData({
        time: selectedEvent.time,
        location: selectedEvent.location,
        racers: selectedEvent.racers,
      });
      setOnEdit(true);
      setShowModal(true); 
    }
  };

  const handleClose = () => setShowModal(false);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
    setHasUnsavedChanges(true);
  };

  // Handle adding or editing an event
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      setEvents(events.map((event) => (event.id === currentEventId ? { ...event, ...eventData } : event)));
    } else {
      setEvents([...events, { ...eventData, id: events.length + 1 }]);
    }
    handleClose();
    setHasUnsavedChanges(true);
  };

  const handleRowClick = (event) => {
    setCurrentEventId(event.id); 
  };

  const deleteEvent = () => {
    if (currentEventId) {
      setEvents(events.filter((event) => event.id !== currentEventId));
      setCurrentEventId(null);
      setHasUnsavedChanges(true);
    }
  };

  // Handle saving changes
  const handleSave = () => {
    setChangesSaved(true);
    setHasUnsavedChanges(false);
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
            <th>sponcorname</th>
            <th>date_start</th>
            <th>date_end</th>
            <th>name</th>
            <th>season_id</th>
            <th>circuitname</th>
            <th>countryname</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr 
              key={event.id} 
              onClick={() => handleRowClick(event)} 
              style={{ cursor: 'pointer', backgroundColor: event.id === currentEventId ? '#f0f8ff' : '' }} 
            >
              <td>{event.id}</td>
              <td>{event.sponcorname}</td>
              <td>{event.datestart}</td>
              <td>{event.dateend}</td>
              <td>{event.name}</td>
              <td>{event.season_id}</td>
              <td>{event.circuitname}</td>
              <td>{event.countryname}</td>
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
          disabled={!currentEventId} 
          onClick={handleShowEdit}>
          Edit
        </Button>
        <Button 
          variant="danger" 
          disabled={!currentEventId} 
          onClick={deleteEvent}>
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

      {/* Add/Edit Event Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Event' : 'Add New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formSponcorname" className="mb-3">
              <Form.Label>Sponcor-Name</Form.Label>
              <Form.Control 
                type="text" 
                name="Sponcor-Name" 
                value={eventData.sponcorname} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formLocation" className="mb-3">
              <Form.Label>date_start</Form.Label>
              <Form.Control 
                type="text" 
                name="location" 
                value={eventData.datestart} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formRacers" className="mb-3">
              <Form.Label>DateEnd</Form.Label>
              <Form.Control 
                type="text" 
                name="racers" 
                value={eventData.dateend} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="formRacers" className="mb-3">
              <Form.Label>name</Form.Label>
              <Form.Control 
                type="text" 
                name="racers" 
                value={eventData.name} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="formRacers" className="mb-3">
              <Form.Label>season_id</Form.Label>
              <Form.Control 
                type="text" 
                name="racers" 
                value={eventData.season_id} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="formRacers" className="mb-3">
              <Form.Label>circuitname</Form.Label>
              <Form.Control 
                type="text" 
                name="racers" 
                value={eventData.circuitname} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="formRacers" className="mb-3">
              <Form.Label>countryname</Form.Label>
              <Form.Control 
                type="text" 
                name="racers" 
                value={eventData.countryname} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {onEdit ? 'Save Changes' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CalendarAdmin;
