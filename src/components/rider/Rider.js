import React, { useState } from 'react';
import './App.css';

// Rider Component
const Rider = ({ name, hashtag, country, team, image }) => {
  return (
    <a className="rider-list__rider" href={`/riders/${name.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="rider-list__image-container">
        <img
          className="rider-list__image js-image placeholder"
          src={image}
          alt={name}
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

  return (
    <div className={`rider-grid__${category} js-listing-container ${isActive ? '' : 'u-hide'}`}>
      <div className="rider-list__container js-lazy-load-images">
        {riderTypes.map((type) => (
          <React.Fragment key={type}>
            <h2 className="rider-list__career-type rider-grid__title">
              {type === 'official'
                ? 'Official'
                : type === 'wildcards'
                ? 'Wildcards And Test Riders'
                : 'Substitute'}
            </h2>
            <div className="rider-row-container">
              {riders
                .filter((rider) => rider.category === category && rider.type === type)
                .reduce((rows, rider, index) => {
                  const rowIndex = Math.floor(index / 5);
                  if (!rows[rowIndex]) {
                    rows[rowIndex] = [];
                  }
                  rows[rowIndex].push(<Rider key={rider.id} {...rider} />);
                  return rows;
                }, [])
                .map((row, rowIndex) => (
                  <div key={rowIndex} className="rider-row">
                    {row}
                  </div>
                ))}
            </div>
          </React.Fragment>
        ))}
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

export default App;
