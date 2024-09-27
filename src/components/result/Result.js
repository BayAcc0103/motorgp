// src/components/result/Result.js
import React, { useState, useEffect } from 'react';
import styles from "./Result.module.css";

const eventsData = [ {
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
},{
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
            "time": "01:30.901",
            "number": "12",
            "fullname": "Luca Marini",
            "flag": "https://static-files.motogp.pulselive.com/assets/flags/it.svg",
            "team": "Mooney VR46 Racing Team"
          },
          {
            "riderId": "650ab8d3f0a21345678901267",
            "position": 2,
            "time": "01:31.234",
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
            "time": "01:29.567",
            "number": "23",
            "fullname": "Enea Bastianini",
            "flag": "https://static-files.motogp.pulselive.com/assets/flags/it.svg",
            "team": "Gresini Racing MotoGP"
          },
          {
            "riderId": "650ab8d3f0a21345678901201",
            "position": 2,
            "time": "01:30.234",
            "number": "5",
            "fullname": "Fabio Quartararo",
            "flag": "https://static-files.motogp.pulselive.com/assets/flags/fr.svg",
            "team": "Yamaha Factory Racing"
          }
        ]
      }
    ]
  }, ];

const Result = () => {
    
    const [selectedEventName, setSelectedEventName] = useState(null);
    const [selectedSessionName, setSelectedSessionName] = useState("RAC");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedCategory, setSelectedCategory] = useState("MotoGP");

   

    //Listening for changes in the selected year and updating the selected event name accordingly
    useEffect(() => {
        setSelectedEventName(filteredEventsbyYear[0]?.name);
      }, [selectedYear]);

      const filteredEventsbyYear = eventsData.filter(event => {
        const eventYear = new Date(event.date).getFullYear().toString(); // Extracting year from the event date
        return eventYear === selectedYear;
    });

    // Function to filter events based on the selected year and category
    const filteredEvents = eventsData.filter(event => {
        const eventDate = new Date(event.date);
        const eventYear = eventDate.getFullYear();
        
        // Check if the year matches
        const yearMatches = selectedYear ? eventYear.toString() === selectedYear : true;

        // Check if the event name matches
        const eventNameMatches = selectedEventName ? event.name.toLowerCase() === selectedEventName.toLowerCase() : true;

        // Filter sessions within the event
        const sessionsFiltered = event.sessions.filter(session => {
            // Check if the category matches
            const categoryMatches = selectedCategory ? session?.category?.toLowerCase() === selectedCategory.toLowerCase() : true;

            // Check if the session name matches
            const sessionNameMatches = selectedSessionName ? session.sessionName.toLowerCase() === selectedSessionName.toLowerCase() : true;

            return categoryMatches && sessionNameMatches;
        });

        // Retain the event if it matches year and name, and has at least one session meeting the criteria
        return yearMatches && eventNameMatches && sessionsFiltered.length > 0;
    });

    
    const filteredYear = eventsData.map(event => new Date(event.date).getFullYear().toString());
    
    // const selectedEvent = filteredEvents.find(event => event._id === selectedEventId);
    // const selectedSession = selectedEvent ? selectedEvent.sessions[selectedSessionIndex] : null;

    return (
        <div>
            <div className={`z-1 position-relative`}>
                <div className={`d-flex position-relative ${styles.primary_filter}`}>
                    <div className={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                        <div className={`position-absolute pe-none ${styles.filter_label}`}>Year</div>
                        <select
                            className={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}
                            value={selectedYear}
                            onChange={e => {
                                setSelectedYear(e.target.value);
                                setSelectedEventName(filteredEventsbyYear[0]?.name); // Reset to first event on year change
                            }}
                        >
                            {[...new Set(filteredYear)].map(year => ( 
                                <option className={`text-dark ${styles.custom_option}`} value={year}>{year}</option>))}
                            {/* <option className={`text-dark ${styles.custom_option}`} value="2024">2024</option>
                            <option className={`text-dark ${styles.custom_option}`} value="2023">2023</option> */}
                        </select>
                    </div>
                    <div className={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                        <div className={`position-absolute pe-none ${styles.filter_label}`}>Event</div>
                        <select
                            className={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}
                            onClick={e => setSelectedEventName(e.target.value)}
                            value={selectedEventName}
                        >
                            {filteredEventsbyYear.map(event => (
                                <option key={event._id} className={`text-dark ${styles.custom_option}`} value={event.name}>
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
                            className={`text-white bg-transparent border-0 w-100                             m-0 ${styles.filter_select} ${styles.custom_select}`}
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

                {filteredEvents[0]?.sessions[0] && (
                    <div className={`d-flex flex-column justify-content-between position-relative w-100 h-auto bg-dark ${styles.hero_container}`}>
                        <div className={`text-white w-75 position-relative ${styles.hero_text}`}>
                            {selectedEventName} - {filteredEvents[0]?.sessions[0].sessionName}
                        </div>
                        <div className={`d-flex align-items-center z-1 ${styles.hero_details_container}`}>
                            <img
                                src={filteredEvents[0]?.location === "Circuito de Jerez"
                                    ? "https://static-files.motogp.pulselive.com/assets/flags/es.svg"
                                    : "https://static-files.motogp.pulselive.com/assets/flags/it.svg"} // Conditional flag based on location
                                alt="Event Flag"
                                className={`${styles.hero_details_flag}`}
                            />
                            <div className={`text-white d-flex align-items-center ${styles.hero_details_location}`}>
                                {filteredEvents[0]?.location}
                            </div>
                        </div>
                    </div>
                )}

                {filteredEvents[0]?.sessions[0] && (
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
                                {filteredEvents[0]?.sessions[0]?.results.map(result => (
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
                )}
            </div>
        </div>
    );
};

export default Result;

