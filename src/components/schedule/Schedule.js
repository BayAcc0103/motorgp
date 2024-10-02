import React, { useState } from 'react';
import './Schedule.css'; // Ensure that the styling is handled in this CSS file

const Schedule = () => {
    // Example data
    const events = [
        { date: '2024-01-03', time: '15:00-15:05', category: 'MotoGP™', event: 'Practice Nr. 2' },
        { date: '2024-01-03', time: '16:00-16:35', category: 'MotoGP™',  event: 'Qualifying Nr. 1'},
        { date: '2024-01-04', time: '15:00-15:05', category: 'MotoGP™', event: 'Tissot Sprint' },
        { date: '2024-01-04', time: '16:00-16:35', category: 'MotoGP™', event: 'Best of' },
        // Add more events for different dates
    ];

    // Extract unique dates
    const uniqueDates = [...new Set(events.map(event => event.date))];

    const [selectedDate, setSelectedDate] = useState(uniqueDates[0]); // Initially select the first date

    // Add Saturday, Sunday similarly
return (
    <>
        <div className="mb-4">
            <div className="container-fluid calendar__container">
                <div className="calendar__header-container">
                    <h1 className="calendar__title">Schedule</h1>
                </div>
            </div>
        </div>
        <div className="schedule-container">
            <div className="days-tab">
                {uniqueDates.map((date) => (
                    <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={selectedDate === date ? 'active' : ''}
                    >
                        {new Date(date).toDateString()} {/* Format date for display */}
                    </button>
                ))}
            </div>

            <div className="schedule-content">
                <div className="header">
                    <h2>Schedule for {new Date(selectedDate).toDateString()}</h2>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Category</th>
                            <th>Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events
                            .filter(event => event.date === selectedDate)
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{item.time}</td>
                                    <td>{item.category}</td>
                                    <td>{item.event}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
);
};

export default Schedule;