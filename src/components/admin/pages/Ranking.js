import React, { useState } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import './Account.css';

const Ranking = () => {
  const [rankings, setRankings] = useState([
    { id: 1, racers: 'Racer 1', location: 'Inferno', points: 100 },
    { id: 2, racers: 'Racer 2', location: 'Twin Tower', points: 80 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false); 
  const [currentRankingId, setCurrentRankingId] = useState(null); 
  const [rankingData, setRankingData] = useState({ racers: '', location: '', points: '' });
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Handle showing the modal
  const handleShowAdd = () => {
    setShowModal(true);
    setOnEdit(false); 
    setRankingData({ racers: '', location: '', points: '' });
  };

  const handleShowEdit = () => {
    if (currentRankingId) {
      const selectedRanking = rankings.find((ranking) => ranking.id === currentRankingId);
      setRankingData({
        racers: selectedRanking.racers,
        location: selectedRanking.location,
        points: selectedRanking.points,
      });
      setOnEdit(true);
      setShowModal(true); 
    }
  };

  const handleClose = () => setShowModal(false);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRankingData({ ...rankingData, [name]: value });
    setHasUnsavedChanges(true);
  };

  // Handle adding or editing a ranking
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      setRankings(rankings.map((ranking) => (ranking.id === currentRankingId ? { ...ranking, ...rankingData } : ranking)));
    } else {
      setRankings([...rankings, { ...rankingData, id: rankings.length + 1 }]);
    }
    handleClose();
    setHasUnsavedChanges(true);
  };

  const handleRowClick = (ranking) => {
    setCurrentRankingId(ranking.id); 
  };

  const deleteRanking = () => {
    if (currentRankingId) {
      setRankings(rankings.filter((ranking) => ranking.id !== currentRankingId));
      setCurrentRankingId(null);
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
            <th>Racers and Team</th>
            <th>Location</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking) => (
            <tr 
              key={ranking.id} 
              onClick={() => handleRowClick(ranking)} 
              style={{ cursor: 'pointer', backgroundColor: ranking.id === currentRankingId ? '#f0f8ff' : '' }} 
            >
              <td>{ranking.id}</td>
              <td>{ranking.racers}</td>
              <td>{ranking.location}</td>
              <td>{ranking.points}</td>
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
          disabled={!currentRankingId} 
          onClick={handleShowEdit}>
          Edit
        </Button>
        <Button 
          variant="danger" 
          disabled={!currentRankingId} 
          onClick={deleteRanking}>
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

      {/* Add/Edit Ranking Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Ranking' : 'Add New Ranking'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formRacers" className="mb-3">
              <Form.Label>Racers and Team</Form.Label>
              <Form.Control 
                type="text" 
                name="racers" 
                value={rankingData.racers} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formLocation" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                name="location" 
                value={rankingData.location} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formPoints" className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control 
                type="number" 
                name="points" 
                value={rankingData.points} 
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

export default Ranking;
