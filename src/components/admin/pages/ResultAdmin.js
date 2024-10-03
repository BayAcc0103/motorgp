


import Select from 'react-select';  // Importing react-select
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import { Button, Modal, Dropdown, Table, Alert, Form } from 'react-bootstrap'; // Importing components from react-bootstrap
import { v4 as uuidv4 } from 'uuid'; // Importing uuid for generating unique IDs
const ResultAdmin = () => {
  // State variables for events and categories
  const [events, setEvents] = useState([]);
  const [categories] = useState(['MotoGP', 'Moto2', 'Moto3']);

  // State for current selections and modal visibility
  const [currentEventId, setcurrentEventId] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showRiderModal, setShowRiderModal] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  // State for session data and sessions list
  const [sessionData, setSessionData] = useState({
    eventId: '',
    category: '',
    sessionName: '',
    sessionDate: ''
  });
  const [sessions, setSessions] = useState([]);


  // State for rider data and selected riderResults
  const [riders, setRiders] = useState([]);
  const [riderResults, setriderResults] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [riderResultFormData, setriderResultFormData] = useState({
    riderID: '',
    position: '',
    time: '',
    number: '',
    fullName: '',
    flag: '',
    team: ''
  });

  // State for editing flags and selected riderResults
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingResult, setisEditingResult] = useState(false);
  const [selectedRiderResult, setSelectedRiderResult] = useState(null);
  const [selectedriderResults, setSelectedriderResults] = useState([]);

  // Fetch sessions from backend on component mount
  // useEffect(() => {
  //   const fetchSessions = async () => {
  //     try {
  //       const response = await fetch('http:/localhost:3002/sessions'); // Update with your base URL if needed
  //       setSessions(response.data);
  //     } catch (error) {
  //       console.error('Error fetching sessions:', error);
  //     }
  //   };
  //   fetchSessions();
  // }, []);

  // useEffect(() => {
  //   console.log(riderResults)
  //   // console.log(riderResults)
  // }, [riderResults])  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/calendar'); // Update with your base URL if needed
        const data = await response.json(); // Parse the JSON response
        setEvents(data);

      }
      catch (error) {
        console.error('Error fetching events:', error)
      }

    }
    fetchEvents();

    const fetchRiders = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/riders'); // Update with your base URL if needed
        const data = await response.json(); // Parse the JSON response
        setRiders(data) // Update the riders state with the fetched data
      } catch (error) {
        error.console("Error fetching riders: " + error)
      }
    }
    fetchRiders();

    const fetchRiderResults = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/result'); // Update with your base URL if needed
        const data = await response.json(); // Parse the JSON response
        setriderResults(data) // Update the riders state with the fetched data


      } catch (error) {
        error.console("Error fetching riderResults: " + error)
      }
    }
    fetchRiderResults();

    const fetchSessions = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/sessions'); // Update with your base URL if needed
        const data = await response.json(); // Parse the JSON response
        setSessions(data) // Update the sessions state with the fetched data
      }
      catch(error){
        error.console("Error fetching sessions: " + error)
      }
    }
    fetchSessions();
  }, [])
  // useEffect(() => {

  // }, [])


  // Function to show category modal
  const handleShowCategoryModal = (session) => {
    setcurrentEventId(session);
    setShowCategoryModal(true);
  };

  // Function to close category modal
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  // Function to handle category selection
  const handleSelectCategory = (category) => {
    setCurrentCategory(category);
    setSessionData({ eventId: currentEventId, category });
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
          session.eventId === sessionData.eventId &&
          session.category === sessionData.category &&
          session.sessionName === sessionData.sessionName
      );

      if (!isSessionExist) {
        setSessions([...sessions, { ...sessionData, id: uuidv4(), isNew: true }]); // Generate unique ID for new session
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



  // Function to clear selection of session
  const handleClearSelection = () => {
    setSelectedSession(null);
    setIsEditing(false);
  };

  // Function to handle save action
  const handleSave = async () => {
    // setShowSaveAlert(true);
    // setTimeout(() => {
    //   setShowSaveAlert(false);
    // }, 3000);
    try {
      for (const session of sessions) {
        if (session.isNew) {
          // If the session is new, POST it to the backend
          await fetch('http://localhost:3002/api/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session),
          });
        } else if (session.isDeleted) {
          // If the session is deleted, delete it from the backend
          await fetch(`http://localhost:3002/api/sessions/${session.id}`, {
            method: 'DELETE',
          });
        }
        else {
          // Otherwise, update the session via PUT using its UUID
          await fetch(`http://localhost:3002/api/sessions/${session.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session),
          });
        }
        console.log('Data saved!'); // Replace with actual save logic
        setShowSaveAlert(true);
        setTimeout(() => setShowSaveAlert(false), 3000); // Hide alert after 3 seconds
      }
      // re-fetch the updated list of sessions from the backend after save
      const response = await fetch('http://localhost:3002/api/sessions');
      const updatedSessions = await response.json();
      setSessions(updatedSessions);
    } catch (error) {
      console.error('Error saving data:', error)
    }
    try {
      // Save riderResults to the backend
      for (const riderResult of riderResults) {
        if (riderResult.isNew) {
          // If the riderResult is new, POST it to the backend
          await fetch('http://localhost:3002/api/result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(riderResult),
          });
        } else if (riderResult.isDeleted) {
          // If the riderResult is deleted, delete it from the backend
          await fetch(`http://localhost:3002/api/result/${riderResult.id}`, {
            method: 'DELETE',
          });
        }
        else {
          // Otherwise, update the riderResult via PUT using its UUID
          await fetch(`http://localhost:3002/api/result/${riderResult.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(riderResult),
          });
        }
      }
      // re-fetch the updated list of result from the backend after save
      const response = await fetch('http://localhost:3002/api/result');
      const updatedRiderResults = await response.json();
      setriderResults(updatedRiderResults)

    } catch (error) {

    }
  };

  // Function to handle rider input change
  const handleRiderInputChange = (e) => {
    const { name, value } = e.target;
    setriderResultFormData({ ...riderResultFormData, [name]: value });
  };

  // Function to add or update rider information
  const handleAddResult = () => {
    const filteredRider = riders.filter(rider => rider.rider_full_name === riderResultFormData.fullName)[0];


    if (isEditingResult) {
      // Update existing riderResult
      const updatedriderResults = riderResults.map((riderResult) =>
        riderResult.id === selectedRiderResult.id ? { ...riderResultFormData, id: selectedRiderResult.id, riderID: filteredRider ? filteredRider.id : '' } : riderResult
      );
      setriderResults(updatedriderResults);
      setisEditingResult(false);
      setSelectedRiderResult(null);
    } else {
      // Add new rider
      setriderResults([...riderResults, { ...riderResultFormData, id: uuidv4(), sessionId: selectedSession.id, isNew: true, riderID: filteredRider ? filteredRider.id : '' }]); // Generate unique ID for new rider
    }
    setShowRiderModal(false);
    setriderResultFormData({
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
    if (selectedRiderResult) {
      setisEditingResult(true);
      setriderResultFormData(selectedRiderResult);
      setShowRiderModal(true);
    }
  };
  // Function to handle selection of Sessions
  const handleSelectSessions = (id) => {
    setSelectedSessions((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((eventId) => eventId !== id)
        : [...prevSelected, id]
    );
  };

  // Function to handle selection of riderResults
  const handleSelectriderResults = (id) => {
    setSelectedriderResults((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((eventId) => eventId !== id)
        : [...prevSelected, id]
    );
  };

  const deleteSelectedSessions = () => {
    setSessions(sessions.map(session =>
      selectedSessions.includes(session.id) ? { ...session, isDeleted: true } : session
    ));
    setSelectedriderResults([]); // Clear the selected riderResults after deletion
  };

  // Function to delete selected riderResults
  const deleteSelectedriderResults = () => {
    setriderResults(riderResults.map(rider =>
      selectedriderResults.includes(rider.id) ? { ...rider, isDeleted: true } : rider
    ));
    setSelectedriderResults([]); // Clear the selected riderResults after deletion
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
          {currentEventId && currentCategory
            ? `${events.find(session => session.id === currentEventId)?.name} - ${currentCategory}`
            : 'Select a session and Category'}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          {events.map((session, index) => (
            <Dropdown.Item key={index} onClick={() => handleShowCategoryModal(session.id)}>
              {session.name}
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
          <Form>
            <Form.Group>
              <Form.Label>Session Name</Form.Label>
              <Form.Control
                type="text"
                name="sessionName"
                value={sessionData.sessionName}
                onChange={handleSessionInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={sessionData.category}
                onChange={handleSessionInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Event</Form.Label>
              <Form.Control
                as="select"
                name="eventId"
                value={sessionData.eventId}
                onChange={handleSessionInputChange}
              >
                <option value="">Select an event</option>
                {events.map(session => (
                  <option key={session.id} value={session.id}>
                    {session.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Session Date</Form.Label>
              <Form.Control
                type="date"
                name="sessionDate"
                value={sessionData.sessionDate}
                onChange={handleSessionInputChange}
              />
            </Form.Group>
          </Form>
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
          <Modal.Title>{isEditingResult ? 'Edit Rider Information' : 'Add Rider Information'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={riderResultFormData.position}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                name="time"
                value={riderResultFormData.time}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={riderResultFormData.number}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
  
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Select
                options={riders.map(rider => ({
                  value: rider.rider_full_name,
                  label: rider.rider_full_name
                }))} // Create options from riders
                onChange={(selectedOption) => {
                  setriderResultFormData({
                    ...riderResultFormData,
                    fullName: selectedOption ? selectedOption.value : ''
                  });
                }}
                value={riderResultFormData.fullName ? { value: riderResultFormData.fullName, label: riderResultFormData.fullName } : null} // Set the selected option
                isClearable
                placeholder="Select a rider"
              />
            </Form.Group>
  
            <Form.Group>
              <Form.Label>Flag</Form.Label>
              <Form.Control
                type="text"
                name="flag"
                value={riderResultFormData.flag}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                name="team"
                value={riderResultFormData.team}
                onChange={handleRiderInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddResult}>
            {isEditingResult ? 'Save Changes' : 'Add Rider'}
          </Button>
        </Modal.Footer>
      </Modal>
  
      {/* Sessions Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Event</th>
            <th>Session Date</th>
            <th>Category</th>
            <th>Session</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((sessionItem) => { // Change 'session' to 'sessionItem'
            const session = events.find(event => event.id === sessionItem.eventId); // Find the session by ID
            return (
              <tr
                key={sessionItem.id} // Use 'sessionItem.id' instead of 'session.id' for the key property
                onClick={() => setSelectedSession(sessionItem)}
                style={{ cursor: "pointer", backgroundColor: sessionItem.isDeleted ? 'red' : (sessionItem === selectedSession ? '#f0f8ff' : '') }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedSessions.includes(sessionItem.id)}
                    onChange={() => handleSelectSessions(sessionItem.id)} // Use sessionItem.id here
                  />
                </td>
                <td>{session.id}</td>
                <td>{session ? session.name : 'Unknown session'}</td>
                <td>{sessionItem.sessionDate}</td> {/* Use sessionItem.sessionDate */}
                <td>{sessionItem.category}</td> {/* Keep using sessionItem.category */}
                <td>{sessionItem.sessionName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
  
      {/* Rider Data Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th></th>
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
          {riderResults
            .filter((rider) => rider.sessionId === selectedSession?.id)
            .map((rider) => { 
                const riderData = riders.find(r => r.rider_full_name === rider.fullName); // Find the rider by full name
              return(
              <tr
                key={rider.id}
                onClick={() => {
                  setSelectedRiderResult(rider);
                  setisEditingResult(true);
                }}
                style={{ cursor: "pointer", backgroundColor: rider.isDeleted ? 'red' : (rider === selectedRiderResult ? '#f0f8ff' : '') }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedriderResults.includes(rider.id)}
                    onChange={() => handleSelectriderResults(rider.id)}
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
            )})}
          {console.log(riderResults)}
        </tbody>
      </Table>
  
      {/* Action Buttons */}
      <div className="mt-3">
        <Button variant="primary" className="m-2" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" className="m-2" onClick={handleClearSelection}>
          Clear Selection
        </Button>
      </div>
    </div>
  );
  
};

export default ResultAdmin; // Exporting the ResultAdmin component
