import React from 'react'
import { ImTree } from 'react-icons/im'

export default function GenresSelector({ badge, onClick }) {
  const renderBadge = () => {
    if (!badge) return null
    return (
      <span className="dark:bg-dark-subtle translate-x-5 text-xs -translate-y-1 bg-light-subtle absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center text-white">
        {badge <= 9 ? badge : '9+'}
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex dark:text-dark-subtle py-1 px-3 rounded items-center space-x-2 p-1 border-2 dark:border-dark-subtle border-light-subtle dark:hover:border-white hover:border-primary transition text-light-subtle hover:text-primary dark:hover:text-white"
    >
      <ImTree />
      <span>Select Genres</span>
      {renderBadge()}
    </button>
  )
}
