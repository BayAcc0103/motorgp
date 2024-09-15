import React from "react";
import "./Calendar.css"
import flag from './asset/raceflag.png'

const Calendar = () => {
    return (
        <>
            {/* HTLML for 2024 Calendar */}
            <div class="container-fluid calendar__container">
                <div class="calendar__header-container">
                    <h1 class="calendar__title">2024 Calendar</h1>
                </div>
            </div>
            {/* HTML for Month */}
            <header className="mt-3 d-flex align-items-center">
                <div className="monthrace d-flex align-items-center">
                    <img src={flag} alt="raceflag" className="me-1" ></img>
                    <h1 className="mt-0">November</h1>
                </div>
            </header>
            {/* HTML for Calendar*/}
            <div class="container">
                <div class="row row-striped mb-5 mt-3">
                    <div class="col-2">
                        <div class="bgr-time">
                            <div class="row justify-content-center">
                                <div class="col text-center">
                                    <div class="date-component">
                                        <h1 class="display-4">3</h1>
                                        <span class="month-component">MAR</span>
                                    </div>
                                </div>
                                <div class="col text-center">
                                    <div class="date-component">
                                        <h1 class="display-4">-</h1>
                                    </div>
                                </div>
                                <div class="col text-center">
                                    <div class="date-component">
                                        <h1 class="display-4">10</h1>
                                        <span class="month-component">MAR</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <h3 class="text-uppercase"><strong>Qatar Airways Grand Prix of Qatar</strong></h3>
                        <div class="mt-2 d-flex justify-content-left">
                            <div class="location_flag d-flex">
                                <img class="calendar-listing_flag" src="https://static-files.motogp.pulselive.com/assets/flags/qa.svg" alt="ES flag" loading="lazy"></img>
                            </div>
                            <div class="calendar-listing__location-track-name mt-1">Lusail International Circuit</div>
                        </div>
                    </div>
                    <div class="col-4 position-relative overflow-hidden p-0">
                        <div class="calendar-listing__track-image">
                            <img src="https://resources.motogp.pulselive.com/photo-resources/2024/06/06/dac9c483-db57-413d-89c5-e37097f7a381/QAT.jpg?height=125&amp;width=412" alt="2024_Calendar_Background_Qatar" loading="lazy" class="img undefined picture__img object-fit-cover-picture__img"></img>
                        </div>
                        <div class="calendar-listing__track-layout">
                            <img class="calendar-listing__layout" src="https://photos.motogp.com/events-admin/b/1/b1cd25b2-1658-4c3b-bd3f-1a7796f7cd27/simple/qat2.svg" alt="Lusail International Circuit track" loading="lazy"></img>
                        </div>
                        <div class="calendar-listing__track-sponcor">
                            <div class="calendar-listing__track-sponsor-container">
                                <div class="calendar-listing__track-sponsor-logo">
                                    <img class="" src="https://resources.motogp.pulselive.com/photo-resources/2023/06/16/2edbf7ab-e569-4f03-ba7a-8681e21a061f/sponsor-qatar.png?width=37" alt="Lusail International Circuit track" loading="lazy"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};
export default Calendar;