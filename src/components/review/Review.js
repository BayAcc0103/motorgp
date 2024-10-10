import React, { useState, useEffect } from 'react';
import './Review.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Table } from 'react-bootstrap';
import logofim from './asset/logofim.png';
import logomotorgp from './asset/logomotorgp.png';
import logotissot from './asset/logotissot.png';
import { useLocation } from 'react-router-dom';

const ReviewPDF = () => {
    const [events, setEvents] = useState([]);
    const [riders, setRiders] = useState([]);
    const [riderResults, setRiderResults] = useState([]);
    const [sessions, setSessions] = useState([]);

    const location = useLocation();
    const { selectedYear, selectedCategory } = location.state || {};

    const generatePDF = () => {
        const input = document.getElementById('pdf-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('schedule.pdf');
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsResponse, ridersResponse, riderResultsResponse, sessionsResponse] = await Promise.all([
                    fetch('http://localhost:3002/api/calendar'),
                    fetch('http://localhost:3002/api/riders'),
                    fetch('http://localhost:3002/api/result'),
                    fetch('http://localhost:3002/api/sessions'),
                ]);

                const eventsData = await eventsResponse.json();
                const ridersData = await ridersResponse.json();
                const riderResultsData = await riderResultsResponse.json();
                const sessionsData = await sessionsResponse.json();

                setEvents(eventsData);
                setRiders(ridersData);
                setRiderResults(riderResultsData);
                setSessions(sessionsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Filter events based on selectedYear
    const filteredEvents = events.filter(event => new Date(event.date_start).getFullYear().toString() === selectedYear);
    
    // Find all riders that have results in the selected year and category
    const filteredRiders = riders.filter(rider => {
        return riderResults.some(result => {
            const session = sessions.find(s => s.id === result.sessionId);
            return session && session.category === selectedCategory && session.eventId && filteredEvents.some(evt => evt.id === session.eventId);
        });
    });

    return (
        <>
            <div id="pdf-content">
            <div className="mb-4">
                    <div className="container-fluid review__container">
                        <div className="review__header-container d-flex justify-content-between">
                            <div>
                                <h1 className="review__sponcor">Results and timing service provided by<img src={logotissot} alt="Logo" style={{ width: '150px', height: '50px', marginRight: '5px' }} class="img-logo"></img></h1>
                                <div class="d-flex justify-content-between w-50">
                                    <img src={logomotorgp} alt="Logo" style={{ width: '200px', height: '80px', marginRight: '5px' }} class="img-logo"></img>
                                    <img src={logofim} alt="Logo" style={{ width: '150px', height: '80px', marginRight: '5px' }} class="img-logo"></img>
                                </div>
                            </div>
                            <h1 className="review__logo">MotoGP™</h1>
                        </div>
                        <div className="review__header d-flex justify-content-center">
                            <h1 className="review__title">World Championship Classification</h1>
                        </div>
                    </div>
                </div>
                <div className="table-container">
                    <Table className="rider-table">
                        <thead>
                            <tr>
                                <th>Rider</th>
                                <th>Points</th>
                                {filteredEvents.map(event => (
                                    <th key={event._id}>{event.short_name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRiders.map((rider, index) => {
                                const results = riderResults.filter(result => result.riderID === rider.id);
                                const racesResults = {};

                                results.forEach(result => {
                                    const session = sessions.find(s => s.id === result.sessionId);
                                    if (session && session.category === selectedCategory) {
                                        const sessionName = session.sessionName; // e.g., "RAC", "SPR"
                                        const eventKey = filteredEvents.find(event => event.id === session.eventId)?.short_name; // Get the short name from the session's eventId

                                        if (eventKey) {
                                            if (!racesResults[eventKey]) {
                                                racesResults[eventKey] = { RAC: 0, SPR: 0 };
                                            }

                                            // Map points based on session type
                                            if (sessionName === 'RAC') {
                                                racesResults[eventKey].RAC = result.points ?? 0;
                                            } else if (sessionName === 'SPR') {
                                                racesResults[eventKey].SPR = result.points ?? 0;
                                            }
                                        }
                                    }
                                });
                                 // Access yearlyPoints for the selected year
                                 const yearlyPoints = rider.yearlyPoints ? rider.yearlyPoints[selectedYear] || 0 : 0;



                                return (
                                    <tr key={                                    index}>
                                    <td>{rider.name}</td>
                                    <td>{yearlyPoints}</td>
                                    {filteredEvents.map(event => {
                                        const eventResults = racesResults[event.short_name] || { RAC: 0, SPR: 0 };

                                        // Log results for each event
                                        console.log(`Event: ${event.short_name}, RAC Points: ${eventResults.RAC}, SPR Points: ${eventResults.SPR}`);

                                        // Display both RAC and SPR points in the same cell
                                        return (
                                            <td key={event._id}>
                                                <div>{eventResults.RAC} / {eventResults.SPR}</div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
        <div>
            <button className="button-82-pushable" onClick={generatePDF} style={{ margin: '20px 200px 20px 100px' }}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Export to PDF
                </span>
            </button>
        </div>
    </>
);
};

export default ReviewPDF;

