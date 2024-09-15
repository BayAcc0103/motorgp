import React, { useState } from 'react';
import './Rider.css';

// Rider Component
const Rider = ({ name, hashtag, country, team, image}) => {
  return (
    <a className="rider-list__rider" href={`/riders/${name.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="rider-list__image-container">
        <div
          className="rider-list__image js-image placeholder"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div className="rider-list__info-container">
        <span className="rider-list__info-hashtag">#{hashtag}</span>
        <div className="rider-list__info-name">
          {name}
        </div>
        <div className="rider-list__details-container">
          <span className="rider-list__details-country">
            {country}
          </span>
          <span className="rider-list__details-team">{team}</span>
        </div>
      </div>
    </a>
  );
};

// RiderGrid Component
const RiderGrid = ({ category, riders, isActive }) => {
  const riderTypes = category === 'motoe' ? ['official'] : ['official', 'wildcards', 'substitute'];
  const riderGroups = riderTypes.reduce((groups, type) => {
    const filteredRiders = riders.filter(
      (rider) => rider.category === category && rider.type === type
    );

    // Add riders to their respective groups
    if (filteredRiders.length > 0) {
      groups[type] = filteredRiders;
    }

    return groups;
  }, {});

  return (
    <div className={`rider-grid__${category} js-listing-container ${isActive ? '' : 'u-hide'}`}>
      <div className="rider-list__container js-lazy-load-images">
        {Object.entries(riderGroups).map(([type, ridersOfType]) => {
          return (
            <div key={type}>
              {/* Display full title names */}
              <h2 className="rider-list__career-type rider-grid__title">
                {type === 'official'
                  ? 'Official'
                  : type === 'wildcards'
                  ? 'Wildcards And Test Riders'
                  : 'Substitute'}
              </h2>

              {/* Render riders in rows of 5 */}
              <div className="rider-row-container">
                {ridersOfType.reduce((rows, rider, index) => {
                  const rowIndex = Math.floor(index / 5); // Calculate row index

                  // Create a new row if it doesn't exist
                  if (!rows[rowIndex]) {
                    rows[rowIndex] = [];
                  }

                  // Add rider to the current row
                  rows[rowIndex].push(<Rider key={rider.id} {...rider} />);

                  return rows;
                }, []).map((row, rowIndex) => (
                  <div key={rowIndex} className="rider-row">
                    {row}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// TabsHeader Component
const TabsHeader = ({ activeTab, onTabChange }) => {
  const tabs = ['MotoGP', 'Moto2', 'Moto3', 'MotoE'];

  return (
    <div className="tabs-header js-lazy-load-images" data-widget="tab-menu/tab-menu" data-results-standings-sponsored="false">
      <nav className="tabs widget-outer-spacing" aria-label="MotoGP, Moto2, Moto3, MotoE Tabs" role="navigation">
        <ul className="tabs__list js-dynamic-list">
          {tabs.map((tab) => (
            <li key={tab} className="tabs__item">
              <a
                href={`/en/${tab.toLowerCase()}`}
                className={`tabs__link ${activeTab === tab ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange(tab);
                }}
              >
                <span className="tabs__link-text">{tab}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};



// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('MotoGP');
  const [riders, setRiders] = useState([
    // MotoGP Riders
    {
      id: 1,
      name: 'Francesco Bagnaia',
      hashtag: 'FB1',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/3a568eee-1e12-4091-b120-f53c71cbe8f6/rider-bio_francescobagnaia.png?height=400&width=600',
      country: 'Italy',
      team: 'Ducati Lenovo Team',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 2,
      name: 'Johann Zarco',
      hashtag: 'JZ5',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/804f0106-d53b-4052-bbd4-23e41f093ae6/rider-bio_johannzarco.png?height=400&width=600',
      country: 'France',
      team: 'LCR Honda',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 3,
      name: 'Luca Marini',
      hashtag: 'LM10',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/3a49cbe4-f2a9-4eb5-8e75-08b5387e6dea/rider-bio_lucamarini.png?height=400&width=600',
      country: 'Italy',
      team: 'Respol Honda Team',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 4,
      name: 'Maverick Viñales',
      hashtag: 'MV12',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/5cc9bb88-4d65-4498-9808-f36bde7936f1/rider-bio_maverickvin-ales.png?height=400&width=600',
      country: 'Spain',
      team: 'Aprilia Racing',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 5,
      name: 'Fabio Quartararo',
      hashtag: 'FQ20',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/80de8d72-d1b8-4b41-90b0-928467018ced/rider-bio_fabioquartararo.png?height=400&width=600',
      country: 'France',
      team: 'Monster Energy Yamaha MotoGP™',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 6,
      name: 'Franco Morbidelli',
      hashtag: 'FM21',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/07/0185f144-d78f-4880-9d4c-1fc70aef68dd/21-Franco-Morbidelli-Official-Rider_DSC9540.png?height=400&width=600',
      country: 'Italy',
      team: 'Prima Pramac Racing',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 7,
      name: 'Enea Bastianini',
      hashtag: 'EB23',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/ca002749-a487-432f-879e-e44969678daa/rider-bio_eneabastianini.png?height=400&width=600',
      country: 'Italy',
      team: 'Ducati Lenovo Team',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 8,
      name: 'Raul Fernandez',
      hashtag: 'RF25',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/08/02/e1d21120-21e6-43c8-83f0-2707634800a7/25-Raul-Fernandez-MotoGPrider.png?height=400&width=600',
      country: 'Spain',
      team: 'Trackhouse Racing',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 9,
      name: 'Takaaki Nakagami',
      hashtag: 'TN30',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/08f27eee-d7f1-4e4d-a94f-f6b205d15b92/rider-bio_takaakinakagami.png?height=400&width=600',
      country: 'Japan',
      team: 'LCR Honda',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 10,
      name: 'Pedro Acosta',
      hashtag: 'PA31',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/e55a04e0-8d1f-4041-982b-b913f1296866/Jo8FzsJQ.png?height=400&width=600',
      country: 'Spain',
      team: 'Red Bull GASGAS Tech3',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 11,
      name: 'Brad Binder',
      hashtag: 'BB33',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/664d8e67-65b0-4196-9cc0-47fb5f64efa3/rider-bio_bradbinder.png?height=400&width=600',
      country: 'South Africa',
      team: 'Red Bull KTM Factory Racing',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 12,
      name: 'Joan Mir',
      hashtag: 'JM36',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/c745a780-c0bc-46a0-9d6e-81a45ca2fde4/rider-bio_joanmir.png?height=400&width=600',
      country: 'Spain',
      team: 'Repsol Honda Team',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 13,
      name: 'Augusto Fernandez',
      hashtag: 'AF37',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/ca63d1a8-f726-4e7b-85ab-708328c03aed/rider-bio_augustofernandez.png?height=400&width=600',
      country: 'Spain',
      team: 'Red Bull GASGAS Tech3',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 14,
      name: 'Aleix Espargaro',
      hashtag: 'AE41',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/3d370545-be6a-429f-a8f6-0c8c571a5f98/rider-bio_aleixespargaro.png?height=400&width=600',
      country: 'Spain',
      team: 'Aprilia Racing',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 15,
      name: 'Alex Rins',
      hashtag: 'AR42',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/20/1d8c150c-b9dc-4db7-b70e-37b0f28949bd/rider-bio_alexrins.png?height=400&width=600',
      country: 'Spain',
      team: 'Monster Energy Yamaha MotoGP™',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 16,
      name: 'Jack Miller',
      hashtag: 'JM43',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/f1fa7ffe-e8f3-479a-8282-4df3b2684e67/rider-bio_jackmiller.png?height=400&width=600',
      country: 'Australia',
      team: 'Red Bull KTM Factory Racing',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 17,
      name: 'Fabio Di Giannantonio',
      hashtag: 'FD49',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/4088be73-b443-4648-b1e9-cf184b3bc7a3/rider-bio_fabiodigiannantonio.png?height=400&width=600',
      country: 'Italy',
      team: 'Pertamina Enduro VR46 Racing Team',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 18,
      name: 'Marco Bezzecchi',
      hashtag: 'MB72',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/3887ea28-9d8a-4acb-99cf-2e8f25caa5bb/rider-bio_marcobezzecchi.png?height=400&width=600',
      country: 'Italy',
      team: 'Pertamina Enduro VR46 Racing Team',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 19,
      name: 'Alex Marquez',
      hashtag: 'AM73',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/2c1e0ebb-a3b6-4add-9378-8d5797e593c8/rider-bio_alexmarquez.png?height=400&width=600',
      country: 'Spain',
      team: 'Gresini Racing MotoGP™',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 20,
      name: 'Miguel Oliveira',
      hashtag: 'MO88',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/08/02/667c8748-1e0e-492f-a659-ac404321141d/88-Miguel-Oliveira-MotoGP_rider.png?height=400&width=600',
      country: 'Portugal',
      team: 'Trackhouse Racing',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 21,
      name: 'Jorge Martin',
      hashtag: 'JM89',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/07/2b32c79b-826b-4371-b357-3504438f4973/89-Jorge-Martin-Official-Rider_DSC9358.png?height=400&width=600',
      country: 'Spain',
      team: 'Prima Pramac Racing',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 22,
      name: 'Marc Marquez',
      hashtag: 'MM93',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/02/19/986b0e12-1db0-49d8-ae13-fd556286237a/93_Marc_MarquezFullbodyGresini.png?height=400&width=600',
      country: 'Spain',
      team: 'Repsol Honda Team',
      category: 'motogp',
      type: 'official',
    },
    {
      id: 23,
      name: 'Stefan Brad',
      hashtag: 'SB6',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/04/26/9e4ab37a-c749-48e8-b88c-e2671ce61564/06-Stefan-Bradl-MotoGP_DS_8474.png?height=400&width=600',
      country: 'Germany',
      team: 'HRC Test Team',
      category: 'motogp',
      type: 'wildcards',
    },
    {
      id: 24,
      name: 'Dani Pedrosa',
      hashtag: 'DP26',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/04/26/212ad292-fbf3-4995-8335-e695ac2e43f7/26-Dani-Pedrosa-MotoGP_DS_8489.png?height=400&width=600',
      country: 'Spain',
      team: 'Red Bull KTM Tech3',
      category: 'motogp',
      type: 'wildcards',
    },
    {
      id: 25,
      name: 'Lozenro Savadori',
      hashtag: 'LS32',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/04/26/aae28908-f59b-4dcc-85ce-6c834ecae6ce/32-Lorenzo-Savadori-MotoGP_LG94217.png?height=400&width=600',
      countries: 'Italy',
      team: 'Ducati Lenovo Team',
      category: 'motogp',
      type: 'wildcards',
    },
    {
      id: 26,
      name: 'Pol Espargaro',
      hashtag: 'PE44',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/05/31/de9940f5-3747-4324-b58f-97bb21432750/44_Pol_Espargaro_MotoGP_DS_4269.png?height=400&width=600',
      countries: 'Spain',
      team: 'Red Bull KTM Factory Racing',
      category: 'motogp',
      type: 'wildcards',
    },
    {
      id: 27,
      name: 'Remy Gardner',
      hashtag: 'RG87',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/07/05/0c059289-b627-470c-a72c-2f508bda4486/87-Remy-Gardner-MotoGPLGZ_9718.png?height=400&width=600',
      countries: 'Australia',
      team: 'Monster Energy Yamaha MotoGP™',
      category: 'motogp',
      type: 'substitute',
    },

    // Moto2 Riders
    {
      id: 28,
      name: 'Sergio Garcia',
      hashtag: 'SG3',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/896c8377-4c5b-4141-8562-c07b4d78c9d7/03_Sergio_Garcia_Moto2_Rider_DS_3364.png?height=400&width=600',
      country: 'Spain',
      team: 'MT Helmets - MSI',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 29,
      name: 'Jaume Masia',
      hashtag: 'JM5',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/07/30/8eb5e268-d0de-480f-aedc-bd87d77d6459/05-Jaume-Masia-Moto2_DS_9704.png?height=400&width=600',
      country: 'Spain',
      team: 'Preicanos Racing Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 30,
      name: 'Barry Baltus',
      hashtag: 'BB7',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/4df5d1bf-9e48-458e-8648-b33ea5997f8c/07_Barry_Baltus_Moto2_Rider_DS_2844.png?height=400&width=600',
      country: 'Belgium',
      team: 'RW Racing GP',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 31,
      name: 'Diogo Moreira',
      hashtag: 'DM10',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/a359eb64-874f-4872-991d-ae7be18f2371/10_Diogo_Moreira_Moto2_Rider_DS_3050.png?height=400&width=600',
      country: 'Brazil',
      team: 'Itraltrans Racing Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 32,
      name: 'Alex Escrig',
      hashtag: 'AE11',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/08756729-c9f6-4d50-bb41-4f1cbb71cfc0/11_Alex_Escrig_Moto2_Rider_DS_2368.png?height=400&width=600',
      country: 'Spain',
      team: 'KLINT Forward Factory Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 33,
      name: 'Filip Salac',
      hashtag: 'FS12',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/f24841fb-9533-42c7-9904-4098e7088023/12_Filip_Salac_Moto2_Rider_DS_3407.png?height=400&width=600',
      country: 'Czechia',
      team: 'ELF Marc VDS Racing Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 34,
      name: 'Celestino Vietti',
      hashtag: 'CV13',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/567225dc-a177-44c8-8200-90c263287090/13_Celestino_Vietti_Moto2_Rider_DS_2709.png?height=400&width=600',
      country: 'Italy',
      team: 'Red Bull KTM Ajo',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 35,
      name: 'Tony Arbolino',
      hashtag: 'TA14',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/1a988d8f-6237-4733-9795-b3469e91d691/14_Tony_Arbolino_Moto2_Rider_DS_2778.png?height=400&width=600',
      country: 'Italy',
      team: 'ELF Marc VDS Racing Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 36,
      name: 'Darryn Binder',
      hashtag: 'DB15',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/64248d91-943c-4c0e-9e66-0e4e0f421a1a/15_Darryn_Binder_Moto2_Rider_DS_2619.png?height=400&width=600',
      country: 'South Africa',
      team: 'Liqui Moly Husqvarna Intact GP',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 37,
      name: 'Joe Roberts',
      hashtag: 'DB15',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/07/b404a2fe-fc43-48f0-b0cf-779f1a0ebfef/16-Joe-Roberts-Moto2-Rider-DS-2564.png?height=400&width=600',
      ccountry: 'United States of America',
      team: 'OnlyFans American Racing Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 38,
      name: 'Manuel González',
      hashtag: 'MG18',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/7294e7b9-a2cc-4d2e-b245-1dfad4b05ca7/18_Manuel_Gonzalez_Moto2_Rider_DS_2158.png?height=400&width=600',
      country: 'Spain',
      team: 'QJMOTOR GreSini Moto2™',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 39,
      name: 'Xavi Cardelus',
      hashtag: 'XC20',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/33a19b23-406b-429e-a84c-fdba2c20788e/20_Xavier_Cardelus_Moto2_Rider_DS_2699.png?height=400&width=600',
      country: 'Andorra',
      team: 'Fantic Racing',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 40,
      name: 'Alonso Lopez',
      hashtag: 'AL21',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/09/06/0de84602-52b0-4125-b686-5dbce7e267e0/21-Alonso-Lopez-Rider-Web.png?height=400&width=600',
      country: 'Spain',
      team: 'SpeedUp Racing',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 41,
      name: 'Ayumu Sasaki',
      hashtag: 'AS22',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/6455fe3c-f072-483f-8847-46d3f61a9297/22_Ayumu_Sasaki_Moto2_Rider_DS_3135.png?height=400&width=600',
      country: 'Japan',
      team: 'Yamaha VR46 Master Camp Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 42,
      name: 'Marcos Ramirez',
      hashtag: 'MR24',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/6adda1ae-5881-4578-aed7-edf8cf452695/24_Marcos_Ramirez_Moto2_Rider_DS_2542.png?height=400&width=600',
      country: 'Spain',
      team: 'OnlyFans American Racing Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 43,
      name: 'Ivan Guevara',
      hashtag: 'IG28',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/a6a0c6b6-bf9a-44ef-944f-7e9a19d572e2/28_Izan_Guevara_Moto2_Rider_DS_2995.png?height=400&width=600',
      country: 'Spain',
      team: 'CFMOTO Aspar Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 44,
      name: 'Mario Suryo Aji',
      hashtag: 'MA34',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/08/d5db13d0-3ff2-4cc3-8ff8-f459de723774/34_Mario_Suryo_Aji_Moto2_DS_3587.png?height=400&width=600',
      country: 'Indonesia',
      team: 'IDEMITSU Honda Team Asia',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 45,
      name: 'Somkiat Chantra',
      hashtag: 'SC35',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/c0962763-c847-490d-ae6c-39598ce9060f/35_Somkiat_Chantra_Moto2_Rider_DS_3176.png?height=400&width=600',
      country: 'Thailand',
      team: 'IDEMITSU Honda Team Asia',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 46,
      name: 'Xavier Artigas',
      hashtag: 'XA43',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/6f3adbd1-e9de-4fbb-9345-8a6b64278665/43_Xavier_Artigas_Moto2_Rider_DS_2388.png?height=400&width=600',
      country: 'Spain',
      team: 'KLINT Forward Factory Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 47,
      name: 'Aron Canet',
      hashtag: 'AC44',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/328b1ebf-e1e1-4ba2-ac26-15cb87a77d7b/44_Aron_Canet_Moto2_Rider_DS_2649.png?height=400&width=600',
      country: 'Spain',
      team: 'Fantic Racing',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 48,
      name: 'Deniz Öncü',
      hashtag: 'DO53',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/d536c25b-8fe2-4cc5-a503-f1ee59d19c0a/53_Deniz_Oncu_Moto2_Rider_DS_2747.png?height=400&width=600',
      country: 'Turkey',
      team: 'Red Bull KTM Ajo',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 49,
      name: 'Fermin Aldeguer',
      hashtag: 'FA54',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/09/06/29afec8b-e512-4f17-bde5-fc1f6afc3660/54-Fermin-Aldeguer-Rider-Web.png?height=400&width=600',
      country: 'Spain',
      team: 'SpeedUp Racing',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 50,
      name: 'Bo Bendsneyder',
      hashtag: 'BB64',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/06/28/27e00cac-0bb3-4fc2-a60a-6d1f7928f098/64-Bo-Bendsneyder-Moto2_DS_9692.png?height=400&width=600',
      country: 'Netherlends',
      team: 'Preicanos Racing Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 51,
      name: 'Dennis Foggia',
      hashtag: 'DF71',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/aac2b8fc-3e78-4f6c-9928-4def7eef82ea/71_Dennis_Foggia_Moto2_Rider_DS_3026.png?height=400&width=600',
      country: 'Italy',
      team: 'Italtrans Racing Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 52,
      name: 'Albert Arenas',
      hashtag: 'AA75',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/08/bb29bb0f-a16b-489a-8fe5-5ad37457888f/75_Albert_Arenas_Moto2_Rider_DS_2799.png?height=400&width=600',
      country: 'Spain',
      team: 'QJMOTOR GreSini Moto2™',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 53,
      name: 'Ai Ogura',
      hashtag: 'AO79',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/5249a552-e1b7-444a-a3bf-763814a50b0d/79_Ai_Ogura_Moto2_Rider_DS_3385.png?height=400&width=600',
      country: 'Japan',
      team: 'MT Helmets - MSI',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 54,
      name: 'Senna Agius',
      hashtag: 'SA81',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/c67b4327-2b6a-4b3a-9a40-32c077059ef9/81_Senna_Agius_Moto2_Rider_DS_2586.png?height=400&width=600',
      country: 'Australia',
      team: 'Liqui Moly Husqvarna Intact GP',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 55,
      name: 'Zonta Van Den Goorbergh',
      hashtag: 'ZG84',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/d3767e18-f5b9-40f0-b137-4f910101e2cb/84_Zonta_van_den_Goorbergh_Moto2_Rider_DS_2836.png?height=400&width=600',
      country: 'Netherlands',
      team: 'RW Racing GP',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 56,
      name: 'Jake Dixon',
      hashtag: 'JD96',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/d3535a36-5850-4b72-b62a-10ee8cee83f3/96_Jake_Dixon_Moto2_Rider_DS_2970.png?height=400&width=600',
      country: 'United Kingdom',
      team: 'CFMOTO Aspar Team',
      category: 'moto2',
      type: 'official',
    },
    {
      id: 57,
      name: 'Jorge Navarro',
      hashtag: 'JN9',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/04/26/52fbcc48-be51-4c88-a1cf-0a1d04d33e80/09-Jorge-Navarro-Moto2_DS_8458.png?height=400&width=600',
      country: 'Spain',
      team: 'KLINT Forward Factory Team',
      category: 'moto2',
      type: 'wildcards',
    },
    {
      id: 58,
      name: 'Daniel Muñoz',
      hashtag: 'DM17',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/06/28/2bb2c7fa-b011-4878-b815-ffc8b7059d30/17-Daniel-Mu-oz-Moto2_DS_9719.png?height=400&width=600',
      country: 'Spain',
      team: 'Preicanos Racing Team',
      category: 'moto2',
      type: 'wildcards',
    },
    {
      id: 59,
      name: 'Mattia Pasini',
      hashtag: 'MP19',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/05/24/fdc2ca70-e0b1-4275-aff0-6c75d2f725e1/19-Mattia-Pasini-Moto2_DS_2695.png?height=400&width=600',
      country: 'Italy',
      team: 'Team Ciatti Boscoscuro',
      category: 'moto2',
      type: 'wildcards',
    },
    {
      id: 60,
      name: 'Matteo Ferarri',
      hashtag: 'MF23',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/04/26/0cbf4c97-a34c-497b-9e74-83a1af461305/23-Matteo-Ferrari-Moto2_LG94081.png?height=400&width=600',
      country: 'Italy',
      team: 'QJMOTOR GreSini Moto2™',
      category: 'moto2',
      type: 'wildcards',
    },
    {
      id: 61,
      name: 'Roberto Garcia',
      hashtag: 'RG31',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/07/05/e486d690-f86a-4304-91cf-d7bba36a5285/31-Roberto-Garcia-Moto2LGZ_9690.png?height=400&width=600',
      country: 'Spain',
      team: 'Fantic Racing',
      category: 'moto2',
      type: 'substitute',
    },
    {
      id: 62,
      name: 'Marcel Schrotter',
      hashtag: 'MS32',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/06/28/45b11572-4372-49c6-83bd-dab18c0e0303/32-Marcel-Schr-tter-Moto2_DS_9763.png?height=400&width=600',
      country: 'Germany',
      team: 'Red Bull KTM Ajo',
      category: 'moto2',
      type: 'substitute',
    },
    {
      id: 63,
      name: 'Unai Orradre',
      hashtag: 'UO40',
      image: '',
      country: 'Spain',
      team: 'KLINT Forward Factory Team',
      category: 'moto2',
      type: 'substitute',
    },
    // Moto3 Riders
    {
      id: 64,
      name: 'Tatchakorn Buasri',
      hashtag: 'TB5',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/1eeb9363-7595-4a81-ae69-8c466905bb92/05-Tatchakorn-Buasri-Moto3-Rider_DS_2498.png?height=400&width=600',
      country: 'Thailand',
      team: 'Honda Team Asia',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 65,
      name: 'Ryusei Yamanaka',
      hashtag: 'RY6',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/d1eb59a4-a80e-4069-a271-17cfd6535161/06_Ryusei_Yamanaka_Moto3_Rider_DS_3356.png?height=400&width=600',
      country: 'Japan',
      team: 'MT Helmets - MSI',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 66,
      name: 'Filippo Farioli',
      hashtag: 'FF7',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/d4c282b0-d05f-44c1-9af2-bac517e0f711/07_Filippo_Farioli_Moto3_Rider_DS_3284.png?height=400&width=600',
      country: 'Italy',
      team: 'SIC58 Squadra Corse',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 67,
      name: 'Nicola Carraro',
      hashtag: 'NC10',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/ebd4f197-fc3a-4b5a-84f5-19014900f94a/10-Nicola-Carraro-Moto3-Rider_DS_2429.png?height=400&width=600',
      country: 'Italy',
      team: 'MTA Team',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 68,
      name: 'Jacob Roulstone',
      hashtag: 'JR12',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/4ccab23a-3796-4efd-a02c-11dc9d98e60c/12-Jacob-Roulstone-Moto3-Rider_DS_2240.png?height=400&width=600',
      country: 'Australia',
      team: 'Red Bull GASGAS Tech3',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 69,
      name: 'Matteo Bertelle',
      hashtag: 'MB18',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/e2762d1b-85e1-459d-966b-7b036840bd5f/18-Matteo-Bertelle-Moto3-Rider_DS_2865.png?height=400&width=600',
      country: 'Italy',
      team: 'Kopron Rivacold Snipers Team',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 70,
      name: 'Scott Ogden',
      hashtag: 'SO19',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/e4feb93d-0161-4263-b6e7-954e9b10a78c/19-Scott-Ogden-Moto3-Rider_DS_3197.png?height=400&width=600',
      country: 'United Kingdom',
      team: 'MLav Racing',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 71,
      name: 'David Almansa',
      hashtag: 'DA22',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/5a94a705-5f37-47c3-860e-bf3a2be1535b/22-David-Almansa-Moto3-Rider_DS_2885.png?height=400&width=600',
      country: 'Spain',
      team: 'Kopron Rivacold Snipers Team',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 72,
      name: 'Tatsuki Suzuki',
      hashtag: 'TS24',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/df069738-0345-4a06-9191-55d1b1177132/24-Tatsuki-Suzuki-Moto3-Rider_DS_2213.png?height=400&width=600',
      country: 'Japan',
      team: 'Liqui Moly Husqvarna Intact GP',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 73,
      name: 'Adrian Fernandez',
      hashtag: 'AF31',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/93f176e9-cb83-442d-bff1-929ebfec327d/36-Angel-Piqueras-Moto3-Rider_DS_2411.png?height=400&width=600',
      country: 'Spain',
      team: 'Leopard Racing',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 74,
      name: 'Angel Piqueras',
      hashtag: 'AP36',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/93f176e9-cb83-442d-bff1-929ebfec327d/36-Angel-Piqueras-Moto3-Rider_DS_2411.png?height=400&width=600',
      country: 'Spain',
      team: 'Leopard Racing',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 75,
      name: 'Ivan Ortola',
      hashtag: 'IO48',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/5e9e686d-8d48-41e1-b1c5-2df4b6f874dd/48_Ivan_Ortola_Moto3_Rider_DS_3304.png?height=400&width=600',
      country: 'Spain',
      team: 'MT Helmets - MSI',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 76,
      name: 'Riccardo Rossi',
      hashtag: 'RR54',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/a52a3e8a-ca45-401c-96de-161ae8053c3c/54_Riccardo_Rossi_Moto3_Rider_DS_3092.png?height=400&width=600',
      country: 'Italy',
      team: 'CIP Green Power',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 77,
      name: 'Noah Dettwiler',
      hashtag: 'ND55',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/92459755-7bb2-496a-9b06-169f11fcc22c/55_Noah_Dettwiler_Moto3_Rider_DS_3072.png?height=400&width=600',
      country: 'Switzerland',
      team: 'CIP Green Power',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 78,
      name: 'Luca Lunetta',
      hashtag: 'LL58',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/c3ad908d-3c47-4e4d-9d0c-031d921e8d29/58_Luca_Lunetta_Moto3_Rider_DS_3238.png?height=400&width=600',
      country: 'Italy',
      team: 'SIC58 Squadra Corse',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 79,
      name: 'David Muñoz',
      hashtag: 'DM64',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/e22677ce-dc54-4440-8c25-bd2517dc6657/64_David_Mun-oz_Moto3_Rider_DS_3258.png?height=400&width=600',
      country: 'Spain',
      team: 'BOE Motorsports',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 80,
      name: 'Joel Kelso',
      hashtag: 'JK66',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/80c5fac6-dd96-496a-8d08-827875f14b0a/66_Joel_Kelso_Moto3_Rider_DS_3218.png?height=400&width=600',
      country: 'Australia',
      team: 'BOE Motorsports',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 81,
      name: 'Joshua Whatley',
      hashtag: 'JW70',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/07/cb0764dc-54bc-4c2f-8302-064a6df2f2b2/70-Joshua-Whatley-Moto3-Rider_DS_2520.png?height=400&width=600',
      country: 'United Kingdom',
      team: 'MLav Racing',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 82,
      name: 'Taiyo Furusato',
      hashtag: 'TF72',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/e422b8bc-eeaa-4246-b328-5fa3645c9948/72_Taiyo_Furusato_Moto3_Rider_DS_2476.png?height=400&width=600',
      country: 'Japan',
      team: 'Honda Team Asia',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 83,
      name: 'Joel Esteban',
      hashtag: 'JE78',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/ff6ed639-cf5a-420a-bb2c-cb079ecc6f82/78_Joel_Esteban_Moto3_Rider_DS_2906.png?height=400&width=600',
      country: 'Spain',
      team: 'CFMOTO Aspar Team',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 84,
      name: 'David Alonso',
      hashtag: 'DA80',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/6ba31c75-caca-4984-a91a-13db451bb4bd/80_David_Alonso_Moto3_Rider_DS_2926.png?height=400&width=600',
      country: 'Colombia',
      team: 'CFMOTO Aspar Team',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 85,
      name: 'Stefano Nepa',
      hashtag: 'SN82',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/da8bc71d-d2d1-4e43-98fc-d429e8b5137b/82_Stefano_Nepa_Moto3_Rider_DS_2948.png?height=400&width=600',
      country: 'Italy',
      team: 'MTA Team',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 86,
      name: 'Xabi Zurutuza',
      hashtag: 'XZ85',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/41e9c9cf-de97-45e4-aede-c4ca0790a6fb/85_Xabi_Zurutuza_Moto3_Rider_DS_2116.png?height=400&width=600',
      country: 'Spain',
      team: 'Red Bull KTM Ajo',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 87,
      name: 'Collin Veijer',
      hashtag: 'CV95',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/75c9d8ae-c3fa-480e-851f-0ff4f8f970c8/95_Collin_Veijer_Moto3_Rider_DS_2181.png?height=400&width=600',
      country: 'Netherlands',
      team: 'Liqui Moly Husqvarna Intact GP',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 88,
      name: 'Daniel Holgado',
      hashtag: 'DH96',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/05/6d2352e5-45c3-4cad-9e7d-04507bedcdbb/96_Daniel_Holgado_Moto3_Rider_DS_2220.png?height=400&width=600',
      country: 'Spain',
      team: 'Red Bull GASGAS Tech3',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 89,
      name: 'Jose Antonio Rueda',
      hashtag: 'JR99',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/06/c6222823-952c-4a51-a00d-57b60d1dbab0/99_Jose_Antonio_Rueda_Moto3_Rider_DS_3442.png?height=400&width=600',
      country: 'Spain',
      team: 'Red Bull KTM Ajo',
      category: 'moto3',
      type: 'official',
    },
    {
      id: 90,
      name: 'Jakob Rosenthaler',
      hashtag: 'JR34',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/08/16/84889353-b4f9-4231-8798-534fe7a3c1f5/34-Jakob-Rosenthaler_Moto3.png?height=400&width=600',
      country: 'Austria',
      team: 'Liqui Moly Husqvarna Intact GP',
      category: 'moto3',
      type: 'wildcards',
    },
    {
      id: 91,
      name: 'Arbi Aditama',
      hashtag: 'AA93',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/05/24/d7fd72fc-3927-48d5-8dfd-5fe7e3120bb2/93-Arbi-Aditama-Moto3_DS_2728.png?height=400&width=600',
      country: 'Indonesia',
      team: 'Honda Team Asia',
      category: 'moto3',
      type: 'wildcards',
    },
    {
      id: 92,
      name: 'Vicente Perez',
      hashtag: 'VP21',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/08/02/4a8a2d8f-d265-4910-90d1-7c058b69c513/21-Vicente-Perez-2.png?height=400&width=600',
      country: 'Spain',
      team: 'MLav Racing',
      category: 'moto3',
      type: 'substitute',
    },
    {
      id: 93,
      name: 'Danial Shahril',
      hashtag: 'DS57',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/08/02/f8b6bb45-4574-4ce8-8a20-9d8c103ce05c/57-Danial-Shahril-2.png?height=400&width=600',
      country: 'Malaysia',
      team: 'SIC58 Squadra Corse',
      category: 'moto3',
      type: 'substitute',
    },
    {
      id: 94,
      name: 'Hamad al-Sahouti',
      hashtag: 'HA71',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/23/442fb726-d9f1-4ccd-865f-dc33682ed868/71-Hamad-al-Sahouti-Moto31K0A5337.png?height=400&width=600',
      country: 'Qatar',
      team: 'Kopron Rivacold Snipers Team',
      category: 'moto3',
      type: 'substitute',
    },
    // MotoE Riders
    {
      id: 95,
      name: 'Lukas Tulovic',
      hashtag: 'LT3',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/21/7e338f43-a2dc-47a3-9937-076bf03cd890/03-Lukas-Tulovic-MotoE-Rider1K0A4935.png?height=400&width=600',
      country: 'Germany',
      team: 'Dynavolt Intact GP MotoE',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 96,
      name: 'Hector Garzo',
      hashtag: 'HG4',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/21/5472fe33-0127-48d5-9b83-24e9153f2455/04-Hector-Garzo-MotoE-Rider1K0A4956.png?height=400&width=600',
      country: 'Spain',
      team: 'Dynavolt Intact GP MotoE',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 97,
      name: 'Maria Herrera',
      hashtag: 'MH6',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/22/daa57cf9-1d1a-4396-87de-36a459d813cb/06-Maria-Herrera-MotoE-Rider1K0A5401.png?height=400&width=600',
      country: 'Spain',
      team: 'KLINT Forward Factory Team',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 98,
      name: 'Chaz Davies',
      hashtag: 'CD7',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/22/bb414a8e-debe-4523-9740-330e4f341351/07-Chaz-Davies-MotoE-Rider1K0A5202.png?height=400&width=600',
      country: 'United Kingdom',
      team: 'Aruba Cloud MotoE Racing Team',
      category: 'motoe',
    },
    {
      id: 99,
      name: 'Andrea Mantovani',
      hashtag: 'AM9',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/22/f0021bb5-4e22-4613-8b87-5a20ad73ecb4/09-Andrea-Mantovani-MotoE-Rider1K0A5447.png?height=400&width=600',
      country: 'Italy',
      team: 'KLINT Forward Factory Team',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 100,
      name: 'Matteo Ferarri',
      hashtag: 'MF11',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/21/d4f72eab-0be0-4d36-984d-332f334bec55/11-Matteo-Ferrari-MotoE-Rider1K0A5007.png?height=400&width=600',
      country: 'Italy',
      team: 'Felo Gresini MotoE',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 101,
      name: 'Kevin Zannoni',
      hashtag: 'KZ21',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/08/16/c8ad87ea-d83c-478c-af83-b8d27c898109/21-Kevin-Zannoni_MotoE.png?height=400&width=600',
      country: 'Italy',
      team: 'Openbank Aspar Team',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 102,
      name: 'Nicholas Spinelli',
      hashtag: 'NS29',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/22/ea814405-cf4c-4a26-a445-4d50b2a3ea55/29-Nicolas-Spinelli-MotoE-Rider1K0A5280.png?height=400&width=600',
      country: 'Italy',
      team: 'Tech3 E-Racing',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 103,
      name: 'Kevin Manfredi',
      hashtag: 'KM34',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/21/d053e608-26a7-4cf7-9bbf-783951fde977/34-Kevin-Manfredi-MotoE-Rider1K0A5032.png?height=400&width=600',
      country: 'Italy',
      team: 'Ongetta SIC58 Squadra Corse',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 104,
      name: 'Mattia Casadei',
      hashtag: 'MC40',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/21/0a8e11cb-e2f1-4a4e-af87-de8bcf47493e/40-Mattia-Casadei-MotoE1K0A5097.png?height=400&width=600',
      country: 'Italy',
      team: 'LCR E-Team',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 105,
      name: 'Eric Granado',
      hashtag: 'EG51',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/21/b6686387-798b-40be-b74f-bfc19908cc04/51_Eric_Granado_MotoE_Rider1K0A5078.png?height=400&width=600',
      country: 'Brazil',
      team: 'LCR E-Team',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 106,
      name: 'Massimo Roccoli',
      hashtag: 'MR55',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/21/f0414701-2599-4a3a-84cd-3af7c3195d86/55_Massimo_Roccoli_MotoE-Rider1K0A5054.png?height=400&width=600',
      country: 'Italy',
      team: 'Ongetta SIC58 Squadra Corse',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 107,
      name: 'Alessandro Zaccone',
      hashtag: 'AZ61',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/22/d72ff0c3-3339-4f9a-ab25-47c05d1f3997/61-Alessandro-Zaccone-MotoE-Rider1K0A5248.png?height=400&width=600',
      country: 'Italy',
      team: 'Tech3 E-Racing',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 108,
      name: 'Alessio Finello',
      hashtag: 'AF72',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/21/535a5e46-4b77-4824-8cb9-07744c653352/72-Alessio-Finello-MotoE-Rider1K0A4983.png?height=400&width=600',
      country: 'Italy',
      team: 'Felo Gresini MotoE',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 109,
      name: 'Miquel Pons',
      hashtag: 'MP77',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/22/121faf6e-821f-430c-8193-44ef836de01d/77-Miquel-Pons-MotoE-Rider1K0A5310.png?height=400&width=600',
      country: 'Spain',
      team: 'Axxis-MSI',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 110,
      name: 'Armando Pontone',
      hashtag: 'AP80',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/22/5652cd34-6fe6-4c93-8404-6edc30694415/80-Armando-Pontone-MotoE-Rider1K0A5218.png?height=400&width=600',
      country: 'Italy',
      team: 'Aruba Cloud MotoE Racing Team',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 111,
      name: 'Jordi Torres',
      hashtag: 'JT81',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/22/dc204c81-8f11-459c-8542-c0e1700c3e1e/81-Jordi-Torres-MotoE-Rider1K0A5153.png?height=400&width=600',
      country: 'Spain',
      team: 'Openbank Aspar Team',
      category: 'motoe',
      type: 'official',
    },
    {
      id: 112,
      name: 'Oscar Gutierrez',
      hashtag: 'OG99',
      image: 'https://resources.motogp.pulselive.com/photo-resources/2024/03/22/86d502f5-53f7-44f8-bdf3-c7e095957dc1/99-Oscar-Gutierrez-MotoE-Rider1K0A5369.png?height=400&width=600',
      country: 'Spain',
      team: 'Axxis-MSI',
      category: 'motoe',
      type: 'official',
    },
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="default-template">
      <div id="js-page-analytics" data-section="riders" data-page-type="hub"></div>
      <div className="rider-header">
        <div className="rider-header__header">
          <div className="page-header">
            <div className="page-header__container page-header__container--left">
              <h1 className="page-header__title">Riders & Teams</h1>
            </div>
          </div>
        </div>
      </div>

      <TabsHeader activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="rider-grid__container" data-widget="rider/grid">
        <RiderGrid category="motogp" riders={riders} isActive={activeTab === 'MotoGP'} />
        <RiderGrid category="moto2" riders={riders} isActive={activeTab === 'Moto2'} />
        <RiderGrid category="moto3" riders={riders} isActive={activeTab === 'Moto3'} />
        <RiderGrid category="motoe" riders={riders} isActive={activeTab === 'MotoE'} />
      </div>
    </div>
  );
};

export default Rider;
