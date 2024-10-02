import React from 'react';
import '../styles/Pit.css';

interface PitProps {
  seeds: number;
  onClick: () => void;
}

const Pit: React.FC<PitProps> = ({ seeds, onClick }) => {
  return (
    <div className="pit" onClick={onClick}>
      {seeds}
    </div>
  );
};

export default Pit;
