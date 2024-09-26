import React from 'react';
import './Team.css';

// Data for Teams
const teams = [
  {
    id: '#Ducati',
    name: 'Ducati Lenovo Team',
    country: 'Italy',
    riders: ['Francesco Bagnaia', 'Enea Bastianini'],
    img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/22/769d87f4-f78b-41f1-8ac4-ac81a1c9c9b4/RLflGJDj.png?width=400',
    flag: '🇮🇹',
  },
  {
    id: '#Aprilia',
    name: 'Aprilia Racing',
    country: 'Italy',
    riders: ['Maverick Viñales', 'Aleix Espargaró'],
    img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/22/6e5f28fb-b888-4b2a-bfde-aad134a36bf0/b0WgivNc.png?width=400',
    flag: '🇮🇹',
  },
  {
    id: '#Gresini',
    name: 'Gresini Racing MotoGP™',
    country: 'Italy',
    riders: ['Alex Marquez', 'Marc Marquez'],
    img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/22/ef25150d-a732-407c-8a8c-23785172c4a6/qABzxBFa.png?width=400',
    flag: '🇮🇹',
  },
  {
    id: '#LCR',
    name: 'LCR Honda',
    country: 'Japan',
    riders: ['Johann Zarco', 'Takaaki Nakagami'],
    img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/22/4bc7ea28-2774-4031-b7a5-078ba9f81b5c/SEvzc0TL.png?width=400',
    flag: '🇯🇵',
  },
];

const TeamGrid = () => {
  return (
    <>
      <div className="mb-4">
        <div className="container-fluid team__container">
          <div className="team__header-container">
            <h1 className="team__title">Teams</h1>
          </div>
        </div>
      </div>
      <div className="team-grid">
        {teams.map((team) => (
          <div className="team-card" key={team.id}>
            <img className="team-card__image" src={team.img} alt={team.name} />
            <div className="team-card__info">
              <span className="team-card__riders">
                {team.riders.join(', ')}
              </span>
              <h3 className="team-card__name">{team.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamGrid;
