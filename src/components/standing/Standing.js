import React, { useState, useEffect } from 'react';
import styles from "./Standing.module.css";
import banner from "./asset/racingflag.jpg";

const Standing = () => {
    const [standingData, setStandingData] = useState([]);
    const [year, setYear] = useState('2024'); // Default value
    const [champ, setChamp] = useState('Rider'); // Default value
    const [category, setCategory] = useState('MotoGP'); // Default value
    const [teams, setTeams] = useState([]); // State to hold fetched teams

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3002/api/riderswithpoints/${year}/${category}/${champ}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStandingData(data);

                const teamsResponse = await fetch("http://localhost:3002/api/teams");
                const teamsData = await teamsResponse.json();
                setTeams(teamsData);
            } catch (error) {
                console.error("Error fetching the rider data:", error);
            }
        };

        fetchData();
    }, [year, category, champ]); // Fetch data whenever the year, category, or championship changes

    // Create a mapping of teamId to team name
    const teamMapping = teams.reduce((acc, team) => {
        acc[team._id] = team.name; // Assuming _id holds the teamId
        return acc;
    }, {});

    // Create an array of years from 2000 to 2025
    const years = Array.from({ length: 26 }, (_, index) => 2025 - index); // [2025, 2024, ..., 2000]

    return (
        <>
            <div>
                {/* HTML for FILTERS */}
                <div class={`z-1 position-relative`}>
                    <div class={`d-flex position-relative ${styles.primary_filter}`}>
                        {/* HTML for YEAR */}
                        <div class={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                            <div class={`position-absolute pe-none ${styles.filter_label}`}>Year</div>
                            <select
                                class={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}
                                value={year} // Control the select element
                                onChange={(e) => setYear(e.target.value)}
                            >
                                {years.map((yearOption) => (
                                    <option key={yearOption} class={`text-dark ${styles.custom_option}`} value={yearOption}>
                                        {yearOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* HTML for CHAMPIONSHIP */}
                        <div class={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                            <div class={`position-absolute pe-none ${styles.filter_label}`}>Championship</div>
                            <select
                                class={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}
                                value={champ} // Control the select element
                                onChange={(e) => setChamp(e.target.value)}
                            >
                                <option class={`text-dark ${styles.custom_option}`} value="Rider">Rider Championship</option>
                                <option class={`text-dark ${styles.custom_option}`} value="Team">Team Championship</option>
                            </select>
                        </div>
                        {/* HTML for CATEGORY */}
                        <div class={`d-flex position-relative align-items-center ${styles.filter_container}`}>
                            <div class={`position-absolute pe-none ${styles.filter_label}`}>Category</div>
                            <select
                                class={`text-white bg-transparent border-0 w-100 m-0 ${styles.filter_select} ${styles.custom_select}`}
                                value={category} // Control the select element
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option class={`text-dark ${styles.custom_option}`} value="MotoGP">MotoGP</option>
                                <option class={`text-dark ${styles.custom_option}`} value="Moto2">Moto2</option>
                                <option class={`text-dark ${styles.custom_option}`} value="Moto3">Moto3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class={`d-flex flex-column justify-content-between position-relative w-100 h-auto bg-dark ${styles.hero_container}`}>
                    <div class={`position-absolute w-100 h-100 bg-dark ${styles.hero_image}`}>
                        <img alt="Misano MotoGP™ Official Test" src={banner} class={`${styles.hero_image_img}`}></img>
                    </div>
                    <div class={`text-white w-75 position-relative ${styles.hero_text}`}>Championship Standings</div>
                    <div class={`text-white w-75 position-relative ${styles.hero_text}`}>{year}</div>
                </div>
                <section class={`${styles.table}`}>
                    <table class={`${styles.table__table}`}>
                        <thead>
                            <tr>
                                <th class={`${styles.table__header_cell} ${styles.table__header_cell__pos}`}>pos.</th>
                                {!champ.includes("Team") && ( // Only show rider column when champ is not "Team"
                                    <th class={`${styles.table__header_cell} ${styles.table__header_cell__rider}`}>rider</th>
                                )}
                                <th class={`${styles.table__header_cell} ${styles.table__header_cell__team}`}>Team</th>
                                <th class={`${styles.table__header_cell} ${styles.table__header_cell__point}`}>point</th>
                            </tr>
                        </thead>
                        <tbody className={`${styles.table__tbody}`}>
                            {standingData.map((standing) => (
                                <tr className={`${styles.table__body_row}`} key={standing.tbody_pos}>
                                    <td className={`${styles.table__body_cell} ${styles.table__body_cell__pos} u-hide-tablet`}>{standing.tbody_pos}</td>
                                    {!champ.includes("Team") && ( // Conditionally render the rider information
                                        <td className={`${styles.table__body_cell} ${styles.table__body_cell__rider}`}>
                                            <div className={`d-flex justify-content-start align-items-center`}>
                                                <div className={`${styles.rider_image_container}`}>
                                                    <img src={standing.rider_image} alt="rider" loading="lazy"></img>
                                                </div>
                                                <div className={`d-flex align-items-center justify-content-start ms-auto ${styles.table__rider_name_wrapper} u-hide-tablet`}>
                                                    <div className={`${styles.table__rider_name}`}>
                                                        <span className={`text-danger ${styles.table__body_cell} ${styles.table__body_cell__number}`}>{standing.tbody_number}</span>
                                                        <span className={`${styles.table__body_cell} ${styles.table__body_cell__full_name}`}>{standing.tbody_fullname}</span>
                                                    </div>
                                                    <img src={standing.tbody_flag} alt="flag" className={`${styles.table__body_cell_flag}`}></img>
                                                </div>
                                            </div>
                                        </td>
                                    )}
                                    <td className={`${styles.table__body_cell} ${styles.table__body_cell__team} u-hide-tablet`}>
                                        {teamMapping[standing.tbody_team] || standing.tbody_team} {/* Get the team name */}
                                    </td>
                                    <td className={`${styles.table__body_cell} ${styles.table__body_cell__point}`}>
                                        <span>{standing.tbody_point}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}

export default Standing;
