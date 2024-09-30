
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import { Button, Modal, Dropdown, Table, Alert, Form } from 'react-bootstrap'; // Importing components from react-bootstrap

const ResultAdmin = () => {
  // State variables for events and categories
  const [events] = useState(['Event A', 'Event B', 'Event C']);
  const [categories] = useState(['MotoGP', 'Moto2', 'Moto3']);

  // State for current selections and modal visibility
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showRiderModal, setShowRiderModal] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  // State for session data and sessions list
  const [sessionData, setSessionData] = useState({
    event: '',
    category: '',
    session: ''
  });
  const [sessions, setSessions] = useState([]);

  // State for rider data and selected riders
  const [riders, setRiders] = useState([]);
  const [riderData, setRiderData] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [riderFormData, setRiderFormData] = useState({
    riderID: '',
    position: '',
    time: '',
    number: '',
    fullName: '',
    flag: '',
    team: ''
  });

  // State for editing flags and selected riders
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingRider, setIsEditingRider] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const [selectedRiders, setSelectedRiders] = useState([]);

  // Function to show category modal
  const handleShowCategoryModal = (event) => {
    setCurrentEvent(event);
    setShowCategoryModal(true);
  };

  // Function to close category modal
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  // Function to handle category selection
  const handleSelectCategory = (category) => {
    setCurrentCategory(category);
    setSessionData({ event: currentEvent, category });
    setShowCategoryModal(false);
    setShowSessionModal(true); // Show session modal after selecting category
  };

  // Function to handle session input change
  const handleSessionInputChange = (e) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  // Function to handle session submission
  const handleSessionSubmit = () => {
    if (!isEditing) {
      const isSessionExist = sessions.some(
        (session) =>
          session.event === sessionData.event &&
          session.category === sessionData.category &&
          session.session === sessionData.session
      );

      if (!isSessionExist) {
        setSessions([...sessions, { ...sessionData, id: sessions.length + 1 }]);
      }
    } else {
      const updatedSessions = sessions.map((session) =>
        session.id === selectedSession.id ? { ...sessionData, id: selectedSession.id } : session
      );
      setSessions(updatedSessions);
      setIsEditing(false);
      setSelectedSession(null);
    }

    setShowSessionModal(false);
  };

  // Function to handle editing of a session
  const handleEditSession = () => {
    if (selectedSession) {
      setIsEditing(true);
      setSessionData(selectedSession);
      setShowSessionModal(true);
    }
  };

  // Function to delete a selected session
  const handleDeleteSession = () => {
    if (selectedSession) {
      const updatedSessions = sessions.filter((session) => session.id !== selectedSession.id);
      setSessions(updatedSessions);
      setSelectedSession(null);
    }
  };

  // Function to clear selection of session
  const handleClearSelection = () => {
    setSelectedSession(null);
    setIsEditing(false);
  };

  // Function to handle save action
  const handleSave = () => {
    setShowSaveAlert(true);
    setTimeout(() => {
      setShowSaveAlert(false);
    }, 3000);
  };

  // Function to handle rider input change
  const handleRiderInputChange = (e) => {
    const { name, value } = e.target;
    setRiderFormData({ ...riderFormData, [name]: value });
  };

  // Function to add or update rider information
  const handleAddRider = () => {
    if (isEditingRider) {
      // Update existing rider
      const updatedRiderData = riderData.map((rider) =>
        rider.id === selectedRider.id ? { ...riderFormData, id: selectedRider.id } : rider
      );
      setRiderData(updatedRiderData);
      setIsEditingRider(false);
      setSelectedRider(null);
    } else {
      // Add new rider
      setRiderData([...riderData, { ...riderFormData, id: riderData.length + 1, sessionId: selectedSession.id }]);
    }
    setShowRiderModal(false);
    setRiderFormData({
      riderID: '',
      position: '',
      time: '',
      number: '',
      fullName: '',
      flag: '',
      team: ''
    });
  };

  // Function to handle editing of rider
  const handleEditRider = () => {
    if (selectedRider) {
      setIsEditingRider(true);
      setRiderFormData(selectedRider);
      setShowRiderModal(true);
    }
  };

  // Function to handle selection of riders
  const handleSelectRider = (id) => {
    setSelectedRiders((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((eventId) => eventId !== id)
        : [...prevSelected, id]
    );
  };

  // Function to delete selected riders
  const deleteSelectedRiders = () => {
    setRiders(riders.map(rider =>
      selectedRiders.includes(rider.id) ? { ...rider, isDeleted: true } : rider
    ));
    setSelectedRiders([]); // Clear the selected riders after deletion
  };

  // Rendering the component
  return (
    <div className="account-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      {/* Save Alert */}
      {showSaveAlert && (
        <Alert variant="success" className="w-100 text-center">
          Save successful!
        </Alert>
      )}

      {/* Dropdown for Events */}
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          {currentEvent && currentCategory ? `${currentEvent} - ${currentCategory}` : 'Select an Event and Category'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {events.map((event, index) => (
            <Dropdown.Item key={index} onClick={() => handleShowCategoryModal(event)}>
              {event}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Category Modal */}
      <Modal show={showCategoryModal} onHide={handleCloseCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="outline-primary"
              className="m-1"
              onClick={() => handleSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </Modal.Body>
      </Modal>

      {/* Session Modal */}
      <Modal show={showSessionModal} onHide={() => setShowSessionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Session' : 'Enter Session'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter Session"
            name="session"
            value={sessionData.session}
            onChange={handleSessionInputChange}
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSessionSubmit}>
            {isEditing ? 'Save Changes' : 'Save Session'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Rider Modal */}
      <Modal show={showRiderModal} onHide={() => setShowRiderModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditingRider ? 'Edit Rider Information' : 'Add Rider Information'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>RiderID</Form.Label>
              <Form.Control
                type="text"
                name="riderID"
                value={riderFormData.riderID}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={riderFormData.position}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                name="time"
                value={riderFormData.time}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={riderFormData.number}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={riderFormData.fullName}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Flag</Form.Label>
              <Form.Control
                type="text"
                name="flag"
                value={riderFormData.flag}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                name="team"
                value={riderFormData.team}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddRider}>
            {isEditingRider ? 'Save Changes' : 'Add Rider'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sessions Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>Category</th>
            <th>Session</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr
              key={session.id}
              onClick={() => setSelectedSession(session)}
              style={{cursor: "pointer", backgroundColor: session === selectedSession ? '#f0f8ff' : '' }}
            >
              <td>{session.id}</td>
              <td>{session.event}</td>
              <td>{session.category}</td>
              <td>{session.session}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Rider Data Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>RiderID</th>
            <th>Position</th>
            <th>Time</th>
            <th>Number</th>
            <th>Full Name</th>
            <th>Flag</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {riderData
            .filter((rider) => rider.sessionId === selectedSession?.id)
            .map((rider) => (
              <tr
                key={rider.id}
                onClick={() => {
                  setSelectedRider(rider);
                  setIsEditingRider(true);
                }}
                style ={{cursor: "pointer" , backgroundColor: rider === selectedRider ? '#f0f8ff' : '' }}
              >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRiders.includes(rider.id)}
                  onChange={() => handleSelectRider(rider.id)}
                />
              </td>
                <td>{rider.id}</td>
                <td>{rider.riderID}</td>
                <td>{rider.position}</td>
                <td>{rider.time}</td>
                <td>{rider.number}</td>
                <td>{rider.fullName}</td>
                <td>{rider.flag}</td>
                <td>{rider.team}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Action Buttons */}
      <div className="mt-3">
        <Button
          variant="primary"
          className="m-2"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="secondary"
          className="m-2"
          onClick={() => {
            setShowRiderModal(true);
            setIsEditingRider(false);
          }}
          disabled={!selectedSession}
        >
          Add
        </Button>
      </div>

      {/* Other Action Buttons */}
      <div className="mt-3">
        <Button
          variant="warning"
          className="m-2"
          onClick={handleEditSession}
          disabled={!selectedSession}
        >
          Edit Session
        </Button>
        <Button
          variant="danger"
          className="m-2"
          onClick={handleDeleteSession}
          disabled={!selectedSession}
        >
          Delete Session
        </Button>
        <Button
          variant="danger"
          className="m-2"
          onClick={deleteSelectedRiders}
          disabled={selectedRiders.length === 0}
        >
          Delete Result
        </Button>
        <Button
          variant="secondary"
          className="m-2"
          onClick={handleClearSelection}
          disabled={!selectedSession}
        >
          Clear Selection
        </Button>
        <Button
          variant="warning"
          className="m-2"
          onClick={handleEditRider}
          disabled={!selectedRider}
        >
          Edit Rider
        </Button>
      </div>
    </div>
  );
};

export default ResultAdmin; // Exporting the ResultAdmin component
