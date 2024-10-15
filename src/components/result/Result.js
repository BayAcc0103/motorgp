// src/components/result/Result.js
import React, { useState, useEffect } from 'react';
import styles from "./Result.module.css";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const eventsData = [{
    "_id": "650ab8d3f0a2134567890abc",
    "name": "Spanish Grand Prix",
    "location": "Circuito de Jerez",
    "date": "2024-05-01T00:00:00.000Z",
    "sessions": [
        {
            "sessionName": "RAC",
            "sessionDate": "2024-05-01T10:00:00.000Z",
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
            "sessionName": "WUP",
            "sessionDate": "2024-05-02T14:00:00.000Z",
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
    "_id": "650ab8d3f0a2134567890xyz",
    "name": "Italian Grand Prix",
    "location": "Autodromo Nazionale Monza",
    "date": "2024-07-01T00:00:00.000Z",
    "sessions": [
        {
            "sessionName": "SPR",
            "sessionDate": "2024-07-01T10:00:00.000Z",
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
            "sessionName": "RAC",
            "sessionDate": "2024-07-02T14:00:00.000Z",
            "category": "Moto2",
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
}, {
    "_id": "650ab8d3f0a21345678901234",
    "name": "Argentine Grand Prix",
    "location": "Termas de Rio Hondo Circuit",
    "date": "2023-03-01T00:00:00.000Z",
    "sessions": [
        {
            "sessionName": "RAC",
            "sessionDate": "2023-03-01T10:00:00.000Z",
            "category": "MotoGP",
            "results": [
                {
                    "riderId": "650ab8d3f0a21345678901245",
                    "position": 1,
                    "time": "01:30901",
                    "number": "12",
                    "fullname": "Luca Marini",
                    "flag": "https://static-files.motogp.pulselive.com/assets/flags/it.svg",
                    "team": "Mooney VR46 Racing Team"
                },
                {
                    "riderId": "650ab8d3f0a21345678901267",
                    "position": 2,
                    "time": "01:31234",
                    "number": "45",
                    "fullname": "Johann Zarco",
                    "flag": "https://static-files.motogp.pulselive.com/assets/flags/fr.svg",
                    "team": "Pramac Racing"
                }
            ]
        },
        {
            "sessionName": "WUP",
            "sessionDate": "2023-03-02T14:00:00.000Z",
            "category": "MotoGP",
            "results": [
                {
                    "riderId": "650ab8d3f0a21345678901289",
                    "position": 1,
                    "time": "01:29567",
                    "number": "23",
                    "fullname": "Enea Bastianini",
                    "flag": "https://static-files.motogp.pulselive.com/assets/flags/it.svg",
                    "team": "Gresini Racing MotoGP"
                },
                {
                    "riderId": "650ab8d3f0a21345678901201",
                    "position": 2,
                    "time": "01:30234",
                    "number": "5",
                    "fullname": "Fabio Quartararo",
                    "flag": "https://static-files.motogp.pulselive.com/assets/flags/fr.svg",
                    "team": "Yamaha Factory Racing"
                }
            ]
        }
    ]
},];

const Result = () => {

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedSessionName, setSelectedSessionName] = useState("RAC");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedCategory, setSelectedCategory] = useState("MotoGP");
    const [events, setEvents] = useState([]);
    const [results, setResults] = useState([]);
    const [riders, setRiders] = useState([]);

    function convertTime(time) {
        console.log(time);
        const timeParts = time.split(':');
    
        // Check if the provided time format is correct
        if (timeParts.length !== 3) {
            throw new Error('Invalid time format. Expected format: m:s:ms');
        }
    
        const minutes = parseInt(timeParts[0], 10); // Get minutes
        const seconds = parseFloat(timeParts[1], 10); // Get seconds
        const milliseconds = parseFloat(timeParts[2], 10); // Get milliseconds
    
        // Convert total time to milliseconds
        const totalMilliseconds = (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;
    
        return totalMilliseconds;
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/calendar');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        }
        fetchEvents();

    }, [])

    useEffect(() => {
        const fetchRiders = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/riders');
                const data = await response.json();
                setRiders(data);
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        }
        fetchRiders();

    }, [])

    useEffect(() => {
        const filteredEventsByYear = events.filter(event => new Date(event.date_start).getFullYear().toString() === selectedYear);

        if (filteredEventsByYear.length > 0) {
            setSelectedEventId(filteredEventsByYear[0].id);
        }
    }, [selectedYear, events]);


    useEffect(() => {
        const fetchResults = async () => {
            if (!selectedEventId || !selectedSessionName) return;

            try {
                const response = await fetch(`http://localhost:3002/api/result?eventId=${selectedEventId}&sessionName=${selectedSessionName}&category=${selectedCategory}`);

                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        }

        fetchResults();
        console.log(results)

    }, [selectedEventId, selectedSessionName, selectedCategory]);

    const filteredYears = [...new Set(events.map(event => new Date(event.date_start).getFullYear().toString()))];

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
                            {filteredYears.map(year => (
                                <option className={`text-dark ${styles.custom_option}`} key={year} value={year}>{year}</option>
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
                            {events.filter(event => new Date(event.date_start).getFullYear().toString() === selectedYear).map(event => (
                                <option key={event.id} className={`text-dark ${styles.custom_option}`} value={event.id}>
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
                            onChange={e => {
                                setSelectedCategory(e.target.value);
                            }}
                        >
                            <option className={`text-dark ${styles.custom_option}`} value="MotoGP">MotoGP</option>
                            <option className={`text-dark ${styles.custom_option}`} value="Moto2">Moto2</option>
                            <option className={`text-dark ${styles.custom_option}`} value="Moto3">Moto3</option>
                        </select>
                    </div>
                    <div className={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                        <div className={`position-absolute pe-none ${styles.filter_label}`}>Session</div>
                        <select
                            className={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}
                            onChange={e => setSelectedSessionName(e.target.value)}
                            value={selectedSessionName}
                        >
                            <option className={`text-dark ${styles.custom_option}`} value="RAC">RAC</option>
                            <option className={`text-dark ${styles.custom_option}`} value="WUP">WUP</option>
                            <option className={`text-dark ${styles.custom_option}`} value="SPR">SPR</option>
                            <option className={`text-dark ${styles.custom_option}`} value="Q2">Q2</option>
                            <option className={`text-dark ${styles.custom_option}`} value="Q1">Q1</option>
                            <option className={`text-dark ${styles.custom_option}`} value="FP2">FP2</option>
                            <option className={`text-dark ${styles.custom_option}`} value="PR">PR</option>
                            <option className={`text-dark ${styles.custom_option}`} value="FP1">FP1</option>
                        </select>
                    </div>
                </div>

                {selectedSessionName && (
    <div className={`d-flex flex-column justify-content-between position-relative w-100 h-auto bg-dark ${styles.hero_container}`}>
        <div className={`position-absolute w-100 h-100 bg-dark ${styles.hero_image}`}>
            <img alt="Misano MotoGP™ Official Test" src="https://photos.motogp.com/2024/events/background/RSM.png" className={styles.hero_image_img} />
        </div>
        <div className={`text-white w-75 position-relative ${styles.hero_text}`}>
            {events.find(event => event.id === selectedEventId)?.sponsored_name} - {selectedSessionName}
        </div>
        <div className={`d-flex align-items-center z-1 ${styles.hero_details_container}`}>
            <img
                src={events.find(event => event.id === selectedEventId)?.circuit_name === "Circuito de Jerez"
                    ? "https://static-files.motogp.pulselive.com/assets/flags/es.svg"
                    : "https://static-files.motogp.pulselive.com/assets/flags/it.svg"}
                alt="Event Flag"
                className={styles.hero_details_flag}
            />
            <div className={`text-white d-flex align-items-center ${styles.hero_details_location}`}>
                {events.find(event => event.id === selectedEventId)?.circuit_name}
            </div>
        </div>
    </div>
)}



{selectedSessionName && results.length > 0 && (
    <section className={styles.table}>
        <table className={styles.table__table}>
            <thead>
                <tr>
                    <th className={`${styles.table__header_cell} ${styles.table__header_cell__pos}`}>Pos.</th>
                    <th className={`${styles.table__header_cell} ${styles.table__header_cell__points}`}>pts</th>
                    <th className={`${styles.table__header_cell} ${styles.table__header_cell__rider}`}>Rider</th>
                    <th className={`${styles.table__header_cell} ${styles.table__header_cell__team}`}>Team</th>
                    <th className={`${styles.table__header_cell} ${styles.table__header_cell__time}`}>Time</th>
                </tr>
            </thead>
            <tbody className={styles.table__tbody}>
                {results.slice().sort((a, b) => convertTime(a.time) - convertTime(b.time)).map(result => {
                    const rider = riders.find(rider => rider.riderId === result.riderId);
                    return (
                        <tr key={result.riderId} className={styles.table__body_row}>
                            <td className={`${styles.table__body_cell} ${styles.table__body_cell__pos}`}>{result.position}</td>
                            <td className={`text-black-50 fw-bolder ${styles.table__body_cell} ${styles.table__body_cell__pos} u-hide-tablet`}>{result.points}</td>
                            <td className={`${styles.table__body_cell} ${styles.table__body_cell__rider}`}>
                                <div className={`d-flex justify-content-start align-items-center`}>
                                    <div className={styles.rider_image_container}>
                                        {/* Use the image from the rider object */}
                                        {rider ? (
                                            <img src={rider.imageUrl} alt={`Rider ${rider.rider_full_name}`} loading="lazy" />
                                        ) : (
                                            <img src="path/to/placeholder-image.png" alt="Placeholder" loading="lazy" />
                                        )}
                                    </div>
                                    <div className={`d-flex align-items-center justify-content-start ms-auto ${styles.table__rider_name_wrapper}`}>
                                        <div className={styles.table__rider_name}>
                                            <span className={`text-danger ${styles.table__body_cell} ${styles.table__body_cell__number}`}>{result.number}</span>
                                            <span className={`${styles.table__body_cell} ${styles.table__body_cell__full_name}`}>{result.fullname}</span>
                                        </div>
                                        <img src={result.flag} alt={`Rider ${result.fullname}`} loading="lazy" className={styles.table__body_cell_flag} />
                                    </div>
                                </div>
                            </td>
                            <td className={`${styles.table__body_cell} ${styles.table__body_cell__team}`}>{result.team}</td>
                            <td className={`${styles.table__body_cell} ${styles.table__body_cell__time}`}>{result.time}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </section>
)}



                <Link 
    to="/reviewpdf" 
    className="nav-link" 
    aria-current="page" 
    state={{ selectedYear, selectedCategory }}  // Pass selectedYear here
>
    <Button variant="primary">
        Export Admin Results to PDF
    </Button>
</Link>

            </div>
        </div>
    );
};


export default Result;

