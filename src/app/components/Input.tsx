import React from 'react'

const Input = ({ type, placeholder, value, onChange }: any) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-400 rounded-2xl px-4 py-2 focus:outline-none focus:border-gray-800"
      required
    />
  )
}

export default Input