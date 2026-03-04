import React from 'react'

const Card = ({ children}: any) => {
  return (
    <div className="min-w-[30%] p-4 mx-auto my-16 bg-background-card rounded-xl shadow-xl text-center">
      {children}
    </div>
  );
};

export default Card