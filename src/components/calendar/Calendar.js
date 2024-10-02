import React, { useState, useEffect } from "react";
import "./Calendar.css";
import flag from './asset/raceflag.png';
import { Link } from "react-router-dom";

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
        //     flag_img: "https://static-files.motogp.pulselive.com/assets/flags/qa.svg",
        //     circuit_img: "https://resources.motogp.pulselive.com/photo-resources/2024/06/14/588935d1-100f-47fd-88bc-efd4251c5431/AUT.jpg?height=125&width=412",
        //     circuit_track_img: "https://photos.motogp.com/events-admin/0/c/0c4b819d-6014-4920-877b-ab0a1f3415a3/simple/rsm2.svg",
        //     sponsored_img: "https://resources.motogp.pulselive.com/photo-resources/2024/03/19/51565822-94c9-43a4-a0b3-b3bbabac15b9/sponsor-motul-2.png?width=64"
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
        //     flag_img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Flag_of_Austria.svg",
        //     circuit_img: "https://resources.motogp.pulselive.com/photo-resources/2024/06/06/example-austria.jpg",
        //     circuit_track_img: "https://photos.motogp.com/events-admin/example-austria-track.svg",
        //     sponsored_img: "https://example.com/austria-sponsor-logo.png"
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
        //     flag_img: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_the_United_Kingdom.svg",
        //     circuit_img: "https://resources.motogp.pulselive.com/photo-resources/2024/06/06/example-uk.jpg",
        //     circuit_track_img: "https://photos.motogp.com/events-admin/example-uk-track.svg",
        //     sponsored_img: "https://example.com/uk-sponsor-logo.png"
        // }
    ]);

    useEffect(() => {
        try {
            const fetchEventData = async () => {
                const response = await fetch('http://localhost:3002/api/calendar');
                const data = await response.json();
                setEvents(data);
            };

            fetchEventData();
        }
        catch (error) {
            console.error("Error fetching event data:", error)
        }

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
                        <Link to="/schedule" className="nav-link" aria-current="page">
                            <div className="container">
                                {groupedEvents[date_start].map((event) => (
                                    <div key={event.id} className="row row-striped mb-5 mt-3 z-n1">
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
                        </Link>
                    </div>

                ))}
            </div >

        </>
    );
};

export default Calendar;
