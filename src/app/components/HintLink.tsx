import Link from 'next/link'
import React from 'react'

const HintLink = ({href, children}: any) => {
  return (
    <Link href={href} className="text-gray-500 hover:text-black transition-all">{children}</Link>
  )
}

export default HintLink