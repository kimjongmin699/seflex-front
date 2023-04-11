import React from 'react'

export const FormInput = ({ name, label, placeholder, ...rest }) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        className="bg-transparent transition  border-light-subtle dark:focus:border-white dark:text-white text-black border-2 rounded dark:border-dark-subtle w-full focus:border-black p-3 text-lg outline-none peer"
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="dark:text-dark-subtle  peer-focus:text-white"
      >
        {label}
      </label>
    </div>
  )
}
