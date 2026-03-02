import React from 'react'

const Select = ({children, placeholder}: any) => {
  return (
    <select className="border border-gray-400 rounded-2xl px-4 py-2.5 focus:outline-none focus:border-gray-800">
        <option value="">{placeholder}</option>
        {children}
    </select>
  )
}

export default Select