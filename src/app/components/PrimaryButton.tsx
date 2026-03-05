import React from 'react'

const PrimaryButton = ({children, active = true, onClick}: any) => {
  const styling = (active ? "bg-primary-hover hover:-translate-y-1 transition cursor-pointer " : "bg-gray-400 ") + "text-white text-center px-6 py-3 rounded-2xl";
  return (
    <div 
      className={styling}
      onClick={onClick}
    >
        {children}
    </div>
  )
}

export default PrimaryButton