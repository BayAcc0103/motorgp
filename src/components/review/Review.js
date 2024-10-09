import React, { useState, useEffect } from 'react';
import './Review.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, Table } from 'react-bootstrap';
import logofim from './asset/logofim.png';
import logomotorgp from './asset/logomotorgp.png';
import logotissot from './asset/logotissot.png';
import { useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const riderData = [
    {
        rider: "MARTIN Jorge [SPA]",
        points: 312,
        races: [
            { total: 28, spr: 12, rac: 16 },
            { total: 32, spr: 7, rac: 25 },
            { total: 20, spr: 7, rac: 13 },
            { total: 12, spr: 12, rac: 0 },
            { total: 37, spr: 12, rac: 25 },
            { total: 26, spr: 6, rac: 20 },
            { total: 16, spr: 0, rac: 16 },
            { total: 29, spr: 9, rac: 20 },
            { total: 12, spr: 12, rac: 0 },
            { total: 29, spr: 9, rac: 20 },
            { total: 29, spr: 9, rac: 20 },
            { total: 29, spr: 9, rac: 20 },
            { total: 13, spr: 12, rac: 20 },
            // Add remaining race data with SPR and RAC points
        ],
    },
    {
        rider: "BAGNAIA Francesco [ITA]",
        points: 305,
        races: [
            { total: 31, spr: 6, rac: 25 },
            { total: 6, spr: 6, rac: 0 },
            { total: 13, spr: 2, rac: 11 },
            { total: 25, spr: 0, rac: 25 },
            { total: 16, spr: 0, rac: 16 },
            { total: 25, spr: 0, rac: 25 },
            { total: 37, spr: 12, rac: 25 },
            { total: 37, spr: 12, rac: 25 },
            { total: 32, spr: 7, rac: 25 },
            { total: 16, spr: 0, rac: 16 },
            { total: 37, spr: 12, rac: 25 },
            { total: 1, spr: 1, rac: 0 },
            { total: 29, spr: 9, rac: 20 },
            // Add remaining race data with SPR and RAC points
        ],
    },
    // Add more riders as per your data
];

const ReviewPDF = () => {
    const [events, setEvents] = useState([]);
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
    const location = useLocation();
    const { selectedYear } = location.state || {}; // Default to undefined if state is not passed

    console.log(selectedYear); // Now you can use the selectedYear in this component

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
                                {events.map(event => (
                                    <th key={event._id}>{event.short_name}</th>
                                ))}

                            </tr>
                        </thead>
                        <tbody>
                            {riderData.map((rider, index) => (
                                <tr key={index}>
                                    <td>{rider.rider}</td>
                                    <td>{rider.points}</td>
                                    {rider.races.map((race, i) => (
                                        <td key={i}>
                                            <div>{race.total}</div>
                                            <div style={{ fontSize: 'smaller' }}>
                                                <span>SPR: {race.spr}</span>
                                                <br />
                                                <span>RAC: {race.rac}</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <div>
                <button class="button-82-pushable" onClick={generatePDF} style={{ margin: '20px 200px 20px 100px' }}>
                    <span class="button-82-shadow"></span>
                    <span class="button-82-edge"></span>
                    <span class="button-82-front text">
                        Export to PDF
                    </span>
                </button>
            </div>
        </>
    );
};
export default ReviewPDF;