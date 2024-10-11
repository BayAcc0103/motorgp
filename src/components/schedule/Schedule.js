import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import './Schedule.css'; // Ensure that the styling is handled in this CSS file

const Schedule = () => {
    // Example data
    const sessions = [
        { date: '2024-01-03', time: '15:00-15:05', category: 'MotoGP™', session: 'Practice Nr. 2' },
        { date: '2024-01-03', time: '16:00-16:35', category: 'MotoGP™', session: 'Qualifying Nr. 1' },
        { date: '2024-01-04', time: '15:00-15:05', category: 'MotoGP™', session: 'Tissot Sprint' },
        { date: '2024-01-04', time: '16:00-16:35', category: 'MotoGP™', session: 'Best of' },
        // Add more sessions for different dates
    ];

    // Extract unique dates
    const uniqueDates = [...new Set(sessions.map(session => session.date))];
    const location = useLocation();
    const selectedEvent = location.state?.selectedEvent;
    console.log(selectedEvent)
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
                            class={selectedDate === date ? 'active' : ''}  
                        >
                            {new Date(date).toDateString()} {/* Format date for display */}
                        </button>
                    ))}
                </div>

                <div className="schedule-content">
                    <table>
                        <tbody>
                            {sessions
                                .filter(session => session.date === selectedDate)
                                .map((item, index) => (
                                    <tr key={index} class="event-schedule__content-item event-schedule__content-item--finished">
                                        <td>
                                            <div class="event-schedule__content-time">
                                            <div class="event-schedule__content-time-wrapper">
                                                {item.time}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.category}</td>
                                        <td>{item.session}</td>
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