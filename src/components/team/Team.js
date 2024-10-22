

// Data for Teams
// const teams = [
//   {
//     id: '#Ducati',
//     name: 'Ducati Lenovo Team',
//     country: 'Italy',
//     riders: ['Francesco Bagnaia', 'Enea Bastianini'],
//     img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/22/769d87f4-f78b-41f1-8ac4-ac81a1c9c9b4/RLflGJDj.png?width=400',
//     flag: '🇮🇹',
//   },
//   {
//     id: '#Aprilia',
//     name: 'Aprilia Racing',
//     country: 'Italy',
//     riders: ['Maverick Viñales', 'Aleix Espargaró'],
//     img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/22/6e5f28fb-b888-4b2a-bfde-aad134a36bf0/b0WgivNc.png?width=400',
//     flag: '🇮🇹',
//   },
//   {
//     id: '#Gresini',
//     name: 'Gresini Racing MotoGP™',
//     country: 'Italy',
//     riders: ['Alex Marquez', 'Marc Marquez'],
//     img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/22/ef25150d-a732-407c-8a8c-23785172c4a6/qABzxBFa.png?width=400',
//     flag: '🇮🇹',
//   },
//   {
//     id: '#LCR',
//     name: 'LCR Honda',
//     country: 'Japan',
//     riders: ['Johann Zarco', 'Takaaki Nakagami'],
//     img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/22/4bc7ea28-2774-4031-b7a5-078ba9f81b5c/SEvzc0TL.png?width=400',
//     flag: '🇯🇵',
//   },
//   {
//     id: '#LCR',
//     name: 'LCR Honda',
//     country: 'Japan',
//     riders: ['Johann Zarco', 'Takaaki Nakagami'],
//     img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/22/4bc7ea28-2774-4031-b7a5-078ba9f81b5c/SEvzc0TL.png?width=400',
//     flag: '🇯🇵',
//   },
// ];

// import React, { useEffect, useState } from 'react'; // Import useState and useEffect
// import './Team.css'; // Ensure that the styling is handled in this CSS file
 
// const TeamGrid = () => {
//   const [teams, setTeams] = useState([]); // State to hold fetched teams
//   const [error, setError] = useState(null); // State for any potential errors

//   // Fetch riders and teams from the API on component mount
//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const teamsResponse = await fetch('/api/teams');
//         const teamsData = await teamsResponse.json(); // Parse the JSON response
//         setTeams(teamsData); // Update the state with fetched teams
//       } catch (error) {
//         setError('Error fetching data: ' + error.message); // Handle fetch errors
//       }
//     };

//     fetchTeams(); // Call the function to fetch riders and teams
//   }, []); // Empty dependency array means this runs once when the component mounts



//   return (
//     <>
//       <div className="mb-4">
//       <div className="container-fluid team__container">
//           <div className="team__header-container">
//             <h1 className="team__title">Team</h1>
//           </div>
//         </div>
//       </div>

//       {/* Team grid layout */}
//       <div className="team-grid">
//           <div className="team-card" key={teams.id}>
//             <img className="team-card__image" src={teams.img} alt={teams.name} />
//             <div className="team-card__info">
//               <h3 className="team-card__name">{teams.name} {teams.flag}</h3>
//               <p className="team-card__country">{teams.country}</p>
//               <div className="team-card__riders">
//                 <strong>Riders:</strong>
//               </div>
//             </div>
//           </div>
//       </div>
      
//     </>
//   );
// };

// export default TeamGrid;

import React, { useEffect, useState } from 'react'; // Import useState and useEffect
import './Team.css'; // Ensure that the styling is handled in this CSS file

const TeamGrid = () => {
  const [teams, setTeams] = useState([]); // State to hold fetched teams
  const [riders, setRiders] = useState([]); // State to hold fetched riders
  const [error, setError] = useState(null); // State for any potential errors

  // Fetch teams from the API on component mount
  // useEffect(() => {
  //   const fetchTeams = async () => {
  //     try {
  //       const teamsResponse = await fetch('/api/teams');
  //       if (!teamsResponse.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const teamsData = await teamsResponse.json(); // Parse the JSON response
  //       setTeams(teamsData); // Update the state with fetched teams
  //     } catch (error) {
  //       setError('Error fetching data: ' + error.message); // Handle fetch errors
  //     }
  //   };

  //   fetchTeams(); // Call the function to fetch teams
  // }, []); // Empty dependency array means this runs once when the component mounts

  // Fetch riders and teams from the API on component mount
  useEffect(() => {
    const fetchRidersAndTeams = async () => {
      try {
        const ridersResponse = await fetch('/api/riders');
        if (!ridersResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const ridersData = await ridersResponse.json(); // Parse the JSON response
        setRiders(ridersData); // Update the state with fetched riders

        const teamsResponse = await fetch('/api/teams');
        const teamsData = await teamsResponse.json(); // Parse the JSON response
        setTeams(teamsData); // Update the state with fetched teams
      } catch (error) {
        setError('Error fetching data: ' + error.message); // Handle fetch errors
      }
    };

    fetchRidersAndTeams(); // Call the function to fetch riders and teams
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <>
      {error && <div className="error">{error}</div>} {/* Display error if exists */}
      <div className="mb-4">
        <div className="container-fluid team__container">
          <div className="team__header-container">
            <h1 className="team__title">Teams</h1>
          </div>
        </div>
      </div>

      {/* Team grid layout */}
      <div className="team-grid">
        {teams.map((team) => (
          <div className="team-card" key={team.id}>
            <img className="team-card__image" src={team.bikeUrl} alt={team.name} />
            <div className="team-card__info">
              <h3 className="team-card__name">
                {team.name} {team.flag} {/* Display team name along with flag */}
              </h3>
              <p className="team-card__country">{team.country}</p>
              <div className="team-card__riders">
                <strong>Riders:</strong> 
                {riders
                  .filter((rider) => rider.teamId === team._id) // Filtering riders for the current team
                  //team._id is diffrent from team.id beacause team.id is user-created id and _id is mongodb id
                  //rider.teamId is mongoDB id of the team, you could change this in RiderAdmin.js to team.id 
                  .map((rider) => rider.name) // Getting their names
                  .join(', ') || ' None'} {/* Join rider names with commas or show 'None' if no riders */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamGrid;
