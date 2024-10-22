
// Data for Riders
// const riders = [
//   {
//     id: '#FB1',
//     name: 'Francesco Bagnaia',
//     country: 'Italy',
//     team: 'Ducati Lenovo Team',
//     img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/3a568eee-1e12-4091-b120-f53c71cbe8f6/rider-bio_francescobagnaia.png?height=700&width=900',
//     flag: '🇮🇹',
//   },
//   {
//     id: '#JZ5',
//     name: 'Johann Zarco',
//     country: 'France',
//     team: 'LCR Honda',
//     img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/804f0106-d53b-4052-bbd4-23e41f093ae6/rider-bio_johannzarco.png?height=400&width=600',
//     flag: '🇫🇷',
//   },
//   {
//     id: '#LM10',
//     name: 'Luca Marini',
//     country: 'Italy',
//     team: 'Repsol Honda Team',
//     img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/3a49cbe4-f2a9-4eb5-8e75-08b5387e6dea/rider-bio_lucamarini.png?height=400&width=600',
//     flag: '🇮🇹',
//   },
//   {
//     id: '#MV12',
//     name: 'Maverick Viñales',
//     country: 'Spain',
//     team: 'Aprilia Racing',
//     img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/5cc9bb88-4d65-4498-9808-f36bde7936f1/rider-bio_maverickvin-ales.png?height=400&width=600',
//     flag: '🇪🇸',
//   },
//   {
//     id: '#FQ20',
//     name: 'Fabio Quartararo',
//     country: 'France',
//     team: 'Monster Energy Yamaha MotoGP',
//     img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/80de8d72-d1b8-4b41-90b0-928467018ced/rider-bio_fabioquartararo.png?height=400&width=600',
//     flag: '🇫🇷',
//   },
// ];



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
        const ridersResponse = await fetch("http://localhost:3002/api/riders");
        if (!ridersResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const ridersData = await ridersResponse.json(); // Parse the JSON response
        setRiders(ridersData); // Update the state with fetched riders

        const teamsResponse = await fetch("http://localhost:3002/api/teams");
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
