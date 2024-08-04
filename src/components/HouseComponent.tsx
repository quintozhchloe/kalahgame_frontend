import React from 'react';
import houseImage from '../assets/house.png'; 

const HouseComponent: React.FC = () => {
  return (
    <div className="house">
      <img src={houseImage} alt="House" />
    </div>
  );
};

export default HouseComponent;
