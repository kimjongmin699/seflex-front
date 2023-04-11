import React from 'react'

export default function GridContainer({ children, className }) {
  return (
    <div className={'flex flex-row space-x-5  ' + className}>{children}</div>
  )
}
