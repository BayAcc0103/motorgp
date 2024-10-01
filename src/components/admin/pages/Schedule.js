import React, { useState } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import './Account.css';

const Schedule = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, date: '2024-10-01', timeStart: '10:00', timeEnd: '11:00', category: 'MotoGP', event: 'Event 1' },
    { id: 2, date: '2024-10-02', timeStart: '12:00', timeEnd: '13:00', category: 'Moto2', event: 'Event 2' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false); 
  const [currentScheduleId, setCurrentScheduleId] = useState(null); 
  const [scheduleData, setScheduleData] = useState({ date: '', timeStart: '', timeEnd: '', category: 'MotoGP', event: '' });
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const categories = ['MotoGP', 'Moto2', 'Moto3'];

  // Handle showing the modal
  const handleShowAdd = () => {
    setShowModal(true);
    setOnEdit(false); 
    setScheduleData({ date: '', timeStart: '', timeEnd: '', category: 'MotoGP', event: '' });
  };

  const handleShowEdit = () => {
    if (currentScheduleId) {
      const selectedSchedule = schedules.find((schedule) => schedule.id === currentScheduleId);
      setScheduleData({
        date: selectedSchedule.date,
        timeStart: selectedSchedule.timeStart,
        timeEnd: selectedSchedule.timeEnd,
        category: selectedSchedule.category,
        event: selectedSchedule.event,
      });
      setOnEdit(true);
      setShowModal(true); 
    }
  };

  const handleClose = () => setShowModal(false);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
    setHasUnsavedChanges(true);
  };

  // Handle adding or editing a schedule
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      setSchedules(schedules.map((schedule) => (schedule.id === currentScheduleId ? { ...schedule, ...scheduleData } : schedule)));
    } else {
      setSchedules([...schedules, { ...scheduleData, id: schedules.length + 1 }]);
    }
    handleClose();
    setHasUnsavedChanges(true);
  };

  const handleRowClick = (schedule) => {
    setCurrentScheduleId(schedule.id); 
  };

  const deleteSchedule = () => {
    if (currentScheduleId) {
      setSchedules(schedules.filter((schedule) => schedule.id !== currentScheduleId));
      setCurrentScheduleId(null);
      setHasUnsavedChanges(true);
    }
  };

  // Handle saving changes
  const handleSave = () => {
    setChangesSaved(true);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="schedule-container d-flex flex-column justify-content-center align-items-center min-vh-100">
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
            <th>Date</th>
            <th>Time Start</th>
            <th>Time End</th>
            <th>Category</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr 
              key={schedule.id} 
              onClick={() => handleRowClick(schedule)} 
              style={{ cursor: 'pointer', backgroundColor: schedule.id === currentScheduleId ? '#f0f8ff' : '' }} 
            >
              <td>{schedule.id}</td>
              <td>{schedule.date}</td>
              <td>{schedule.timeStart}</td>
              <td>{schedule.timeEnd}</td>
              <td>{schedule.category}</td>
              <td>{schedule.event}</td>
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
          disabled={!currentScheduleId} 
          onClick={handleShowEdit}>
          Edit
        </Button>
        <Button 
          variant="danger" 
          disabled={!currentScheduleId} 
          onClick={deleteSchedule}>
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

      {/* Add/Edit Schedule Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Schedule' : 'Add New Schedule'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="date" 
                name="date" 
                value={scheduleData.date} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formTimeStart" className="mb-3">
              <Form.Label>Time Start</Form.Label>
              <Form.Control 
                type="time" 
                name="timeStart" 
                value={scheduleData.timeStart} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formTimeEnd" className="mb-3">
              <Form.Label>Time End</Form.Label>
              <Form.Control 
                type="time" 
                name="timeEnd" 
                value={scheduleData.timeEnd} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control 
                as="select" 
                name="category" 
                value={scheduleData.category} 
                onChange={handleInputChange} 
                required
              >
                {categories.map((category, idx) => (
                  <option key={idx} value={category}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formEvent" className="mb-3">
              <Form.Label>Event</Form.Label>
              <Form.Control 
                type="text" 
                name="event" 
                value={scheduleData.event} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {onEdit ? 'Save Changes' : 'Add Schedule'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Schedule;
