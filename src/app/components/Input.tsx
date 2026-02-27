import React from 'react'

const Input = ({ type, placeholder }: any) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border border-gray-400 rounded-2xl px-4 py-2 focus:outline-none focus:border-gray-800"
    />
  );
};

export default Input