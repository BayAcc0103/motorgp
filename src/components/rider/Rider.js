import React, { useState } from 'react';
import './Rider.css';
import riderImage from './asset/riderr.png'; // Import the rider image

// Rider Component
const Rider = () => {
  return (
    <div>
      <div className="mb-4">
        <div className="container-fluid team__container">
          <div className="team__header-container">
            <h1 className="team__title">Riders</h1>
          </div>
        </div>
      </div>
      <a className="rider-list__rider">
        <div className="rider-list__image-container">
          <img
            className="rider-list__image js-image placeholder"
            src={riderImage} // Use the image prop
            alt={'Francesco Bagnaia'}
          />
          <div className="rider-list__info-container">
            <span className="rider-list__info-hashtag">hashtag</span>
            <div className="rider-list__info-name">
              {'Francesco Bagnaia'}
            </div>
            <div className="rider-list__details-container">
              <span className="rider-list__details-country">
                country
              </span>
              <span className="rider-list__details-team">team</span>
            </div>
          </div>
        </div>
      </a>
      <div className={`rider-grid__ js-listing-container `}>
        <div className="rider-list__container js-lazy-load-images">
          <h2 className="rider-list__career-type rider-grid__title">
          </h2>
          <div className="rider-row-container">
          </div>
        </div>
      </div>
    </div>
  );
};
export default Rider;
// RiderGrid Component
// TabsHeader Component
// Main App Component
