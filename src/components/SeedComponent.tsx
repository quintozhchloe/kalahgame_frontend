import React from 'react';
import seedImage from '../assets/seed.png'; 

const SeedComponent: React.FC = () => {
  return (
    <div className="seed">
      <img src={seedImage} alt="Seed" />
    </div>
  );
};

export default SeedComponent;
