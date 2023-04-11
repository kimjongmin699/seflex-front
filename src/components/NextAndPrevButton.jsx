import React from 'react'

export default function NextAndPrevButton({
  handleOnNextClick,
  handleOnPrevClick,
  className='',
}) {
  const getClasses = () => {
    return 'flex justify-end items-center space-x-3 mt-5'
  }
  return (
    <div className={getClasses() + className}>
      <Button title="Prev" onClick={handleOnPrevClick} />
      <Button title="Next" onClick={handleOnNextClick} />
    </div>
  )
}

const Button = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-primary dark:text-white hover:underline "
    >
      {title}
    </button>
  )
}
