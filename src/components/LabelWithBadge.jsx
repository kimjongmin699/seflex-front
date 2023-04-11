import React from 'react'
import Label from './Label'

const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
  const renderBadge = () => {
    if (!badge) return null
    return (
      <span className="dark:bg-dark-subtle translate-x-5 text-xs -translate-y-1 bg-light-subtle absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center text-white">
        {badge <= 9 ? badge : '9+'}
      </span>
    )
  }
  return (
    <div className="relative">
      <Label htmlFor={htmlFor}>{children}</Label>
      {renderBadge()}
    </div>
  )
}

export default LabelWithBadge
