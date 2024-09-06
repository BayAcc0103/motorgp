import React from "react";
import "./Calendar.css"
import motor1 from './asset/RSM.png'
import flag from './asset/raceflag.png'

const Calendar = () => {
    return (
        <>

            <div class="container-fluid calendar__container">
                <div class="calendar__header-container">
                    <h1 class="calendar__title">2024 Calendar</h1>
                </div>
            </div>
            <header className="mt-3 d-flex align-items-center">
                <div className="box d-flex align-items-center">
                    <img src={flag} alt="raceflag" className="me-1" ></img>
                    <h1 className="mt-0">November</h1>
                </div>
            </header>
            <div class="container">
                <div class="row row-striped mb-5 mt-3">
                    <div class="day col-2">
                        <div class="row justify-content-center">
                            <div class="col text-center">
                                <div class="date-component">
                                    <h1 class="display-4">3</h1>
                                    <span class="month">MAR</span>
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
                                    <span class="month">MAR</span>
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
                    {/* <div class="col-2 d-flex justify-content-center align-items-center bg-dark">
                        <img class="calendar-listing__layout" src="https://photos.motogp.com/events-admin/b/1/b1cd25b2-1658-4c3b-bd3f-1a7796f7cd27/simple/qat2.svg" alt="Lusail International Circuit track" loading="lazy"></img>
                    </div> */}

                    <div class="col-3 d-flex justify-content-start align-items-center bg-dark">
                        <div class="d-flex justify-content-start align-items-center">
                            <img class="calendar-listing__layout" src="https://photos.motogp.com/events-admin/b/1/b1cd25b2-1658-4c3b-bd3f-1a7796f7cd27/simple/qat2.svg" alt="Lusail International Circuit track" loading="lazy"></img>
                        </div>
                        <div class="fade-effect">
                            <img src={motor1} alt="Event Image" class="ms-3 shadow-image"></img>
                        </div>
                    </div>
                </div>
                <div class="row row-striped mb-5 mt-3">
                    <div class="day col-2">
                        <div class="row justify-content-center">
                            <div class="col text-center">
                                <div class="date-component">
                                    <h1 class="display-4">3</h1>
                                    <span class="month">MAR</span>
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
                                    <span class="month">MAR</span>
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
                    {/* <div class="col-2 d-flex justify-content-center align-items-center bg-dark">
                        <img class="calendar-listing__layout" src="https://photos.motogp.com/events-admin/b/1/b1cd25b2-1658-4c3b-bd3f-1a7796f7cd27/simple/qat2.svg" alt="Lusail International Circuit track" loading="lazy"></img>
                    </div> */}

                    <div class="col-3 d-flex justify-content-start align-items-center bg-dark">
                        <div class="d-flex justify-content-start align-items-center">
                            <img class="calendar-listing__layout" src="https://photos.motogp.com/events-admin/b/1/b1cd25b2-1658-4c3b-bd3f-1a7796f7cd27/simple/qat2.svg" alt="Lusail International Circuit track" loading="lazy"></img>
                        </div>
                        <div class="fade-effect">
                            <img src={motor1} alt="Event Image" class="ms-3 shadow-image"></img>
                        </div>
                    </div>
                </div>
                
                    <div class="col-3">
                        <div class="fade-effect">
                            <img src={motor1} alt="Event Image" class=" ms-2 shadow-image"></img>
                        </div>
                    </div>
                </div>







                <div class="row row-striped mb-5 mt-3">
                    <div class="col-2 text-right">
                        <h1 class="display-4"><span class="badge badge-secondary text-dark">27</span></h1>
                        <h2>OCT</h2>
                    </div>
                    <div class="col-10">
                        <h3 class="text-uppercase"><strong>Operations Meeting</strong></h3>
                        <ul class="list-inline">
                            <li class="list-inline-item"><i class="fa fa-calendar-o" aria-hidden="true"></i> Friday</li>
                            <li class="list-inline-item"><i class="fa fa-clock-o" aria-hidden="true"></i> 2:30 PM - 4:00 PM</li>
                            <li class="list-inline-item"><i class="fa fa-location-arrow" aria-hidden="true"></i> Room 4019</li>
                        </ul>
                    </div>
                </div>
            
        </>
    );
};
export default Calendar;