import React, { useState, useEffect } from "react";
import "./Calendar.css";
import flag from './asset/raceflag.png';
import { Link, useNavigate } from "react-router-dom";

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate(); // Use navigate for programmatic navigation

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/calendar');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchEventData();
    }, []);

    if (!events.length) {
        return <div>Loading...</div>;
    }

    // Group events by month
    const groupedEvents = events.reduce((accumulator, event) => {
        const dateStart = new Date(event.date_start).getMonth() + 1;

        if (!accumulator[dateStart]) {
            accumulator[dateStart] = [];
        }

        accumulator[dateStart].push(event);
        return accumulator;
    }, {});

    // Handler to navigate to /schedule with the selected event
    const handleEventClick = (event) => {
        navigate("/schedule", { state: { selectedEvent: event } });
    };

    return (
        <>
            <div className="mb-4">
                <div className="container-fluid calendar__container">
                    <div className="calendar__header-container">
                        <h1 className="calendar__title">2024 MotoGP Calendar</h1>
                    </div>
                </div>
                {Object.keys(groupedEvents).map((date_start) => (
                    <div key={new Date(date_start).toLocaleString('en-US', { month: 'short' }).toLocaleUpperCase()} className="mb-5">
                        <header className="mt-3 d-flex align-items-center">
                            <div className="monthrace d-flex align-items-center">
                                <img src={flag} alt="raceflag" className="me-1" />
                                <h1 className="mt-0">{new Date(date_start).toLocaleString('en-US', { month: 'short' }).toLocaleUpperCase()}</h1>
                            </div>
                        </header>
                        <div className="container">
                            {groupedEvents[date_start].map((event) => (
                                <div key={event.id} className="row row-striped mb-5 mt-3 z-n1 event-block" onClick={() => handleEventClick(event)}>
                                    <div className="col-2">
                                        <div className="row justify-content-center">
                                            <div className="col text-center">
                                                <div className="date-component">
                                                    <h1 className="date-num">{new Date(event.date_start).getDate()}</h1>
                                                    <span className="month-component">{new Date(date_start).toLocaleString('en-US', { month: 'short' }).toLocaleUpperCase()}</span>
                                                </div>
                                            </div>
                                            <div className="col text-center">
                                                <div className="date-component">
                                                    <h1 className="date-num">-</h1>
                                                </div>
                                            </div>
                                            <div className="col text-center">
                                                <div className="date-component">
                                                    <h1 className="date-num">{new Date(event.date_end).getDate()}</h1>
                                                    <span className="month-component">{new Date(event.date_end).toLocaleString('en-US', { month: 'short' }).toLocaleUpperCase()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex flex-column">
                                        <h3 className="text-uppercase"><strong>{event.name}</strong></h3>
                                        <div className="mt-2 d-flex justify-content-left">
                                            <div className="location_flag d-flex">
                                                <img className="calendar-listing_flag" src={event.flag_img} alt={`${event.country} flag`} loading="lazy" />
                                            </div>
                                            <div className="location-track-name mt-1">{event.circuit_name}</div>
                                        </div>
                                    </div>
                                    <div className="col-4 position-relative overflow-visible p-0">
                                    <div className="position-absolute w-100 h-100">
                                            <img src={event.circuit_img}
                                                alt={`${event.title} Background`} loading="lazy"
                                                className="imageundertrack" />
                                        </div>
                                        <div className="calendar-listing__track-layout w-100 h-100 position-relative">
                                            <img className="calendar-listing__layout position-absolute"
                                                src={event.circuit_track_img}
                                                alt={`${event.circuit_name} track`} loading="lazy" />
                                        </div>
                                        <div className="calendar-listing__sponcor position-absolute d-flex justify-content-center w-100 h-100">
                                            <div className="calendar-listing__sponsor-logo">
                                                <img src={event.sponsored_img}
                                                    alt="Sponsor logo" loading="lazy" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Calendar;

