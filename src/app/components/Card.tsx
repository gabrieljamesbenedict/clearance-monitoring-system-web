import React from 'react'

const Card = ({ children, width = "40%" }: any) => {
  return (
    <div
      style={{ width }}
      className="p-4 mx-auto my-16 bg-background-card rounded-xl shadow-2xs"
    >
      {children}
    </div>
  );
};

export default Card