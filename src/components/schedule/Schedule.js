import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import './Schedule.css'; // Ensure that the styling is handled in this CSS file

const Schedule = () => {
    // Example data
    // const sessions = [
    //     { date: '2024-01-03', time: '15:00-15:05', category: 'MotoGP™', session: 'Practice Nr. 2' },
    //     { date: '2024-01-03', time: '16:00-16:35', category: 'MotoGP™', session: 'Qualifying Nr. 1' },
    //     { date: '2024-01-04', time: '15:00-15:05', category: 'MotoGP™', session: 'Tissot Sprint' },
    //     { date: '2024-01-04', time: '16:00-16:35', category: 'MotoGP™', session: 'Best of' },
    //     // Add more sessions for different dates
    // ];
    const [sessions, setSessions] = useState([]);
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch('/api/sessions');
                const data = await response.json();
                const filteredSessions = data.filter(session => session.eventId === selectedEvent.id)
                setSessions(filteredSessions);
            } catch (error) {
                console.error("Error fetching sessions:", error);
            }
        };

        fetchSessions();
    }, []);

    
    

    // Extract unique dates
    const uniqueDates = [...new Set(sessions.map(session => session.sessionDate))];
    useEffect(() =>{
        if(uniqueDates){
            console.log("Unique Dates: ", uniqueDates)
        }
        

    }, [uniqueDates]) // Refetch sessions when selectedEvent changes
    const location = useLocation();
    const selectedEvent = location.state?.selectedEvent;
    
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
                                .filter(session => session.sessionDate === selectedDate)
                                .map((item, index) => (
                                    <tr key={index} class="event-schedule__content-item event-schedule__content-item--finished">
                                        <td>
                                            <div class="event-schedule__content-time">
                                            <div class="event-schedule__content-time-wrapper">
                                                {item.time_start} - {item.time_end}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.category}</td>
                                        <td>{item.sessionName}</td>
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