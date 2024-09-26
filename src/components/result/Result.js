import React, { useState } from 'react';
import styles from "./Result.module.css";

const eventsData = [
    {
        "_id": "650ab8d3f0a2134567890abc",
        "name": "Spanish Grand Prix",
        "location": "Circuito de Jerez",
        "year": "2024",
        "sessions": [
            {
                "sessionName": "Free Practice 1",
                "category": "MotoGP",
                "results": [
                    {
                        "riderId": "650ab8d3f0a2134567890def",
                        "position": 1,
                        "time": "01:32.456",
                        "number": "93",
                        "fullname": "Marc Marquez",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/es.svg",
                        "team": "Repsol Honda Team",
                    },
                    {
                        "riderId": "650ab8d3f0a2134567890ghi",
                        "position": 2,
                        "time": "01:33.789",
                        "number": "46",
                        "fullname": "Valentino Rossi",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/it.svg",
                        "team": "Petronas Yamaha SRT",
                    }
                ]
            },
            {
                "sessionName": "Qualifying",
                "category": "MotoGP",
                "results": [
                    {
                        "riderId": "650ab8d3f0a2134567890jkl",
                        "position": 1,
                        "time": "01:31.123",
                        "number": "36",
                        "fullname": "Francesco Bagnaia",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/it.svg",
                        "team": "Ducati Lenovo Team",
                    },
                    {
                        "riderId": "650ab8d3f0a2134567890mno",
                        "position": 2,
                        "time": "01:31.789",
                        "number": "42",
                        "fullname": "Alex Marquez",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/es.svg",
                        "team": "LCR Honda",
                    }
                ]
            }
        ]
    },
    {
        "_id": "650ab8d3f0a2134567890",
        "name": "Spanish Grand",
        "location": "Circuito de Jerez",
        "year": "2024",
        "sessions": [
            {
                "sessionName": "Free Practice 1",
                "category": "MotoGP",
                "results": [
                    {
                        "riderId": "650ab8d3f0a2134567890def",
                        "position": 1,
                        "time": "01:32.456",
                        "number": "9",
                        "fullname": "Marc Marquez",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/es.svg",
                        "team": "Repsol Honda",
                    },
                    {
                        "riderId": "650ab8d3f0a2134567890ghi",
                        "position": 2,
                        "time": "01:33.789",
                        "number": "46",
                        "fullname": "Valentino Rossi",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/it.svg",
                        "team": "Petronas Yamaha SRT",
                    }
                ]
            },
            {
                "sessionName": "Qualifying",
                "category": "MotoGP",
                "results": [
                    {
                        "riderId": "650ab8d3f0a2134567890jkl",
                        "position": 1,
                        "time": "01:31.123",
                        "number": "36",
                        "fullname": "Francesco Bagnaia",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/it.svg",
                        "team": "Ducati Lenovo Team",
                    },
                    {
                        "riderId": "650ab8d3f0a2134567890mno",
                        "position": 2,
                        "time": "01:31.789",
                        "number": "42",
                        "fullname": "Alex Marquez",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/es.svg",
                        "team": "LCR Honda",
                    }
                ]
            },
        ]
    },
    {
        "_id": "650ab8d3f0a2134567890xyz",
        "name": "Italian Grand Prix",
        "location": "Autodromo Nazionale Monza",
        "year": "2023",
        "sessions": [
            {
                "sessionName": "Free Practice 1",
                "category": "MotoGP",
                "results": [
                    {
                        "riderId": "650ab8d3f0a2134567890aaa",
                        "position": 1,
                        "time": "01:35.123",
                        "number": "94",
                        "fullname": "Fabio Quartararo",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/fr.svg",
                        "team": "Yamaha Factory Racing",
                    },
                    {
                        "riderId": "650ab8d3f0a2134567890bbb",
                        "position": 2,
                        "time": "01:36.456",
                        "number": "5",
                        "fullname": "Johann Zarco",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/fr.svg",
                        "team": "Pramac Racing",
                    }
                ]
            },
            {
                "sessionName": "Qualifying",
                "category": "MotoGP",
                "results": [
                    {
                        "riderId": "650ab8d3f0a2134567890ccc",
                        "position": 1,
                        "time": "01:34.123",
                        "number": "21",
                        "fullname": "Franco Morbidelli",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/it.svg",
                        "team": "Yamaha Factory Racing",
                    },
                    {
                        "riderId": "650ab8d3f0a2134567890ddd",
                        "position": 2,
                        "time": "01:35.789",
                        "number": "73",
                        "fullname": "Enea Bastianini",
                        "flag": "https://static-files.motogp.pulselive.com/assets/flags/it.svg",
                        "team": "Gresini Racing MotoGP",
                    }
                ]
            }
        ]
    }
];

const Result = () => {
    const [selectedEventId, setSelectedEventId] = useState(eventsData[0]._id);
    const [selectedSessionIndex, setSelectedSessionIndex] = useState(0);
    const [selectedYear, setSelectedYear] = useState("2024");
    const [selectedCategory, setSelectedCategory] = useState("MotoGP");
    // Filter events based on selected year
    const filteredEvents = eventsData.filter(event => event.year === selectedYear);

    // If there are no filtered events, fallback to first event
    const selectedEvent = filteredEvents.length > 0
        ? filteredEvents.find(event => event._id === selectedEventId) || filteredEvents[0]
        : eventsData[0];

    const selectedSession = selectedEvent.sessions[selectedSessionIndex];

    return (
        <div>
            <div className={`z-1 position-relative`}>
                <div className={`d-flex position-relative ${styles.primary_filter}`}>
                    <div className={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                        <div className={`position-absolute pe-none ${styles.filter_label}`}>Year</div>
                        <select
                            className={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}
                            value={selectedYear}
                            onChange={e => setSelectedYear(e.target.value)}
                        >
                            {/* Generate unique year options */}
                            {[...new Set(eventsData.map(event => event.year))].map(year => (
                                <option key={year} className={`text-dark ${styles.custom_option}`} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                        <div className={`position-absolute pe-none ${styles.filter_label}`}>Event</div>
                        <select
                            className={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}
                            value={selectedEventId}
                            onChange={e => setSelectedEventId(e.target.value)}
                        >
                            {filteredEvents.map(event => (
                                <option key={event._id} className={`text-dark ${styles.custom_option}`} value={event._id}>
                                    {event.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                        <div className={`position-absolute pe-none ${styles.filter_label}`}>Category</div>
                        <select
                            className={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                        >
                            {selectedEvent.sessions.map((session, index) => (
                                <option key={index} className={`text-dark ${styles.custom_option}`} value={index}>{session.category}</option>
                            ))}
                        </select>
                    </div>
                    <div className={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                        <div className={`position-absolute pe-none ${styles.filter_label}`}>Session</div>
                        <select
                            className={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}
                            value={selectedSessionIndex}
                            onChange={e => setSelectedSessionIndex(e.target.value)}
                        >
                            {selectedEvent.sessions.map((session, index) => (
                                <option key={index} className={`text-dark ${styles.custom_option}`} value={index}>
                                    {session.sessionName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={`d-flex flex-column justify-content-between position-relative w-100 h-auto bg-dark ${styles.hero_container}`}>
                    <div className={`text-white w-75 position-relative ${styles.hero_text}`}>
                        {selectedEvent.name} - {selectedSession.sessionName}
                    </div>
                    <div className={`d-flex align-items-center z-1 ${styles.hero_details_container}`}>
                        <img
                            src={selectedEvent.location === "Circuito de Jerez" ? "https://static-files.motogp.pulselive.com/assets/flags/es.svg"
                                : "https://static-files.motogp.pulselive.com/assets/flags/it.svg"} // Conditional flag based on location
                            alt="Event Flag"
                            className={`${styles.hero_details_flag}`}
                        />
                        <div className={`text-white d-flex align-items-center ${styles.hero_details_location}`}>
                            {selectedEvent.location}
                        </div>
                    </div>
                </div>

                <section className={`${styles.table}`}>
                    <table className={`${styles.table__table}`}>
                        <thead>
                            <tr>
                                <th className={`${styles.table__header_cell} ${styles.table__header_cell__pos}`}>Pos.</th>
                                <th className={`${styles.table__header_cell} ${styles.table__header_cell__time}`}>Time</th>
                                <th className={`${styles.table__header_cell} ${styles.table__header_cell__rider}`}>Rider</th>
                                <th className={`${styles.table__header_cell} ${styles.table__header_cell__team}`}>Team</th>
                            </tr>
                        </thead>
                        <tbody className={`${styles.table__tbody}`}>
                            {selectedSession.results.map(result => (
                                <tr key={result.riderId} className={`${styles.table__body_row}`}>
                                    <td className={`${styles.table__body_cell} ${styles.table__body_cell__pos}`}>{result.position}</td>
                                    <td className={`${styles.table__body_cell} ${styles.table__body_cell__time}`}>{result.time}</td>
                                    <td className={`${styles.table__body_cell} ${styles.table__body_cell__rider}`}>
                                        <div className={`d-flex justify-content-start align-items-center`}>
                                            <div className={`${styles.rider_image_container}`}>
                                                <img
                                                    src={result.flag}
                                                    alt={`Rider ${result.fullname}`}
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className={`d-flex align-items-center justify-content-start ms-auto ${styles.table__rider_name_wrapper}`}>
                                                <div className={`${styles.table__rider_name}`}>
                                                    <span className={`text-danger ${styles.table__body_cell} ${styles.table__body_cell__number}`}>{result.number}</span>
                                                    <span className={`${styles.table__body_cell} ${styles.table__body_cell__full_name}`}>{result.fullname}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`${styles.table__body_cell} ${styles.table__body_cell__team}`}>{result.team}</td>
                                </tr>  
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default Result;
