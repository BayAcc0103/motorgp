import React, { useState } from 'react';
import "./AddEvent.css"
const AddEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add event to calendar logic goes here
    console.log('Event added:', eventTitle, eventDate, eventLocation);
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
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;