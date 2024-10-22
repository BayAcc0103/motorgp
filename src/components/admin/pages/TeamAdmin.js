// TeamAdmin.js
import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique IDs
import './Account.css';
import { Dialog, DialogTitle, DialogContent, Grid, DialogActions } from "@mui/material";

const TeamAdmin = () => {
  const [bikeUrl, setBikeUrl] = useState(''); // State for bike URL
  const [error, setError] = useState(''); // State for error messages
  const [teams, setTeams] = useState([]); // State for teams
  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState(null);
  const [teamData, setTeamData] = useState({
    id: '',
    name: '',
    description: '', 
    championships: 0,
    raceWins: 0,
    podiums: 0,
    totalPoints: 0,
    teamPrincipal: '',
    teamManager: '',
    technicalDirector: '',
    engineSupplier: '',
    tyreSupplier: '',
    bikeUrl: '',
  });
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]); // State for selected teams

  // Fetch teams from the API
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        setError('Failed to fetch teams. Please try again later.');
        alert("Backend is not responding, please contact administration!");
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();

     // Fetching image to useState for storing
     const fetchImages = async (category) => {
      try {
        const response = await fetch(`/api/defaultImages/${category}`); // Fetch images from category
        const imagesData = await response.json(); // Parse the JSON response

        // Extract imageUrl from the response and set the respective state
        const urls = imagesData.map(image => image.imageUrl); // Map to get imageUrl
        switch (category) {
          case 'teamImage':
            setBikeUrl(urls); // Lù mé chỉnh nhiều vãi
            break;
          default:
            console.warn(`Unknown image category: ${category}`);
            break;
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages('teamImage');

  }, []);

  // Handle showing the modal for adding a team
  const handleShowAdd = () => {
    setShowModal(true);
    setOnEdit(false);
    setTeamData({
      id: uuidv4(), // Generate a unique ID
      name: '',
      description: '',
      // riders: [],
      championships: 0,
      raceWins: 0,
      podiums: 0,
      totalPoints: 0,
      teamPrincipal: '',
      teamManager: '',
      technicalDirector: '',
      engineSupplier: '',
      tyreSupplier: '',
      //bikeUrl: '',
    });
  };

  // Handle showing the modal for editing a team
  const handleShowEdit = async () => {
    if (currentTeamId) {
      const selectedTeam = teams.find((team) => team.id === currentTeamId);
      setTeamData(selectedTeam);
      setOnEdit(true);
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData({ ...teamData, [name]: value });
    setHasUnsavedChanges(true);
  };

  // Handle adding or editing a team
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        // Editing an existing team
        setTeams(teams.map((team) => 
          team.id === currentTeamId ? { ...team, ...teamData, isEdited: true } : team
        ));
      } else {
        // Adding a new team
        setTeams([...teams, { ...teamData, isNew: true }]); // Add the new team to the state
      }

      handleClose();
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error('Error saving team:', error);
    }
  };

  const handleRowClick = (team) => {
    setCurrentTeamId(team.id);
  };

  
  const handleSelectTeam = (id) => {
    setSelectedTeams((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((teamId) => teamId !== id)
        : [...prevSelected, id]
    );
  };

  const deleteSelectedTeams = async () => {
    if (currentTeamId) {
        setTeams(teams.map(team => selectedTeams.includes(team.id) ? { ...team, isDeleted: true } : team));
        setSelectedTeams([]);
        setHasUnsavedChanges(true);
    }
  };

  const handleSave = async () => {
    try {
      // Process all the changes in teams
      for (const team of teams) {
        if (team.isNew) {
          // POST new teams to the backend
          await fetch('http://localhost:3002/api/teams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(team),
          });
        } else if (team.isDeleted) {
          // DELETE deleted teams from the backend
          await fetch(`http://localhost:3002/api/teams/${team.id}`, {
            method: 'DELETE',
          });
        } else if (team.isEdited) {
          // PUT edited teams to the backend
          await fetch(`http://localhost:3002/api/teams/${team.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(team),
          });
        }
      }
  
      // Re-fetch the updated list of teams only once, after processing all changes
      const response = await fetch('http://localhost:3002/api/teams');
      if (!response.ok) throw new Error('Network response was not ok');
      const updatedTeams = await response.json();
      
      // Update the state with the new list of teams
      setTeams(updatedTeams);
  
      // Mark the changes as saved and reset the unsaved changes flag
      setChangesSaved(true);
      setHasUnsavedChanges(false);
  
    } catch (error) {
      console.error('Error saving teams:', error);
    }
  };

  //xử lí ảnh 
  const [open, setOpen] = useState(false);
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen(false);
  };
  const [currentImageSet, setCurrentImageSet] = useState([]); // Initialize as an empty array
  const [selectedImage1] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

   // Image sets
   const imagesSet1 = bikeUrl;
   const handleOpen = (images, index) => {
     setCurrentImageSet(images);
     setCurrentImageIndex(index);
     setOpen(true);
   };
 
   //error
  //    // Modal form for image selection
  // const handleImageSelect = (image) => {
  //   const updatedTeamData = { ...teamData };  // Create a copy of riderData
  //   if (currentImageIndex === 0) {
  //     updatedTeamData.riderUrl = image; // Save image1
  //   }
  //   setTeamData(updatedTeamData);
  //   handleClose1();
  // };
  
      const handleImageSelect = (image) => {
        const updatedTeamData = { ...teamData };  // Create a copy of teamData
        updatedTeamData.bikeUrl = image; // Save selected image to bikeUrl
        setTeamData(updatedTeamData); // Update state with new team data
        handleClose1(); // Close the dialog
      };


  return (
    <div className="account-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      {/* Image selection dialog */}
      <Dialog open={open} onClose={handleCloseDialog} style={{ backgroundImage: 'url(https://motogpvideogame.com/wp-content/uploads/it-only-happens-in-motogp24.webp)', backgroundSize: "cover" }}>
        <DialogTitle style={{ backgroundColor: "grey" }}>Select an Image</DialogTitle>
        <DialogContent style={{ backgroundColor: "grey", color: "white" }}>
          <Grid container spacing={2}>
            {Array.isArray(currentImageSet) && currentImageSet.map((image, index) => (  // Check if currentImageSet is an array
              <Grid item xs={3} key={index}>
                <img
                  src={image}
                  alt={`img-${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    cursor: "pointer",
                    // border: (currentImageIndex === 0 && selectedImage1 === image) || (currentImageIndex === 1 && selectedImage2 === image) || (currentImageIndex === 2 && selectedImage3 === image) || (currentImageIndex === 3 && selectedImage4 === image) ? "2px solid blue" : "none",
                  }}
                  onClick={() => handleImageSelect(image)}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>


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
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Championships</th>
            <th>Race Wins</th>
            <th>Podiums</th>
            <th>Total Points</th>
            <th>Team Principal</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr
              key={team.id}
              onClick={() => handleRowClick(team)}
              style={{ cursor: 'pointer', 
                backgroundColor: team.id === currentTeamId ? '#f0f8ff' : '' ,
                backgroundColor: team.isDeleted ? 'red' : (team.id === currentTeamId ? '#f0f8ff' : '')
              }}
            >
              <td>
                <input 
                  type="checkbox"
                  checked={selectedTeams.includes(team.id)}
                  onChange={() => handleSelectTeam(team.id)}
                  />
              </td>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.description}</td>
              <td>{team.championships}</td>
              <td>{team.raceWins}</td>
              <td>{team.podiums}</td>
              <td>{team.totalPoints}</td>
              <td>{team.teamPrincipal}</td>
              <td>
                <img src={team.bikeUrl} alt={team.name} style={{ width: '50px', height: 'auto' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="button-group mt-4 d-flex justify-content-center">
        <Button variant="primary" onClick={handleShowAdd}>Add Team</Button>
        <Button variant="success" className="mx-2" disabled={!currentTeamId} onClick={handleShowEdit}>Edit</Button>
        <Button variant="danger" disabled={!currentTeamId} onClick={deleteSelectedTeams}>Delete</Button>
        <Button variant="info" className="mx-2" onClick={handleSave} disabled={!hasUnsavedChanges}>Save</Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Team' : 'Add New Team'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formTeamName" className="mb-3">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={teamData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTeamDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={teamData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formChampionships" className="mb-3">
              <Form.Label>Championships</Form.Label>
              <Form.Control
                type="number"
                name="championships"
                value={teamData.championships}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formRaceWins" className="mb-3">
              <Form.Label>Race Wins</Form.Label>
              <Form.Control
                type="number"
                name="raceWins"
                value={teamData.raceWins}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPodiums" className="mb-3">
              <Form.Label>Podiums</Form.Label>
              <Form.Control
                type="number"
                name="podiums"
                value={teamData.podiums}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTotalPoints" className="mb-3">
              <Form.Label>Total Points</Form.Label>
              <Form.Control
                type="number"
                name="totalPoints"
                value={teamData.totalPoints}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTeamPrincipal" className="mb-3">
              <Form.Label>Team Principal</Form.Label>
              <Form.Control
                type="text"
                name="teamPrincipal"
                value={teamData.teamPrincipal}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTeamManager" className="mb-3">
              <Form.Label>Team Manager</Form.Label>
              <Form.Control
                type="text"
                name="teamManager"
                value={teamData.teamManager}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTechnicalDirector" className="mb-3">
              <Form.Label>Technical Director</Form.Label>
              <Form.Control
                type="text"
                name="technicalDirector"
                value={teamData.technicalDirector}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEngineSupplier" className="mb-3">
              <Form.Label>Engine Supplier</Form.Label>
              <Form.Control
                type="text"
                name="engineSupplier"
                value={teamData.engineSupplier}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTyreSupplier" className="mb-3">
              <Form.Label>Tyre Supplier</Form.Label>
              <Form.Control
                type="text"
                name="tyreSupplier"
                value={teamData.tyreSupplier}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Display selected images in the form */}
            <Form.Group controlId="formriderurl" className="mb-3">
              <Button variant="primary" className="me-2 mt-2" onClick={() => handleOpen(imagesSet1, 0)}>Add Team Bike</Button>
              {teamData.bikeUrl && (
                <img
                  src={teamData.bikeUrl}
                  alt="riderUrl"
                  style={{ width: '125px', height: '212px' }}
                />
              )}
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
