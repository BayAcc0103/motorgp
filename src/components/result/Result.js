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

                <section class="results-table">
                    <table class="results-table__table">
                        <thead>
                            <tr>
                                <th class="results-table__header-cell results-table__header-cell--pos u-hide-tablet">pos.</th>
                                <th class="results-table__header-cell results-table__header-cell--points u-hide-tablet">pts</th>
                                <th class="results-table__header-cell results-table__header-cell--rider">rider</th>
                                <th class="results-table__header-cell results-table__header-cell--team u-hide-tablet">Team</th>
                                <th class="results-table__header-cell results-table__header-cell--time">time / gap</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="results-table__body-row">
                                <td class="results-table__body-cell results-table__body-cell--pos u-hide-tablet">1</td>
                                <td class="results-table__body-cell results-table__body-cell--points u-hide-tablet">25</td>
                                <td class="results-table__body-cell results-table__body-cell--rider">
                                    <div class="results-table__rider-details">
                                        <div class="rider-image-container">
                                            <div class="rider-image">
                                                <div class="js-lazy-load u-observed lazy-image-wrapper ">
                                                    <img src="https://resources.motogp.pulselive.com/photo-resources/2024/02/19/986b0e12-1db0-49d8-ae13-fd556286237a/93_Marc_MarquezFullbodyGresini.png?height=300&amp;width=200"
                                                        alt="rider-bio_marcmarquez" loading="lazy"
                                                        class="img undefined picture__img "></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="results-table__rider-name-wrapper u-hide-tablet">
                                            <div class="results-table__rider-name">
                                                <span class="results-table__body-cell results-table__body-cell--number">93</span>
                                                <span class="results-table__body-cell results-table__body-cell--full-name">
                                                    <a href="/en/riders/marc-marquez/23e50438-a657-4fb0-a190-3262b5472f29"
                                                        title="label.standings.viewRiderProfile" class="results-table__rider-link">
                                                        <span class="results-table__first-name">M. </span> Marquez</a></span>
                                            </div>
                                            <img src="https://static-files.motogp.pulselive.com/assets/flags/es.svg" alt="ES flag"
                                                class="results-table__body-cell-flag"></img>
                                        </div>
                                    </div>
                                </td>
                                <td class="results-table__body-cell results-table__body-cell--team u-hide-tablet">Gresini Racing
                                    MotoGP
                                </td>
                                <td class="results-table__body-cell results-table__body-cell--time"><span>41:47.082</span></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </>

    )
}
export default Result;