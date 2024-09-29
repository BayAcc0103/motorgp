import React, { useState } from 'react';
import { Button, Form, Modal, Alert, Dropdown, Table } from 'react-bootstrap';
import './Account.css';

const ResultAdmin = () => {
  const [events, setEvents] = useState(['Event A', 'Event B', 'Event C']);
  const [categories, setCategories] = useState(['MotoGP', 'Moto2', 'Moto3']);

  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
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
  const [isEdit, setIsEdit] = useState(false);

  // Open modal for selecting category
  const handleShowCategoryModal = (event) => {
    setCurrentEvent(event);
    setRankingData((prevData) => ({ ...prevData, event }));
    setShowCategoryModal(true);
  };

  // Close category modal
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  // Select category and open session input modal
  const handleSelectCategory = (category) => {
    setCurrentCategory(category);
    setRankingData((prevData) => ({ ...prevData, category }));
    handleCloseCategoryModal();
    setShowSessionModal(true);
  };

  // Close session modal
  const handleCloseSessionModal = () => setShowSessionModal(false);

  // Input session and update rankings
  const handleSessionSubmit = (e) => {
    e.preventDefault();
    
    setRankingData((prevData) => ({
      ...prevData,
      session: rankingData.session // Ensure session is updated in rankingData
    }));

    // Update current session and clear session input
    setCurrentSession(rankingData.session);
    setRankingData((prevData) => ({ ...prevData, session: '' }));
    
    handleCloseSessionModal(); // Close the session modal
  };

  // Close result modal
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
    setIsEdit(false);
  };

  // Handle changes in the input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRankingData({ ...rankingData, [name]: value });
    setHasUnsavedChanges(true);
  };

  // Handle submission of the result form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const newRanking = { ...rankingData, id: rankings.length + 1 };
    
    if (isEdit) {
      setRankings(rankings.map(ranking => 
        ranking.id === selectedResultId ? newRanking : ranking
      ));
    } else {
      setRankings([...rankings, newRanking]);
    }
    
    handleCloseResultModal();
    setHasUnsavedChanges(true); // Mark as having unsaved changes
  };

  // Save changes
  const handleSave = () => {
    setChangesSaved(true);
    setHasUnsavedChanges(false);
  };

  // Delete result
  const deleteResult = () => {
    if (selectedResultId) {
      setRankings(rankings.filter((ranking) => ranking.id !== selectedResultId));
      setSelectedResultId(null);
      setSelectedRanking(null);
      setHasUnsavedChanges(true);
    }
  };

  // Edit result
  const handleEdit = () => {
    if (selectedRanking) {
      const rankingToEdit = rankings.find((ranking) => ranking.id === selectedResultId);
      if (rankingToEdit) {
        setRankingData(rankingToEdit);
        setShowResultModal(true);
        setIsEdit(true);
      }
    }
  };

  // Get unique rankings
  const getUniqueRankings = () => {
    const uniqueRankings = [];
    const seenCombinations = new Set();

    rankings.forEach((ranking) => {
      const combination = `${ranking.event}-${ranking.category}-${ranking.session}`;
      if (!seenCombinations.has(combination)) {
        seenCombinations.add(combination);
        uniqueRankings.push({
          id: ranking.id,
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
      {/* Alert for successful save */}
      {changesSaved && (
        <Alert variant="success" onClose={() => setChangesSaved(false)} dismissible>
          Changes saved successfully!
        </Alert>
      )}

      {/* Dropdown for selecting Event and Category */}
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

      {/* Modal for selecting Category */}
      <Modal show={showCategoryModal} onHide={handleCloseCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {categories.map((category, index) => (
            <Button key={index} variant="outline-primary" className="m-1" onClick={() => handleSelectCategory(category)}>
              {category}
            </Button>
          ))}
        </Modal.Body>
      </Modal>

      {/* Modal for entering Session */}
      <Modal show={showSessionModal} onHide={handleCloseSessionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSessionSubmit}>
            <Form.Group controlId="formSession" className="mb-3">
              <Form.Label>Session</Form.Label>
              <Form.Control
                type="text"
                name="session"
                value={rankingData.session}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Submit Session</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Table 1: Display Event, Category, Session */}
      {currentSession && (
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
                  setSelectedResultId(uniqueRanking.id);
                  setSelectedRanking(uniqueRanking);
                }}
                style={{ backgroundColor: uniqueRanking === selectedRanking ? '#f0f8ff' : '' }}
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

      {/* Button to Add Result */}
      {currentSession && (
        <Button variant="primary" className="mt-3" onClick={() => setShowResultModal(true)}>
          Add Result
        </Button>
      )}

      {/* Modal for entering Result */}
      <Modal show={showResultModal} onHide={handleCloseResultModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit' : 'Add'} Result for {rankingData.category}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formPosition" className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={rankingData.position}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formNumber" className="mb-3">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={rankingData.number}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={rankingData.fullName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formFlag" className="mb-3">
              <Form.Label>Flag</Form.Label>
              <Form.Control
                type="text"
                name="flag"
                value={rankingData.flag}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTeam" className="mb-3">
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                name="team"
                value={rankingData.team}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTime" className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                name="time"
                value={rankingData.time}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isEdit ? 'Update Result' : 'Add Result'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Table 2: Display Results */}
      {rankings.length > 0 && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Position</th>
              <th>Number</th>
              <th>Full Name</th>
              <th>Flag</th>
              <th>Team</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking) => (
              <tr key={ranking.id}>
                <td>{ranking.id}</td>
                <td>{ranking.position}</td>
                <td>{ranking.number}</td>
                <td>{ranking.fullName}</td>
                <td>{ranking.flag}</td>
                <td>{ranking.team}</td>
                <td>{ranking.time}</td>
                <td>
                  <Button variant="warning" onClick={() => {
                    setSelectedResultId(ranking.id);
                    setSelectedRanking(ranking);
                    setIsEdit(true);
                    setRankingData(ranking);
                    setShowResultModal(true);
                  }}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={deleteResult} className="ml-1">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Save Changes Button */}
      <Button variant="success" className="mt-3" onClick={handleSave} disabled={!hasUnsavedChanges}>
        Save Changes
      </Button>
    </div>
  );
};

export default ResultAdmin;
