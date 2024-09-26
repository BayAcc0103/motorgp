import React from 'react';
import './Rider.css';

// Data for Riders
const riders = [
  {
    id: '#FB1',
    name: 'Francesco Bagnaia',
    country: 'Italy',
    team: 'Ducati Lenovo Team',
    img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/3a568eee-1e12-4091-b120-f53c71cbe8f6/rider-bio_francescobagnaia.png?height=700&width=900',
    flag: '🇮🇹',
  },
  {
    id: '#JZ5',
    name: 'Johann Zarco',
    country: 'France',
    team: 'LCR Honda',
    img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/804f0106-d53b-4052-bbd4-23e41f093ae6/rider-bio_johannzarco.png?height=400&width=600',
    flag: '🇫🇷',
  },
  {
    id: '#LM10',
    name: 'Luca Marini',
    country: 'Italy',
    team: 'Repsol Honda Team',
    img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/3a49cbe4-f2a9-4eb5-8e75-08b5387e6dea/rider-bio_lucamarini.png?height=400&width=600',
    flag: '🇮🇹',
  },
  {
    id: '#MV12',
    name: 'Maverick Viñales',
    country: 'Spain',
    team: 'Aprilia Racing',
    img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/5cc9bb88-4d65-4498-9808-f36bde7936f1/rider-bio_maverickvin-ales.png?height=400&width=600',
    flag: '🇪🇸',
  },
  {
    id: '#FQ20',
    name: 'Fabio Quartararo',
    country: 'France',
    team: 'Monster Energy Yamaha MotoGP',
    img: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/80de8d72-d1b8-4b41-90b0-928467018ced/rider-bio_fabioquartararo.png?height=400&width=600',
    flag: '🇫🇷',
  },
];

const RiderGrid = () => {
  return (
    <>
      <div className="mb-4">
        <div className="container-fluid team__container">
          <div className="team__header-container">
            <h1 className="team__title">Riders</h1>
          </div>
        </div>
      </div>
      <div className="rider-grid">
        {riders.map((rider) => (
          <div className="rider-card" key={rider.id}>
            <img className="rider-card__image" src={rider.img} alt={rider.name} />
            <div className="rider-card__info">
              <span className="rider-card__id">{rider.id}</span>
              <h3 className="rider-card__name">{rider.name}</h3>
              <span className="rider-card__country">
                {rider.flag} {rider.country}
              </span>
              <span className="rider-card__team">{rider.team}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RiderGrid;
