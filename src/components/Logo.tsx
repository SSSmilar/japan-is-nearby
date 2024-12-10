import React from 'react';

const Logo = () => {
  return (
    <div className="relative w-12 h-12 animate-planet-rotate">
      <div className="absolute inset-0 bg-black rounded-full">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white opacity-20 rounded-full transform -rotate-45"></div>
      </div>
    </div>
  );
};

export default Logo;