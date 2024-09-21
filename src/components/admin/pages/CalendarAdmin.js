import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import './Account.css';
import { Dialog, DialogTitle, DialogContent, Grid } from "@mui/material";

const CalendarAdmin = () => {
  const [events, setEvents] = useState([
    // { id: 1, sponcorname: 'Sponsor 1', dateend: '12/1/2024', datestart: '11/9/2024', name: 'Racer 1',season_id: '1', circuitname: 'Inferno', countryname: 'USA' },
    // { id: 2, sponcorname: 'Sponsor 2', dateend: '12/1/2024', datestart: '11/9/2024', name: 'Racer 2',season_id: '1', circuitname: 'Twin Tower', countryname: 'USA' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [eventData, setEventData] = useState({ sponsored_name: '', date_start: '', date_end: '', name: '', season_id: '', circuit_name: '', country_name: '' });
  const [changesSaved, setChangesSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]); // New state for selected events


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/calendar'); // Fetch events from backend
        const eventsData = await response.json(); // Parse the JSON response
        setEvents(eventsData); // Set the events into state, including their UUIDs
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); // Call the function when the component mounts
  }, []);

  // Handle showing the modal
  const handleShowAdd = () => {
    setShowModal(true);
    setOnEdit(false);
    setEventData({ sponsored_name: '', date_start: '', date_end: '', name: '', season_id: '', circuit_name: '', country_name: '' });
  };

  const handleShowEdit = () => {
    if (currentEventId) {
      const selectedEvent = events.find((event) => event.id === currentEventId);
      setEventData({
        sponsored_name: selectedEvent.sponsored_name,
        date_start: selectedEvent.location,
        date_end: selectedEvent.date_end,
        name: selectedEvent.name,
        season_id: selectedEvent.season_id,
        circuit_name: selectedEvent.circuit_name,
        country_name: selectedEvent.country_name
      });
      setOnEdit(true);
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
    setHasUnsavedChanges(true);
  };

  // Handle adding or editing an event
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (onEdit) {
      // Editing an existing event
      setEvents(events.map((event) => (event.id === currentEventId ? { ...event, ...eventData } : event)));

    } else {
      // Adding a new event
      setEvents([...events, { ...eventData, id: uuidv4(), isNew: true }]); // Generate UUID here
    }

    handleClose();
    setHasUnsavedChanges(true); // Mark as unsaved changes
  };

  const handleRowClick = (event) => {
    setCurrentEventId(event.id);
    console.log(event.id);
  };

  // const deleteEvent = () => {
  //   if (currentEventId) {
  //     setEvents(
  //       events.map((event) =>
  //         event.id === currentEventId ? { ...event, isDeleted: true } : event
  //       )
  //     );
  //     setCurrentEventId(null);
  //     setHasUnsavedChanges(true);
  //   }
  // };
  const handleSelectEvent = (id) => {
    setSelectedEvents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((eventId) => eventId !== id)
        : [...prevSelected, id]
    );
  };
  const deleteSelectedEvents = () => {
    setEvents(events.map(event =>
      selectedEvents.includes(event.id) ? { ...event, isDeleted: true } : event
    ));
    setSelectedEvents([]); // Clear the selected events after deletion
    setHasUnsavedChanges(true);
  };

  // Handle saving changes
  const handleSave = async () => {
    try {
      // Loop through all events and send updates to the backend
      for (const event of events) {
        console.log(JSON.stringify(event));
        if (event.isNew) {
          // If the event is new, POST it to the backend
          await fetch('/calendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
          });
        } else if (event.isDeleted) {
          // If the event is deleted, delete it from the backend
          await fetch(`/calendar/${event.id}`, {
            method: 'DELETE',
          });
        }
        else {
          // Otherwise, update the event via PUT using its UUID
          await fetch(`/calendar/${event.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
          });
        }
      }

      // Optionally, re-fetch the updated list of events from the backend after save
      const response = await fetch('/calendar');
      const updatedEvents = await response.json();
      setEvents(updatedEvents);

      setChangesSaved(true);
      setHasUnsavedChanges(false); // Reset the unsaved changes flag
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };


  //xử lí ảnh 
  const [open, setOpen] = useState(false);
  const [currentImageSet, setCurrentImageSet] = useState([]);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);


  const imagesSet1 = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150/0000FF",
    "https://via.placeholder.com/150/FF0000",
    "https://via.placeholder.com/150/00FF00",
  ];

  const imagesSet2 = [
    "https://via.placeholder.com/150/FFFF00",
    "https://via.placeholder.com/150/00FFFF",
    "https://via.placeholder.com/150/FF00FF",
    "https://via.placeholder.com/150/000000",
  ];
  const imagesSet3 = [
    "https://via.placeholder.com/150/FFFF00",
    "https://via.placeholder.com/150/00FFFF",
    "https://via.placeholder.com/150/FF00FF",
    "https://via.placeholder.com/150/000000",
  ];
  const imagesSet4 = [
    "https://via.placeholder.com/150/FFFF00",
    "https://via.placeholder.com/150/00FFFF",
    "https://via.placeholder.com/150/FF00FF",
    "https://via.placeholder.com/150/000000",
  ];
  const handleOpen = (images, index) => {
    setCurrentImageSet(images);
    setCurrentImageIndex(index);
    setOpen(true);
  };
  const handleClose1 = () => {
    setOpen(false);
  };

  const handleImageSelect = (image) => {
    if (currentImageIndex === 0) {
      setSelectedImage1(image);
    } else if (currentImageIndex === 1) {
      setSelectedImage2(image);
    }
    else if (currentImageIndex === 2) {
      setSelectedImage3(image);
    }
    else if (currentImageIndex === 3) {
      setSelectedImage4(image);
    }

    handleClose1();
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

      {/* Image selection dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select an Image</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {currentImageSet.map((image, index) => (
              <Grid item xs={3} key={index}>
                <img
                  src={image}
                  alt={`img-${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    cursor: "pointer",
                    border: (currentImageIndex === 0 && selectedImage1 === image) || (currentImageIndex === 1 && selectedImage2 === image) || (currentImageIndex === 2 && selectedImage3 === image) || (currentImageIndex === 3 && selectedImage4 === image) ? "2px solid blue" : "none",
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
            <th>Sponsored name</th>
            <th>Date start</th>
            <th>Date end</th>
            <th>Name</th>
            <th>Season_id</th>
            <th>Circuit name</th>
            <th>Country name</th>
            <th>Image1</th>
            <th>Image2</th>
            <th>Image3</th>
            <th>Image4</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              key={event.id}
              onClick={() => handleRowClick(event)}
              style={{ cursor: 'pointer', backgroundColor: event.isDeleted ? 'red' : (event.id === currentEventId ? '#f0f8ff' : '') }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedEvents.includes(event.id)}
                  onChange={() => handleSelectEvent(event.id)}
                />
              </td>
              <td>{event.id}</td>
              <td>{event.sponsored_name}</td>
              <td>{event.date_start}</td>
              <td>{event.date_end}</td>
              <td>{event.name}</td>
              <td>{event.season_id}</td>
              <td>{event.circuit_name}</td>
              <td>{event.country_name}</td>
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
          disabled={!currentEventId}
          onClick={handleShowEdit}>
          Edit
        </Button>
        <Button
          variant="danger"
          disabled={!currentEventId}
          onClick={deleteSelectedEvents}>
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

      {/* Add/Edit Event Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Edit Event' : 'Add New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formsponcorname" className="mb-3">
              <Form.Label>Sponsored name</Form.Label>
              <Form.Control
                type="text"
                name="sponsored_name"
                value={eventData.sponsored_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formdatestart" className="mb-3">
              <Form.Label>Date Start</Form.Label>
              <Form.Control
                type="text"
                name="date_start"
                value={eventData.date_start}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formdateend" className="mb-3">
              <Form.Label>Date End</Form.Label>
              <Form.Control
                type="text"
                name="date_end"
                value={eventData.date_end}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formname" className="mb-3">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formseasonid" className="mb-3">
              <Form.Label>season_id</Form.Label>
              <Form.Control
                type="text"
                name="season_id"
                value={eventData.season_id}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formcircuitname" className="mb-3">
              <Form.Label>Circuit name</Form.Label>
              <Form.Control
                type="text"
                name="circuit_name"
                value={eventData.circuit_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formcountryname" className="mb-3">
              <Form.Label>Country name</Form.Label>
              <Form.Control
                type="text"
                name="country_name"
                value={eventData.country_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formcountryflag" className="mb-3">
              <Button variant="primary" className="me-2 mt-2" onClick={() => handleOpen(imagesSet1, 0)}>Thêm ảnh 1</Button>
              {selectedImage1 && (
                <img
                  src={selectedImage1}
                  alt="Racer 1"
                  style={{ width: '412px', height: '125px' }}
                />
              )}
            </Form.Group>
            <Form.Group controlId="formcountryflag" className="mb-3">
              <Button variant="primary" className="me-2 mt-2" onClick={() => handleOpen(imagesSet2, 1)}>Thêm ảnh 2</Button>
              {selectedImage2 && (
                <img
                  src={selectedImage2}
                  alt="Racer 1"
                  style={{ width: '2.7rem', height: '1.8rem' }}
                />
              )}
            </Form.Group>
            <Form.Group controlId="formcountryflag" className="mb-3">
              <Button variant="primary" className="me-2 mt-2" onClick={() => handleOpen(imagesSet3, 2)}>Thêm ảnh 3</Button>
              {selectedImage3 && (
                <img
                  src={selectedImage3}
                  alt="Racer 1"
                  style={{ width: '412px', height: '125px' }}
                />
              )}
            </Form.Group>
            <Form.Group controlId="formcountryflag" className="mb-3">
              <Button variant="primary" className="me-2 mt-2" onClick={() => handleOpen(imagesSet4, 3)}>Thêm ảnh 4</Button>
              {selectedImage4 && (
                <img
                  src={selectedImage4}
                  alt="Racer 1"
                  style={{ width: '412px', height: '125px' }}
                />
              )}
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

export default CalendarAdmin;
