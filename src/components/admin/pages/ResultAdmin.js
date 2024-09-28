import React, { useState } from 'react';
import { Button, Form, Modal, Alert, Dropdown, Table } from 'react-bootstrap';
import './Account.css';

const ResultAdmin = () => {
  const [events, setEvents] = useState(['Event A', 'Event B', 'Event C']);
  const [categories, setCategories] = useState(['MotoGP', 'Moto2', 'Moto3']);

  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  
  const [rankingData, setRankingData] = useState({
    event: '',
    category: '',
    session: '',
    position: '',
    number: '',
    fullName: '',
    flag: '',
    team: '',
    time: ''
  });
  
  const [rankings, setRankings] = useState([]);
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedResultId, setSelectedResultId] = useState(null);
  const [selectedRanking, setSelectedRanking] = useState(null);

  const handleShowCategoryModal = (event) => {
    setCurrentEvent(event);
    setRankingData((prevData) => ({ ...prevData, event }));
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  const handleSelectCategory = (category) => {
    setCurrentCategory(category);
    setRankingData((prevData) => ({ ...prevData, category }));
    handleCloseCategoryModal();
    setShowResultModal(true);
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    setRankingData({
      event: '',
      category: '',
      session: '',
      position: '',
      number: '',
      fullName: '',
      flag: '',
      team: '',
      time: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRankingData({ ...rankingData, [name]: value });
    setHasUnsavedChanges(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setRankings([...rankings, { ...rankingData, id: rankings.length + 1 }]);
    handleCloseResultModal();
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setChangesSaved(true);
    setHasUnsavedChanges(false);
  };

  const deleteResult = () => {
    if (selectedResultId) {
      setRankings(rankings.filter((ranking) => ranking.id !== selectedResultId));
      setSelectedResultId(null);
      setSelectedRanking(null);
      setHasUnsavedChanges(true);
    }
  };

  // Function to get unique rankings by event, category, and session
  const getUniqueRankings = () => {
    const uniqueRankings = [];
    const seenCombinations = new Set();

    rankings.forEach((ranking) => {
      const combination = `${ranking.event}-${ranking.category}-${ranking.session}`;
      if (!seenCombinations.has(combination)) {
        seenCombinations.add(combination);
        uniqueRankings.push({
          id: ranking.id, // Include ID here
          event: ranking.event,
          category: ranking.category,
          session: ranking.session
        });
      }
    });

    return uniqueRankings;
  };

  return (
    <div className="account-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      {/* Alert when changes are saved */}
      {changesSaved && (
        <Alert variant="success" onClose={() => setChangesSaved(false)} dismissible>
          Changes saved successfully!
        </Alert>
      )}

      {/* Dropdown for Events */}
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {currentEvent && currentCategory ? `${currentEvent} - ${currentCategory}` : 'Select an Event'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {events.map((event, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => handleShowCategoryModal(event)}
            >
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

      {/* Result Modal */}
      <Modal show={showResultModal} onHide={handleCloseResultModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Result for {rankingData.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formSession" className="mb-3">
              <Form.Label>Session</Form.Label>
              <Form.Control type="text" name="session" value={rankingData.session} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formPosition" className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control type="text" name="position" value={rankingData.position} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formNumber" className="mb-3">
              <Form.Label>Number</Form.Label>
              <Form.Control type="text" name="number" value={rankingData.number} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formFullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="fullName" value={rankingData.fullName} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formFlag" className="mb-3">
              <Form.Label>Flag</Form.Label>
              <Form.Control type="text" name="flag" value={rankingData.flag} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formTeam" className="mb-3">
              <Form.Label>Team</Form.Label>
              <Form.Control type="text" name="team" value={rankingData.team} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formTime" className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control type="text" name="time" value={rankingData.time} onChange={handleInputChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">Add Result</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* First Table: Rankings Summary (Unique Entries) */}
      {rankings.length > 0 && (
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
            {getUniqueRankings().map((uniqueRanking, index) => (
              <tr 
                key={index}
                onClick={() => {
                  setSelectedResultId(uniqueRanking.id); // Use uniqueRanking.id for selected row
                  setSelectedRanking(uniqueRanking); // Set selected ranking on row click
                }}
                style={{ backgroundColor: uniqueRanking === selectedRanking ? '#f0f8ff' : '' }} // Highlight selected row
              >
                <td>{uniqueRanking.id}</td>
                <td>{uniqueRanking.event}</td>
                <td>{uniqueRanking.category}</td>
                <td>{uniqueRanking.session}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Second Table: Riders based on selected ranking */}
      {selectedRanking && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Position</th>
              <th>Number</th>
              <th>Full Name</th>
              <th>Flag</th>
              <th>Team</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {rankings.filter(r => 
              r.event === selectedRanking.event && 
              r.category === selectedRanking.category && 
              r.session === selectedRanking.session
            ).map((rider) => (
              <tr key={rider.id}>
                <td>{rider.position}</td>
                <td>{rider.number}</td>
                <td>{rider.fullName}</td>
                <td>{rider.flag}</td>
                <td>{rider.team}</td>
                <td>{rider.time}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Buttons Group */}
      <div className="button-group mt-4 d-flex justify-content-center">
        <Button variant="primary" onClick={handleSave} disabled={!hasUnsavedChanges}>
          Save
        </Button>
        
        <Button variant="danger" className="mx-2" onClick={deleteResult} disabled={!selectedResultId}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ResultAdmin;
