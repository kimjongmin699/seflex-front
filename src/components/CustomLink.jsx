import React from 'react'
import { Link } from 'react-router-dom'

export const CustomLink = ({ to, children }) => {
  return (
    <Link className="text-dark-subtle hover:text-white transition">
      {children}
    </Link>
  )
}
