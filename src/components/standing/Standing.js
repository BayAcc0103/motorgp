import React from 'react';
import styles from "./Standing.module.css";
import banner from "./asset/racingflag.jpg"
const standingdata = [
    {
        tbody_pos: '1',
        rider_image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/986b0e12-1db0-49d8-ae13-fd556286237a/93_Marc_MarquezFullbodyGresini.png?height=300&amp;width=200',
        tbody_number: '93',
        tbody_fullname: 'Francesco Bagnaia',
        tbody_flag: 'https://static-files.motogp.pulselive.com/assets/flags/es.svg',
        tbody_team: 'Gresini Racing MotoGP',
        tbody_point: '312',
    },
    {
        tbody_pos: '2',
        tbody_point: '20',
        rider_image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/986b0e12-1db0-49d8-ae13-fd556286237a/93_Marc_MarquezFullbodyGresini.png?height=300&amp;width=200',
        tbody_number: '36',
        tbody_fullname: 'Francesco Bagnaia',
        tbody_flag: 'https://static-files.motogp.pulselive.com/assets/flags/es.svg',
        tbody_team: 'Gresini Racing MotoGP',
        tbody_time: '40:47.082',
    },
  ];
const Standing = () => {
    return (
        <>
            <div>
                {/* HTML for FILTERS */}
                <div class={`z-1 position-relative`}>
                    <div class={`d-flex position-relative ${styles.primary_filter}`}>
                        {/* HTML for YEAR */}
                        <div class={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                            <div class={`position-absolute pe-none ${styles.filter_label}`}>Year</div>
                            <select class={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}>
                                <option class={`text-dark ${styles.custom_option}`} value="2024">2024</option>
                                <option class={`text-dark ${styles.custom_option}`} value="2023">2023</option>
                            </select>
                        </div>
                        {/* HTML for CHAMPIONSHIP */}
                        <div class={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                            <div class={`position-absolute pe-none ${styles.filter_label}`}>Championship</div>
                            <select class={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}>
                                <option class={`text-dark ${styles.custom_option}`} value="">Rider's Championship</option>
                            </select>
                        </div>
                        {/* HTML for CATEGORY */}
                        <div class={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                            <div class={`position-absolute pe-none ${styles.filter_label}`}>Category</div>
                            <select class={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}>
                                <option class={`text-dark ${styles.custom_option}`} value="">MotoGP™</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class={`d-flex flex-column justify-content-between position-relative w-100 h-auto bg-dark ${styles.hero_container}`}>
                    <div class={`position-absolute w-100 h-100 bg-dark ${styles.hero_image}`}>
                        <img alt="Misano MotoGP™ Official Test" src={banner} class={`${styles.hero_image_img}`}></img>
                    </div>
                        <div class={`text-white w-75 position-relative ${styles.hero_text}`}>Championship Standings</div>
                        <div class={`text-white w-75 position-relative ${styles.hero_text}`}>2024</div>
                </div>

                <section class={`${styles.table}`}>
                    <table class={`${styles.table__table}`}>
                        <thead>
                            <tr>
                                <th class={`${styles.table__header_cell} ${styles.table__header_cell__pos}`}>pos.</th>
                                <th class={`${styles.table__header_cell} ${styles.table__header_cell__rider}`}>rider</th>
                                <th class={`${styles.table__header_cell} ${styles.table__header_cell__team}`}>Team</th>
                                <th class={`${styles.table__header_cell} ${styles.table__header_cell__time}`}>point</th>
                            </tr>
                        </thead>
                        {standingdata.map((standing) => (
                        <tbody class={`${styles.table__tbody}`}>
                            <tr class={`${styles.table__body_row}`}>
                                <td class={`${styles.table__body_cell} ${styles.table__body_cell__pos} u-hide-tablet`}>{standing.tbody_pos}</td>
                                <td class={`${styles.table__body_cell} ${styles.table__body_cell__pos}`}>
                                    <div class={`d-flex justify-content-start align-items-center`}>
                                        <div class={`${styles.rider_image_container}`}>
                                            <img src={standing.rider_image}
                                                alt="rider-bio_marcmarquez" loading="lazy"></img>
                                        </div>
                                        <div class={`d-flex align-items-center justify-content-start ms-auto ${styles.table__rider_name_wrapper} u-hide-tablet`}>
                                            <div class={`${styles.table__rider_name}`}>
                                                <span class={`text-danger ${styles.table__body_cell} ${styles.table__body_cell__number}`}>{standing.tbody_number}</span>
                                                <span class={`${styles.table__body_cell} ${styles.table__body_cell__full_name}`}>{standing.tbody_fullname}</span>
                                            </div>
                                            <img src={standing.tbody_flag} alt="ES flag"
                                                class={`${styles.table__body_cell_flag}`}></img>
                                        </div>
                                    </div>
                                </td>
                                <td class={`${styles.table__body_cell} ${styles.table__body_cell__team} u-hide-tablet`}>{standing.tbody_team}
                                </td>
                                <td class={`${styles.table__body_cell} ${styles.table__body_cell__point}`}><span>{standing.tbody_point}</span></td>
                            </tr>
                        </tbody>
                    ))}
                    </table>
                </section>
            </div>
        </>
    )
}
export default Standing;