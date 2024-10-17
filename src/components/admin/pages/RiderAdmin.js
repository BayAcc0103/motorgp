import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import './Account.css';
import { Dialog, DialogTitle, DialogContent, Grid, DialogActions } from "@mui/material";

const RiderAdmin = () => {
  const [riderUrl, setRiderUrl] = useState(''); // State for rider image URL
  const [imageUrl, setImageUrl] = useState(''); // State for team image URL
  const [error, setError] = useState(''); // State for error messages
  const [teams, setTeams] = useState([]); // State for available teams, bullshit stuff for ref
  const [riders, setRiders] = useState([]); // State for riders
  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [currentRiderId, setCurrentRiderId] = useState(null);
  const [riderData, setRiderData] = useState({
    name: '',
    driverNb: '',
    teamId: '',
    constructor_name: '',
    rider_country_iso: '',
    year: '',
    totalPoints: 0,
    position: 0,
    team_color: '',
    text_color: '',
    riderUrl: '',
    imageUrl: '',
  });
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedRiders, setSelectedRiders] = useState([]); // State for selected riders

  // useEffect hook to perform side effects in the functional component
  useEffect(() => {
    // Define an asynchronous function to fetch riders
    const fetchRiders = async () => {
      try {
        // Send a GET request to the backend to fetch riders data
        const response = await fetch('http://localhost:3002/api/riders');
        // Parse the JSON response from the server
        const ridersData = await response.json();
        // Set the fetched riders data into the state
        setRiders(ridersData);
      } catch (error) {
        // Log any errors that occur during fetching
        setError('Thằng nào quên bật backend lên rồi');
        alert("Backend is not responding, please contact adminstration!");
        console.error('Error fetching riders:', error);
      }
    };

    // Call the fetchRiders function when the component mounts
    fetchRiders();


    // Fetching image to useState for storing
    const fetchImages = async (category) => {
      try {
        const response = await fetch(`http://localhost:3002/api/defaultImages/${category}`); // Fetch images from category
        const imagesData = await response.json(); // Parse the JSON response

        // Extract imageUrl from the response and set the respective state
        const urls = imagesData.map(image => image.imageUrl); // Map to get imageUrl
        switch (category) {
          case 'riderImage':
            setRiderUrl(urls); // Lù mé chỉnh nhiều vãi
            break;
          case 'flagImage':
            setImageUrl(urls); // Lù mé chỉnh nhiều 
            break;
          default:
            console.warn(`Unknown image category: ${category}`);
            break;
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages('riderImage');
    fetchImages('flagImage');
  }, []);

  //Getting all team data from backend for dropdown list
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/teams');
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        alert('Error fetching teams:', error);
      }
    };
  
    fetchTeams();
  }, []);


 
    

  // Handle showing the modal for adding a rider
  const handleShowAdd = () => {
    setShowModal(true); 
    setOnEdit(false);
    setRiderData({ 
      name: '',
      driverNb: '',
      teamId: '', 
      constructor_name: '', 
      rider_country_iso: '', 
      year: '', 
      totalPoints: 0, 
      position: 0, 
      team_color: '', 
      text_color: '',
      riderUrl: '', 
      imageUrl: ''
      });
  };


  // Handle showing the modal for editing a rider
  const handleShowEdit = () => {
    if (currentRiderId) {
      // Find the rider object in the 'riders' array that matches the currently selected rider ID
      const selectedRider = riders.find((rider) => rider.id === currentRiderId);
      setRiderData(selectedRider);
      setOnEdit(true);
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);

  // Handle form changes
  const handleInputChange = (e) => { //e is the event object that is automatically passed to the event handler function when an event occurs, such as a form submission or a button click.
    const { name, value } = e.target; // Extracting name and value from the input
    //Fuction take e as parameter,name as attribute of the input field, value as current value of the input field that the user has entered.
    setRiderData({ ...riderData, [name]: value }); // Update riderData with the new value, 
    //...riderData is used to keep the existing data intact and only update the specific field that has changed.(spread operator)
    setHasUnsavedChanges(true); // Indicate that unsaved changes exist
  };


  // Handle adding or editing a rider
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (onEdit) {
      // Editing an existing rider
      setRiders(riders.map((rider) => 
        rider.id === currentRiderId ? { ...rider, ...riderData, isEdited: true } : rider));
    } else {
      // Adding a new rider
      setRiders([...riders, { ...riderData, id: uuidv4(), isNew: true }]); // Generate UUID here and mark as new
    }

    handleClose();
    setHasUnsavedChanges(true); // Mark as unsaved changes
  };

  const handleRowClick = (rider) => {
    setCurrentRiderId(rider.id);
  };

  // Function to handle the selection of a rider by their ID
  const handleSelectRider = (id) => {
    // Update the selectedRiders state based on whether the rider ID is already selected
    setSelectedRiders((prevSelected) =>
      // Check if the current rider ID is already in the list of selected riders
      prevSelected.includes(id)
        ? // If it is selected, filter it out from the selected riders
          prevSelected.filter((riderId) => riderId !== id)
        : // If it is not selected, add it to the list of selected riders
          [...prevSelected, id]
    );
  };

  // const deleteSelectedRiders = () => {
  //   setRiders(riders.filter(rider => !selectedRiders.includes(rider.id))); // Remove selected riders
  //   //setSelectedRiders([]); // Clear the selected riders after deletion
  //   setHasUnsavedChanges(true);
  // };

  const deleteSelectedRiders = () => {
    setRiders(riders.map(rider => selectedRiders.includes(rider.id) ? { ...rider, isDeleted: true } : rider)); // Mark selected riders as deleted
    setSelectedRiders([]); // Clear the selected riders after deletion
    setHasUnsavedChanges(true);
  };

  // Handle saving changes
  const handleSave = async () => {
    try {
      for (const rider of riders) {
        if (rider.isNew) {
          // If the rider is new, POST it to the backend
          await fetch('http://localhost:3002/api/riders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rider),
            });
            //alert('New rider added:', rider);
        } else if (rider.isDeleted) {
          // If the rider is marked as deleted, DELETE it from the backend
          await fetch(`http://localhost:3002/api/riders/${rider.id}`, {
            method: 'DELETE',
          });
          //alert('Rider deleted:', rider);
        } else if(rider.isEdited) { // Check if the rider has been edited
          // Otherwise, update the rider using a PUT request
          await fetch(`http://localhost:3002/api/riders/${rider.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rider),
          });
          //alert('Rider updated:', rider);
        }
      }

      // Re-fetch the updated list of riders from the backend after saving
      const response = await fetch('http://localhost:3002/api/riders');
      const updatedRiders = await response.json();
      setRiders(updatedRiders);

      setChangesSaved(true);
      setHasUnsavedChanges(false); // Reset the unsaved changes flag
    } catch (error) {
      console.error('Error saving riders:', error);
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
   const imagesSet1 = riderUrl;
   const imagesSet2 = imageUrl;
   const handleOpen = (images, index) => {
     setCurrentImageSet(images);
     setCurrentImageIndex(index);
     setOpen(true);
   };
 

     // Modal form for image selection
  const handleImageSelect = (image) => {
    const updatedRidertData = { ...riderData };  // Create a copy of riderData
    if (currentImageIndex === 0) {
      updatedRidertData.riderUrl = image; // Save image1
    } else if (currentImageIndex === 1) {
      updatedRidertData.imageUrl = image; // Save image2
    }
    setRiderData(updatedRidertData);
    handleClose1();
  };
  
  const [imagesData, setImagesData] = useState([]);

  return (
    <div className="account-container d-flex flex-column justify-content-center align-items-center min-vh-100">
      {/*Showing error message if there is any error */}
      {error && <Alert variant="danger">{error}</Alert>}

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

      {/* Table */}
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>driverNb</th>
            <th>Team ID</th>
            <th>Constructor Name</th>
            <th>Country</th>
            <th>Year</th>
            <th>Total Points</th>
            <th>Position</th>
            <th>Rider Image</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {/* Add red background for deleted riders */}
          {riders.map((rider) => (
            <tr
              key={rider.id}
              onClick={() => handleRowClick(rider)}
              style={{ cursor: 'pointer', 
                backgroundColor: rider.id === currentRiderId ? '#f0f8ff' : '' ,
                backgroundColor: rider.isDeleted ? 'red' : (rider.id === currentRiderId ? '#f0f8ff' : '')
              }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRiders.includes(rider.id)}
                  onChange={() => handleSelectRider(rider.id)}
                />
              </td>
              <td>{rider.id}</td>
              <td>{rider.name}</td>
              <td>{rider.driverNb}</td>
              <td>{rider.teamId}</td>
              <td>{rider.constructor_name}</td>
              <td>{rider.rider_country_iso}</td>
              <td>{rider.year}</td>
              <td>{rider.totalPoints}</td>
              <td>{rider.position}</td>
              <td>
                <img src={rider.riderUrl} alt={rider.name} style={{ width: '150px', height: 'auto' }} />
              </td>
              <td>
                <img src={rider.imageUrl} alt={rider.name} style={{ width: '50px', height: 'auto' }} />
              </td>

            </tr>
          ))}
        </tbody>
      </Table>

      {/* Buttons */}
      {/* <div className="button-group mt-4 d-flex justify-content-center">
        <Button variant="primary" onClick={handleShowAdd}>Add</Button>
        <Button
          variant="success"
          className="mx-2"
          disabled={!currentRiderId}
          onClick={handleShowEdit}>
          Edit
        </Button>
        <Button
          variant="danger"
          disabled={!currentRiderId}
          onClick={deleteSelectedRiders}>
          Delete
        </Button>
        <Button
          variant="info"
          className="mx-2"
          onClick={handleSave}
          disabled={!hasUnsavedChanges}>
          Save
        </Button>
      </div> */}

      {/* Buttons */}
      <div className="floating-button-group">
        <div className="button-group mt-4">
          <Button variant="primary" onClick={handleShowAdd}>Add</Button>
          <Button
            variant="success"
            className="mx-2"
            disabled={!currentRiderId}
            onClick={handleShowEdit}>
            Edit
          </Button>
          <Button
            variant="danger"
            disabled={!currentRiderId}
            onClick={deleteSelectedRiders}>
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
      </div>


      {/* Add/Edit Rider Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Rider' : 'Add New Rider'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formRiderName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={riderData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRiderDriverNb" className="mb-3">
              <Form.Label>driverNumber</Form.Label>
              <Form.Control
                type="text"
                name="driverNb"
                value={riderData.driverNb}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {/* <Form.Group controlId="formTeamId" className="mb-3">
              <Form.Label>Team ID</Form.Label>
              <Form.Control
                type="text"
                name="teamId"
                value={riderData.teamId}
                onChange={handleInputChange}
                required
              />
            </Form.Group> */}

            <Form.Group controlId="formTeamId" className="mb-3">
              <Form.Label>Team</Form.Label>
              <Form.Control
                as="select"
                name="teamId"
                value={riderData.teamId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Team</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>{team.name}</option> 
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formConstructorName" className="mb-3">
              <Form.Label>Constructor Name</Form.Label>
              <Form.Control
                type="text"
                name="constructor_name"
                value={riderData.constructor_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCountry" className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="rider_country_iso"
                value={riderData.rider_country_iso}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formYear" className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={riderData.year}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTotalPoints" className="mb-3">
              <Form.Label>Total Points</Form.Label>
              <Form.Control
                type="number"
                name="totalPoints"
                value={riderData.totalPoints}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPosition" className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="number"
                name="position"
                value={riderData.position}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTeamColor" className="mb-3">
              <Form.Label>Team Color</Form.Label>
              <Form.Control
                type="text"
                name="team_color"
                value={riderData.team_color}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formTextColor" className="mb-3">
              <Form.Label>Text Color</Form.Label>
              <Form.Control
                type="text"
                name="text_color"
                value={riderData.text_color}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={riderData.imageUrl}
                onChange={handleInputChange}
                required
              />
            </Form.Group> */}

            {/* Display selected images in the form */}
            <Form.Group controlId="formriderurl" className="mb-3">
              <Button variant="primary" className="me-2 mt-2" onClick={() => handleOpen(imagesSet1, 0)}>Add Rider Image</Button>
              {riderData.riderUrl && (
                <img
                  src={riderData.riderUrl}
                  alt="riderUrl"
                  style={{ width: '412px', height: '125px' }}
                />
              )}
            </Form.Group>
            <Form.Group controlId="formimageurl" className="mb-3">
              <Button variant="primary" className="me-2 mt-2" onClick={() => handleOpen(imagesSet2, 1)}>Add Image URL</Button>
              {riderData.imageUrl && (
                <img
                  src={riderData.imageUrl}
                  alt="image_url"
                  style={{ width: '412px', height: '125px' }}
                />
              )}
            </Form.Group>


            <Button variant="primary" type="submit">
              {onEdit ? 'Save Changes' : 'Add Rider'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RiderAdmin;

