import Link from 'next/link'
import React from 'react'

const HintLink = ({href}: any) => {
  return (
    <Link href={href} className="text-gray-500 hover:text-black transition-all">Make an account</Link>
  )
}

export default HintLink