import React from 'react';
import styles from "./Standing.module.css";
const Standing = () => {
    return (
        <>
            <div>
                <div class={`z-1 position-relative`}>
                    <div class={`d-flex position-relative ${styles.primary_filter}`}>
                        <div class={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                            <div class={`${styles.filter_label}`}>Year</div>
                            <select class={`${styles.filter_select} ${styles.custom_select}`}>
                                <option class={`text-dark ${styles.custom_option}`} value="2024">2024</option>
                                <option class={`text-dark ${styles.custom_option}`} value="2023">2023</option>
                                <option class={`text-dark ${styles.custom_option}`} value="2022">2022</option>
                            </select>
                        </div>
                        <div class={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                            <div class={`${styles.filter_label}`}>Year</div>
                            <select class={`${styles.filter_select} ${styles.custom_select}`}>
                                <option class={`text-dark ${styles.custom_option}`} value="2024">2024</option>
                                <option class={`text-dark ${styles.custom_option}`} value="2023">2023</option>
                                <option class={`text-dark ${styles.custom_option}`} value="2022">2022</option>
                            </select>
                        </div>
                        <div class={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                            <div class={`${styles.filter_label}`}>Year</div>
                            <select class={`${styles.filter_select} ${styles.custom_select}`}>
                                <option class={`text-dark ${styles.custom_option}`} value="2024">2024</option>
                                <option class={`text-dark ${styles.custom_option}`} value="2023">2023</option>
                                <option class={`text-dark ${styles.custom_option}`} value="2022">2022</option>
                            </select>
                        </div>
                        <div class={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                            <div class={`${styles.filter_label}`}>Year</div>
                            <select class={`${styles.filter_select} ${styles.custom_select}`}>
                                <option class={`text-dark ${styles.custom_option}`} value="2024">2024</option>
                                <option class={`text-dark ${styles.custom_option}`} value="2023">2023</option>
                                <option class={`text-dark ${styles.custom_option}`} value="2022">2022</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class={`${styles.results__hero_container}`}>
                    <div class={`${styles.results__hero_image}`}>
                        <img alt="Misano MotoGP™ Official Test" src="https://photos.motogp.com/2024/events/background/RSM.png" class={`${styles.results__hero_image_img}`}></img>
                    </div>
                    <div class={`${styles.results__hero_text}`}>Misano MotoGP™ Official Test 2024</div>
                    <div class={`${styles.results__hero_details_container}`}>
                        <img src="https://static-files.motogp.pulselive.com/assets/flags/it.svg" alt="IT flag" class={`${styles.results__hero_details_flag}`}></img>
                        <div class={`${styles.results__hero_details_location}`}>Misano World Circuit Marco Simoncelli</div>
                    </div>
                </div>


                <section class={`${styles.results_table}`}>
                    <table class={`${styles.results_table__table}`}>
                        <thead>
                            <tr>
                                <th class={`${styles.results_table__header_cell} ${styles.results_table__header_cell__pos}`}>pos.</th>
                                <th class={`${styles.results_table__header_cell} ${styles.results_table__header_cell__rider}`}>rider</th>
                                <th class={`${styles.results_table__header_cell} ${styles.results_table__header_cell__team}`}>Team</th>
                                <th class={`${styles.results_table__header_cell} ${styles.results_table__header_cell__time}`}>point</th>
                            </tr>
                        </thead>
                        <tbody class={`${styles.results_table__tbody}`}>
                            <tr class={`${styles.results_table__body_row}`}>
                                <td class={`${styles.results_table__body_cell} ${styles.results_table__body_cell__pos} u-hide-tablet`}>1</td>
                                <td class={`${styles.results_table__body_cell} ${styles.results_table__body_cell__pos}`}>
                                    <div class={`${styles.results_table__rider_details}`}>
                                        <div class={`${styles.rider_image_container}`}>
                                            <div class="rider-image">
                                                <div class={`${styles.u_observed}`}>
                                                    <img src="https://resources.motogp.pulselive.com/photo-resources/2024/02/19/986b0e12-1db0-49d8-ae13-fd556286237a/93_Marc_MarquezFullbodyGresini.png?height=300&amp;width=200"
                                                        alt="rider-bio_marcmarquez" loading="lazy"
                                                        class="img undefined picture__img "></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div class={`${styles.results_table__rider_name_wrapper} u-hide-tablet`}>
                                            <div class={`${styles.results_table__rider_name}`}>
                                                <span class={`${styles.results_table__body_cell} ${styles.results_table__body_cell__number}`}>93</span>
                                                <span class={`${styles.results_table__body_cell} ${styles.results_table__body_cell__full_name}`}>
                                                    <a href="/en/riders/marc-marquez/23e50438-a657-4fb0-a190-3262b5472f29"
                                                        title="label.standings.viewRiderProfile" class={`${styles.results_table__rider_link}`}>
                                                        <span class={`${styles.results_table__first_name}`}>M. </span> Marquez</a></span>
                                            </div>
                                            <img src="https://static-files.motogp.pulselive.com/assets/flags/es.svg" alt="ES flag"
                                                class={`${styles.results_table__body_cell_flag}`}></img>
                                        </div>
                                    </div>
                                </td>
                                <td class={`${styles.results_table__body_cell} ${styles.results_table__body_cell__team} u-hide-tablet`}>Gresini Racing
                                    MotoGP
                                </td>
                                <td class={`${styles.results_table__body_cell} ${styles.results_table__body_cell__point}`}><span>312</span></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}
export default Standing;