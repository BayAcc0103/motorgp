import React, { useState } from 'react';
import { Button, Table, Form, Modal, Alert, Dropdown } from 'react-bootstrap';
import './Account.css';

const ScheduleAdmin = () => {
  const [schedules, setSchedules] = useState([
    { race: 'Race 1', date: '2024-10-01', timeStart: '10:00', timeEnd: '11:00', category: 'MotoGP', event: 'Event 1' },
    { race: 'Race 2', date: '2024-10-02', timeStart: '12:00', timeEnd: '13:00', category: 'Moto2', event: 'Event 2' },
  ]);

  const [races] = useState(['Race 1', 'Race 2', 'Race 3']); // Available races
  const [categories] = useState(['MotoGP', 'Moto2', 'Moto3']); // Available categories

  const [currentRace, setCurrentRace] = useState(null); // Selected race
  const [currentCategory, setCurrentCategory] = useState(null); // Selected category

  const [showModal, setShowModal] = useState(false); // Show/Hide modal
  const [onEdit, setOnEdit] = useState(false); // Track edit mode
  const [scheduleData, setScheduleData] = useState({ date: '', timeStart: '', timeEnd: '', category: 'MotoGP', event: '' });
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected row index
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // New state for error messages

  // Show modal for adding a new schedule
  const handleShowAdd = () => {
    setOnEdit(false);
    setScheduleData({ date: '', timeStart: '', timeEnd: '', category: 'MotoGP', event: '' });
    setShowModal(true);
    setErrorMessage('');
  };

  // Handle close modal
  const handleClose = () => {
    setShowModal(false);
    setErrorMessage('');
  };

  // Handle input change in modal form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({ ...scheduleData, [name]: value });
    setHasUnsavedChanges(true);
  };

  // Function to check for duplicate schedules
  const isDuplicateSchedule = (newSchedule) => {
    return schedules.some(schedule =>
      schedule.race === newSchedule.race &&
      schedule.category === newSchedule.category &&
      schedule.date === newSchedule.date &&
      schedule.timeStart === newSchedule.timeStart &&
      schedule.timeEnd === newSchedule.timeEnd
    );
  };

  // Handle form submit to add or edit schedule
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newSchedule = {
      race: currentRace,
      category: scheduleData.category,
      date: scheduleData.date,
      timeStart: scheduleData.timeStart,
      timeEnd: scheduleData.timeEnd,
      event: scheduleData.event,
    };

    if (isDuplicateSchedule(newSchedule)) {
      setErrorMessage('This schedule already exists.');
      return;
    }

    if (onEdit) {
      setSchedules(schedules.map((schedule, index) => 
        index === selectedIndex ? newSchedule : schedule
      ));
    } else {
      setSchedules([...schedules, newSchedule]); // Add new schedule
    }
    handleClose();
    setHasUnsavedChanges(true);
  };

  // Handle selecting a race
  const handleSelectRace = (race) => {
    setCurrentRace(race);
    setCurrentCategory(null); // Reset category when race changes
    setErrorMessage('');
  };

  // Handle selecting a category
  const handleSelectCategory = (category) => {
    setCurrentCategory(category);
    handleShowAdd(); // Show the modal after selecting category
  };

  // Handle save changes button
  const handleSave = () => {
    setChangesSaved(true);
    setHasUnsavedChanges(false);
  };

  // Handle delete schedule
  const deleteSchedule = () => {
    const updatedSchedules = schedules.filter((_, index) => index !== selectedIndex);
    setSchedules(updatedSchedules);
    setSelectedIndex(null); // Reset selected index after deletion
    setHasUnsavedChanges(true);
  };

  // Handle edit schedule
  const handleEdit = () => {
    if (selectedIndex !== null) {
      const schedule = schedules[selectedIndex];
      setOnEdit(true);
      setCurrentRace(schedule.race);
      setScheduleData({
        date: schedule.date,
        timeStart: schedule.timeStart,
        timeEnd: schedule.timeEnd,
        category: schedule.category,
        event: schedule.event,
      });
      setCurrentCategory(schedule.category);
      setShowModal(true);
      setErrorMessage('');
    }
  };

  // Handle row selection
  const handleRowSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="schedule-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      {/* Alert when changes are saved */}
      {changesSaved && (
        <Alert variant="success" onClose={() => setChangesSaved(false)} dismissible>
          Changes saved successfully!
        </Alert>
      )}

      {/* Alert for duplicate schedule */}
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
          {errorMessage}
        </Alert>
      )}

      {/* Race Selection Dropdown */}
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {currentRace || 'Select a Race'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {races.map((race, index) => (
            <Dropdown.Item key={index} onClick={() => handleSelectRace(race)}>
              {race}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Category Selection Dropdown */}
      {currentRace && (
        <Dropdown className="mb-4">
          <Dropdown.Toggle variant="info" id="dropdown-category">
            {currentCategory || 'Select a Category'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {categories.map((category, index) => (
              <Dropdown.Item key={index} onClick={() => handleSelectCategory(category)}>
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}

      {/* Table to display schedules */}
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Race</th>
            <th>Date</th>
            <th>Time Start</th>
            <th>Time End</th>
            <th>Category</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr 
              key={index} 
              onClick={() => handleRowSelect(index)} 
              className={selectedIndex === index ? 'table-active' : ''}
            >
              <td>{index + 1}</td>
              <td>{schedule.race}</td>
              <td>{schedule.date}</td>
              <td>{schedule.timeStart}</td>
              <td>{schedule.timeEnd}</td>
              <td>{schedule.category}</td>
              <td>{schedule.event}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for adding/editing schedule */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Schedule' : 'Add New Schedule'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {/* Date */}
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

            {/* Time Start */}
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

            {/* Time End */}
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

            {/* Event */}
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
              {onEdit ? 'Update Schedule' : 'Add Schedule'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Action Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <Button variant="info" onClick={handleEdit} disabled={selectedIndex === null} className="me-2">
          Edit
        </Button>
        <Button variant="danger" onClick={deleteSchedule} disabled={selectedIndex === null} className="me-2">
          Delete
        </Button>
        <Button variant="success" onClick={handleSave} disabled={!hasUnsavedChanges}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ScheduleAdmin;
