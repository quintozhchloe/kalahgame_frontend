import React from 'react';
import storeImage from '../assets/store.png'; // 确保路径正确

const StoreComponent: React.FC = () => {
  return (
    <div className="store">
      <img src={storeImage} alt="Store" />
    </div>
  );
};

export default StoreComponent;