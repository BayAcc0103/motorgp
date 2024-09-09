import React, { useState } from 'react';
<<<<<<< Updated upstream
import './AddEvent.css';

=======
import "./AddEvent.css"
>>>>>>> Stashed changes
const AddEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [sponsorPicture, setSponsorPicture] = useState(null);
  const [sponsorPicturePreview, setSponsorPicturePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add event to calendar logic goes here
    console.log('Event added:', eventTitle, eventDate, eventLocation);
    console.log('Sponsor picture:', sponsorPicture);
  };

  const handleSponsorPictureChange = (e) => {
    const file = e.target.files[0];
    setSponsorPicture(file);
    setSponsorPicturePreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Event Title:
          <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Event Date:
          <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </label>
        <br />
        <label>
          Event Location:
          <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
        </label>
        <br />
        <label>
          Sponsor Picture:
          <input type="file" accept="image/*" onChange={handleSponsorPictureChange} />
          {sponsorPicturePreview && (
            <img src={sponsorPicturePreview} alt="Sponsor picture" style={{ width: '100px', height: '100px' }} />
          )}
        </label>
        <br />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;