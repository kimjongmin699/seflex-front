import React from 'react'

const commonPosterUI =
  'flex mt-3 cursor-pointer justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle'

export default function PosterSelector({
  accept,
  name,
  selectedPoster,
  onChange,
  className,
  label,
}) {
  return (
    <div>
      <input
        accept={accept}
        onChange={onChange}
        type="file"
        name={name}
        id={name}
        hidden
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            className={commonPosterUI + ' object-cover ' + className}
            src={selectedPoster}
            alt=""
          />
        ) : (
          <PosterUI label={label} className={className} />
        )}
      </label>
    </div>
  )
}

const PosterUI = ({ className, label }) => {
  return (
    <div className={commonPosterUI + ' ' + className}>
      <span className="dark:text-dark-subtle text-light-subtle">{label}</span>
    </div>
  )
}
