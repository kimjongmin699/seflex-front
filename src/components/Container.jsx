import React from 'react'

export const Container = ({ children, className }) => {
  return (
    <div className={'max-w-screen-xl mx-auto py-2 ' + className}>
      {children}
    </div>
  )
}
