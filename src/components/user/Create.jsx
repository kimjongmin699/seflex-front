import React, { useEffect, useRef, useState } from 'react'
import MovieUpload from '../Admin/MovieUpload'
import ActorUpload from '../modals/ActorUpload'

export default function Create() {
  const [showOptions, setShowOptions] = useState(false)
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false)
  const [showActorUploadModal, setShowActorUploadModal] = useState(false)

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false)
  }

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true)
  }

  const hideActorUploadModal = () => {
    setShowActorUploadModal(false)
  }

  const displayActorUploadModal = () => {
    setShowActorUploadModal(true)
  }

  const options = [
    { title: 'Add Movie', onClick: displayMovieUploadModal },
    { title: 'Add Actor', onClick: displayActorUploadModal },
  ]
  return (
    <div className="flex flex-col mt-40 justify-center items-center">
      <div className="border-2 p-5 rounded-md bg-red-50">
        <div className="text-lg">Make Movie or Make Actor</div>
        <hr />
        <hr />
        <div>
          <button
            className="text-red-500 text-lg mt-3 items-center"
            onClick={() => setShowOptions(true)}
          >
            Click Here.
          </button>
        </div>
      </div>

      <CreateOptions
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        options={options}
      />
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </div>
  )
}

const CreateOptions = ({ visible, onClose, options }) => {
  const container = useRef()
  const containerID = 'options-container'

  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return
      const { parentElement, id } = e.target

      if (parentElement.id === containerID || id === containerID) return

      // Old Code (Before React 18)
      // container.current.classList.remove("animate-scale");
      // container.current.classList.add("animate-scale-reverse");

      // New Update
      if (container.current) {
        if (!container.current.classList.contains('animate-scale'))
          container.current.classList.add('animate-scale-reverse')
      }
    }

    document.addEventListener('click', handleClose)
    return () => {
      document.removeEventListener('click', handleClose)
    }
  }, [visible])

  if (!visible) return null

  const handleAnimationEnd = (e) => {
    if (e.target.classList.contains('animate-scale-reverse')) onClose()
    e.target.classList.remove('animate-scale')
  }

  const handleClick = (fn) => {
    fn()
    onClose()
  }

  return (
    <div
      id={containerID}
      ref={container}
      className="absolute right-0 top-12 z-50 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={handleAnimationEnd}
    >
      {options.map(({ title, onClick }) => {
        return (
          <Option key={title} onClick={() => handleClick(onClick)}>
            {title}
          </Option>
        )
      })}
    </div>
  )
}

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  )
}
