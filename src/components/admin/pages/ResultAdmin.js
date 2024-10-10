


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

  // State to manage loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from APIs...');
        
        const [eventsResponse, ridersResponse, riderResultsResponse, sessionsResponse] = await Promise.all([
          fetch('http://localhost:3002/api/calendar'),
          fetch('http://localhost:3002/api/riders'),
          fetch('http://localhost:3002/api/result'),
          fetch('http://localhost:3002/api/sessions'),
        ]);

        console.log('Responses received:');
        console.log('Events response:', eventsResponse);
        console.log('Riders response:', ridersResponse);
        console.log('Rider results response:', riderResultsResponse);
        console.log('Sessions response:', sessionsResponse);

        const eventsData = await eventsResponse.json();
        const ridersData = await ridersResponse.json();
        const riderResultsData = await riderResultsResponse.json();
        const sessionsData = await sessionsResponse.json();

        console.log('Parsed data:');
        console.log('Events data:', eventsData);
        console.log('Riders data:', ridersData);
        console.log('Rider results data:', riderResultsData);
        console.log('Sessions data:', sessionsData);

        setEvents(eventsData);
        setRiders(ridersData);
        setriderResults(riderResultsData);
        setSessions(sessionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false when done
        console.log('Data fetching complete.');
      }
    };

    fetchData();
  }, []);
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
        session.id === selectedSession.id ? { ...sessionData, id: selectedSession.id, isEdited: true } : session
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
        else if (session.isEdited){
          // Otherwise, update the session via PUT using its UUID
          await fetch(`http://localhost:3002/api/sessions/${session.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session),
          });
          await fetch(`http://localhost:3002/api/updatePoints/${session.id}`, {
            method: 'POST',
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
        else if(riderResult.isEdited){
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
    const formattedTime = `${riderResultFormData.minutes}:${riderResultFormData.seconds}:${riderResultFormData.milliseconds}`;

    if (isEditingResult) {
      // Update existing riderResult
      const updatedriderResults = riderResults.map((riderResult) =>
        riderResult.id === selectedRiderResult.id ? { ...riderResultFormData, id: selectedRiderResult.id, riderID: filteredRider ? filteredRider.id : '', time: formattedTime, isEdited: true } : riderResult
      );
      setriderResults(updatedriderResults);
      setisEditingResult(false);
      setSelectedRiderResult(null);
    } else {
      // Add new rider
      setriderResults([...riderResults, { ...riderResultFormData, id: uuidv4(), sessionId: selectedSession.id, isNew: true, riderID: filteredRider ? filteredRider.id : '', time: formattedTime }]); // Generate unique ID for new rider
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

  if (loading) {
    return <div>Loading...</div>;
  }
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
  
      {/* session Modal */}
      <Modal show={showSessionModal} onHide={() => setShowSessionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit session' : 'Enter session'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>session Name</Form.Label>
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
              <Form.Label>session Date</Form.Label>
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
            {isEditing ? 'Save Changes' : 'Save session'}
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
            {/* <Form.Group>
              <Form.Label>RiderID</Form.Label>
              <Form.Control
                type="text"
                name="riderID"
                value={riderResultFormData.riderID}
                onChange={handleRiderInputChange}
              />
            </Form.Group> */}
            
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="minutes"
                  value={riderResultFormData.minutes}
                  onChange={(e) => {
                    setriderResultFormData({ ...riderResultFormData, minutes: e.target.value });
                    handleRiderInputChange(e);
                  }}
                  placeholder="Minutes"
                  style={{ width: '100px', marginRight: '5px' }}
                />
                <Form.Control
                  type="text"
                  name="seconds"
                  value={riderResultFormData.seconds}
                  onChange={(e) => {setriderResultFormData({
                    ...riderResultFormData,
                    seconds: e.target.value
                  }); handleRiderInputChange(e)}}
                  placeholder="Seconds"
                  style={{ width: '100px', marginRight: '5px' }}
                />
                <Form.Control
                  type="text"
                  name="milliseconds"
                  value={riderResultFormData.milliseconds}
                  onChange={(e) => {setriderResultFormData({
                    ...riderResultFormData,
                    milliseconds: e.target.value
                  });handleRiderInputChange(e)}}
                  placeholder="Milliseconds"
                  style={{ width: '100px' }}
                />
              </div>
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
            <th>session Date</th>
            <th>Category</th>
            <th>session</th>
          </tr>
        </thead>
        <tbody>
  {sessions.map((sessionItem) => {
    const session = events.find(event => event.id === sessionItem.eventId); // Find the session by ID
    return (
      <tr
        key={sessionItem.id}
        onClick={() => setSelectedSession(sessionItem)}
        style={{ cursor: "pointer", backgroundColor: sessionItem.isDeleted ? 'red' : (sessionItem === selectedSession ? '#f0f8ff' : '') }}
      >
        <td>
          <input
            type="checkbox"
            checked={selectedSessions.includes(sessionItem.id)}
            onChange={() => handleSelectSessions(sessionItem.id)}
          />
        </td>
        <td>{session ? session.id : 'N/A'}</td>
        <td>{session ? session.name : 'Unknown session'}</td>
        <td>{new Date(sessionItem.sessionDate).toLocaleDateString()}</td>
        <td>{sessionItem.category}</td>
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
              return (
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
              )
            })}
          {console.log(riderResults)}
        </tbody>
      </Table>
  
      {/* Action Buttons */}
      <div className="mt-3">
      <Button
          variant="warning"
          className="m-2"
          onClick={handleEditSession}
          disabled={!selectedSession}
        >
          Edit session
        </Button>
        <Button
          variant="danger"
          className="m-2"
          onClick={deleteSelectedSessions} // Change the function name here
          disabled={selectedSessions.length === 0} // Disable if no sessions are selected
        >
          Delete session
        </Button>
        <Button
          variant="danger"
          className="m-2"
          onClick={deleteSelectedriderResults}
          disabled={selectedriderResults.length === 0}
        >
          Delete Result
        </Button>
        
      <Button
          variant="warning"
          className="m-2"
          onClick={handleEditRider}
          disabled={!selectedRiderResult}
        >
          Edit Rider
        </Button>
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
