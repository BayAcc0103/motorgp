import React from 'react';
import './Review.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, Table } from 'react-bootstrap';

const riderData = [
    {
        rider: "MARTIN Jorge [SPA]",
        points: 312,
        races: [
            { total: 28, spr: 12, rac: 16 },
            { total: 32, spr: 15, rac: 17 },
            // Add remaining race data with SPR and RAC points
        ],
    },
    {
        rider: "BAGNAIA Francesco [ITA]",
        points: 305,
        races: [
            { total: 12, spr: 6, rac: 6 },
            { total: 18, spr: 7, rac: 11 },
            // Add remaining race data with SPR and RAC points
        ],
    },
    // Add more riders as per your data
];

const ReviewPDF = () => {
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
    return (
        <>
            <div className="table-container" id="pdf-content">
                <Table className="rider-table">
                    <thead>
                        <tr>
                            <th>Rider</th>
                            <th>Points</th>
                            <th>QAT</th>
                            <th>POR</th>
                            <th>AME</th>
                            <th>SPA</th>
                            <th>FRA</th>
                            <th>CAT</th>
                            <th>ITA</th>
                            <th>NED</th>
                            <th>GER</th>
                            <th>GBR</th>
                            <th>AUT</th>
                            <th>ARA</th>
                            <th>RSM</th>
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
            <div>
                <Button onClick={generatePDF} style={{ marginTop: '20px' }}>
                    Export to PDF
                </Button>
            </div>
        </>
    );
};
export default ReviewPDF;