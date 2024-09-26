// TeamAdmin.js
import React, { useState } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import './Account.css';

const TeamAdmin = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [teamData, setTeamData] = useState({ time: '', location: '', name: '', image: '' });
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleShowAdd = () => {
    setShowModal(true);
    setOnEdit(false);
    setTeamData({ time: '', location: '', name: '', image: '' });
  };

  const handleShowEdit = () => {
    if (currentTeamId) {
      const selectedTeam = teams.find((team) => team.id === currentTeamId);
      setTeamData({
        time: selectedTeam.time,
        location: selectedTeam.location,
        name: selectedTeam.name,
        image: selectedTeam.image,
      });
      setOnEdit(true);
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData({ ...teamData, [name]: value });
    setHasUnsavedChanges(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      setTeams(teams.map((team) => (team.id === currentTeamId ? { ...team, ...teamData } : team)));
    } else {
      setTeams([...teams, { ...teamData, id: teams.length + 1 }]);
    }
    handleClose();
    setHasUnsavedChanges(true);
  };

  const handleRowClick = (team) => {
    setCurrentTeamId(team.id);
  };

  const deleteTeam = () => {
    if (currentTeamId) {
      setTeams(teams.filter((team) => team.id !== currentTeamId));
      setCurrentTeamId(null);
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

      <h2>Teams</h2>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Location</th>
            <th>Team</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr
              key={team.id}
              onClick={() => handleRowClick(team)}
              style={{ cursor: 'pointer', backgroundColor: team.id === currentTeamId ? '#f0f8ff' : '' }}
            >
              <td>{team.id}</td>
              <td>{team.time}</td>
              <td>{team.location}</td>
              <td>{team.name}</td>
              <td>
                <img src={team.image} alt={team.name} style={{ width: '100px', height: 'auto' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="button-group mt-4 d-flex justify-content-center">
        <Button variant="primary" onClick={handleShowAdd}>Add Team</Button>
        <Button variant="success" className="mx-2" disabled={!currentTeamId} onClick={handleShowEdit}>Edit</Button>
        <Button variant="danger" disabled={!currentTeamId} onClick={deleteTeam}>Delete</Button>
        <Button variant="info" className="mx-2" onClick={handleSave} disabled={!hasUnsavedChanges}>Save</Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Team' : 'Add New Team'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formTime" className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                name="time"
                value={teamData.time}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLocation" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={teamData.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={teamData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={teamData.image}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {onEdit ? 'Save Changes' : 'Add Team'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeamAdmin;
