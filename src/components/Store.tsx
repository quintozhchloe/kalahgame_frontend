import React from 'react';
import '../styles/Store.css'; // 确保路径正确

interface StoreProps {
  seeds: number;
}

const Store: React.FC<StoreProps> = ({ seeds }) => {
  return (
    <div className="store">
      {seeds}
    </div>
  );
};

export default Store;
