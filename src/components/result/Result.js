import React from 'react';
import "./Result.css"
const Result = () => {

    return (
        <>
            <div>
                <div class="primary-filter">
                    <div class="primary-filter__filter-container">
                        <div class="primary-filter__filter-label">Year</div>
                        <select class="primary-filter__filter-select primary-filter__filter-select--year">
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                    <div class="primary-filter__filter-container">
                        <div class="primary-filter__filter-label">Event</div>
                        <select class="primary-filter__filter-select primary-filter__filter-select--year">
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                    <div class="primary-filter__filter-container">
                        <div class="primary-filter__filter-label">Category</div>
                        <select class="primary-filter__filter-select primary-filter__filter-select--year">
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                    <div class="primary-filter__filter-container">
                        <div class="primary-filter__filter-label">Session</div>
                        <select class="primary-filter__filter-select primary-filter__filter-select--year">
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                </div>

                <section class="intro ">
                    <div class="gradient-custom-1 h-100">
                        <div class="mask d-flex align-items-center h-100">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-12">
                                        <div class="table-responsive bg-white">
                                            <table class="table mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Pos</th>
                                                        <th scope="col">Rider</th>
                                                        <th scope="col">Team</th>
                                                        <th scope="col">Point</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row" >Tiger Nixon</th>
                                                        <td>System Architect</td>
                                                        <td>tnixon12@example.com</td>
                                                        <td>61</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" >Sonya Frost</th>
                                                        <td>Software Engineer</td>
                                                        <td>sfrost34@example.com</td>
                                                        <td>23</td>
                                                        
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>

    )
}
export default Result;