import React from 'react'
import { ImSpinner3 } from 'react-icons/im'

export const Submit = ({ value, busy, type, onClick, className }) => {
  return (
    <button
      type={type || 'submit'}
      className={
        ' w-full rounded bg-black text-white hover:opacity-50 dark:bg-white dark:hover:bg-opacity-50 dark:text-secondary transition font-semibold text-lg p-2 ' +
        className
      }
      value={value}
      onClick={onClick}
    >
      {busy ? <ImSpinner3 /> : value}
    </button>
  )
}
