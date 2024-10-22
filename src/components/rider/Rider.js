



import React, { useEffect, useState } from 'react'; // Import useState and useEffect
import './Rider.css';

const RiderGrid = () => {
  const [riders, setRiders] = useState([]); // State to hold fetched riders
  const [teams, setTeams] = useState([]); // State to hold fetched teams
  const [error, setError] = useState(null); // State for any potential errors

  // Fetch riders and teams from the API on component mount
  useEffect(() => {
    const fetchRidersAndTeams = async () => {
      try {
        const ridersResponse = await fetch("2/api/riders");
        if (!ridersResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const ridersData = await ridersResponse.json(); // Parse the JSON response
        setRiders(ridersData); // Update the state with fetched riders

        const teamsResponse = await fetch("/api/teams");
        const teamsData = await teamsResponse.json(); // Parse the JSON response
        setTeams(teamsData); // Update the state with fetched teams
      } catch (error) {
        setError("Error fetching data: " + error.message); // Handle fetch errors
      }
    };

    fetchRidersAndTeams(); // Call the function to fetch riders and teams
  }, []); // Empty dependency array means this runs once when the component mounts

  function getRandomGradient() {
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
  
    // Generate two random colors for the gradient
    const color1 = '#000000';
    const color2 = getRandomColor();
  
    return `linear-gradient(450deg, ${color1}, ${color2})`;
  }
  // Mapping of ISO country codes to full country names
  const countryNames = {
    IT: "Italy",
    FR: "France",
    ES: "Spain",
    // Add more mappings as needed
  };

  return (
    <>
      {error && <div className="error">{error}</div>}{" "}
      {/* Display error if exists */}
      <div className="mb-4">
        <div className="container-fluid rider__container">
          <div className="rider__header-container">
            <h1 className="rider__title">Riders</h1>
          </div>
        </div>
      </div>
      <div className="rider-grid">
        {riders.map((rider) => {
          // Find the corresponding team name based on teamId
          const team = teams.find((team) => team._id === rider.teamId); // Adjust your field names if needed

          return (
            <div className="rider-card" key={rider.id} >
              <img
                className="rider-card__image"
                src={rider.riderUrl}
                alt={rider.name}
                style={{ background: getRandomGradient() }}
              />
              <div className="rider-card__info">
                <span className="rider-card__id">{rider.driverNb}</span>
                <h3 className="rider-card__name">{rider.name}</h3>
                <span className="rider-card__country">
                  <img
                    className="rider-card__flag"
                    src={rider.imageUrl}
                    alt={rider.name}
                  />
                  {countryNames[rider.rider_country_iso] || "Unknown Country"}
                  {/* Separator */}
                  <span className="vertical-line">|</span>
                  <span className="rider-card__team">
                    {team ? team.name : "Unknown Team"}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RiderGrid;
