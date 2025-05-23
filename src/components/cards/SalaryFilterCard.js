import React, { useState } from "react";
import Slider from "react-slider";
import "../../stylesheets/EmpFilter.css";

// SalaryFilterCard.jsx
const SalaryFilterCard = ({ salaryRange, onSalaryChange }) => {
  return (
    <div className="salary-filter-container">
      <Slider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        min={2}
        max={20}
        step={0.5}
        value={salaryRange}
        onChange={onSalaryChange}
      />
      <div className="salary-range-values">
        <span>Min: ₹{salaryRange[0]}L</span>
        <span>Max: ₹{salaryRange[1]}L</span>
      </div>
    </div>
  );
};


export default SalaryFilterCard;
