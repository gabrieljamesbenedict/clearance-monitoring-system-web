import React from 'react'

const Select = ({children, placeholder, value, onChange}: any) => {
  return (
    <select className="w-full min-w-0 border border-gray-400 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-gray-800 overflow-x-visible truncate"
      value={value}
      onChange={onChange}
    >
        <option value="">{placeholder}</option>
        {children}
    </select>
  )
}

export default Select