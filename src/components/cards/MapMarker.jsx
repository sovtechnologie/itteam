import React from 'react';
import '../../stylesheets/MapMarker.css';

const MapMarker = () => {
  return (
    <div className="wrapper">
    <div className="marker">
      <div className="inner-circle">01</div>
    </div>
    <div className="road">
      <div className="dash" />
      <div className="dash" />
      <div className="dash" />
    </div>
    <div className="shadow" />
  </div>
  );
};

export default MapMarker;
