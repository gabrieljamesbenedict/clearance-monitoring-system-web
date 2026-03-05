import React from 'react'

const Cell = ({children}: any) => {
  return (
    <td className="p-4">{children}</td>
  )
}

export default Cell