import React from 'react'

const PrimaryButton = ({children}: any) => {
  return (
    <div className="bg-primary-hover text-white text-center px-6 py-3 rounded-2xl hover:-translate-y-1 transition cursor-pointer">
        {children}
    </div>
  )
}

export default PrimaryButton