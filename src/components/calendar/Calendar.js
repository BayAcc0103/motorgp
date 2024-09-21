import React, { useState, useEffect } from "react";
import "./Calendar.css";
import flag from './asset/raceflag.png';

const Calendar = () => {
    const [events, setEvents] = useState([
        // {
        //     _id: "66ed9c99a6f6d5927afbf6ab",
        //     id: "ff278afb-ee9a-4237-a70a-ea83eb37a27f",
        //     sponsored_name: "Gran Premio de Aragón",
        //     date_end: "2024-09-01",
        //     date_start: "2024-08-30",
        //     name: "GRAN PREMIO DE ARAGÓN",
        //     season_id: "dd12382e-1d9f-46ee-a5f7-c5104db28e43",
        //     year: 2024,
        //     circuit_name: "MotorLand Aragón",
        //     country_name: "Spain",
        //     flagUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Spain.svg",
        //     trackImageUrl: "https://resources.motogp.pulselive.com/photo-resources/2024/06/06/example-aragon.jpg",
        //     trackLayoutUrl: "https://photos.motogp.com/events-admin/example-aragon-track.svg",
        //     sponsorLogoUrl: "https://example.com/aragon-sponsor-logo.png"
        // },
        // {
        //     _id: "66ed9c99a6f6d5927afbf6ac",
        //     id: "3787fdac-7a1d-4c6f-95f0-76dfdde8b0c6",
        //     sponsored_name: "Motorrad Grand Prix von Österreich",
        //     date_end: "2024-08-18",
        //     date_start: "2024-08-16",
        //     name: "MOTORRAD GRAND PRIX VON ÖSTERREICH",
        //     season_id: "dd12382e-1d9f-46ee-a5f7-c5104db28e43",
        //     year: 2024,
        //     circuit_name: "Red Bull Ring - Spielberg",
        //     country_name: "Austria",
        //     flagUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Flag_of_Austria.svg",
        //     trackImageUrl: "https://resources.motogp.pulselive.com/photo-resources/2024/06/06/example-austria.jpg",
        //     trackLayoutUrl: "https://photos.motogp.com/events-admin/example-austria-track.svg",
        //     sponsorLogoUrl: "https://example.com/austria-sponsor-logo.png"
        // },
        // {
        //     _id: "66ed9c99a6f6d5927afbf6ad",
        //     id: "9e44ac05-9362-4edf-a87a-d4aae85373c1",
        //     sponsored_name: "Monster Energy British Grand Prix",
        //     date_end: "2024-08-04",
        //     date_start: "2024-08-02",
        //     name: "BRITISH GRAND PRIX",
        //     season_id: "dd12382e-1d9f-46ee-a5f7-c5104db28e43",
        //     year: 2024,
        //     circuit_name: "Silverstone Circuit",
        //     country_name: "United Kingdom of Great Britain and Northern Ireland",
        //     flagUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_the_United_Kingdom.svg",
        //     trackImageUrl: "https://resources.motogp.pulselive.com/photo-resources/2024/06/06/example-uk.jpg",
        //     trackLayoutUrl: "https://photos.motogp.com/events-admin/example-uk-track.svg",
        //     sponsorLogoUrl: "https://example.com/uk-sponsor-logo.png"
        // }
    ]);
    
    useEffect(() => {
        const fetchEventData = async () => {
            const response = await fetch('/calendar');
            const data = await response.json();
            setEvents(data);
        };

        fetchEventData();
    }, []);

    if (!events) {
        return <div>Loading...</div>;
    }

        // Group events by month
        const groupedEvents = events.reduce((accumulator, event) => {
            const dateStart = new Date(event.date_start).getMonth() + 1; // Get the month (1-12)
            
            if (!accumulator[dateStart]) {
                accumulator[dateStart] = []; // Create a new array for this month if it doesn't exist
            }
        
            accumulator[dateStart].push(event); // Add the event to the corresponding month
            return accumulator;
        }, {});
        // console.log(groupedEvents);
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
                                    <div key={event.id} className="row row-striped mb-5 mt-3">
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
                                                        <span className="month-component">{new Date(date_start).toLocaleString('en-US', { month: 'short' }).toLocaleUpperCase()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 d-flex flex-column">
                                            <h3 className="text-uppercase"><strong>{event.name}</strong></h3>
                                            <div className="mt-2 d-flex justify-content-left">
                                                <div className="location_flag d-flex">
                                                    <img className="calendar-listing_flag" src={event.flagUrl} alt={`${event.country} flag`} loading="lazy" />
                                                </div>
                                                <div className="location-track-name mt-1">{event.circuit_name}</div>
                                            </div>
                                        </div>
                                        <div className="col-4 position-relative overflow-hidden p-0">
                                            <div className="position-absolute w-100 h-100">
                                                <img src={event.trackImageUrl}
                                                    alt={`${event.title} Background`} loading="lazy"
                                                    className="imgundertrack" />
                                            </div>
                                            <div className="calendar-listing__track-layout w-100 h-100 position-relative">
                                                <img className="calendar-listing__layout position-absolute" src={event.trackLayoutUrl} alt={`${event.circuit_name} track`} loading="lazy" />
                                            </div>
                                            <div className="calendar-listing__sponsor position-absolute d-flex justify-content-center w-100 h-100">
                                                <div className="calendar-listing__sponsor-logo">
                                                    <img src={event.sponsorLogoUrl} alt="Sponsor logo" loading="lazy" />
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
    