import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import ModalContainer from './ModalContainer'

export default function WritersModal({
  profiles = [],
  visible,
  onClose,
  onRemoveClick,
}) {
  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[45rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar">
        {profiles.map(({ id, name, avatar }, index) => {
          return (
            <div
              key={index}
              className="flex space-x-3 dark:bg-secondary rounded bg-white drop-shadow-md"
            >
              <img
                className="aspect-square w-16 h-16 rounded object-cover"
                src={avatar}
                alt={name}
              />
              <p className="w-full font-semibold dark:text-white text-primary">
                {name}
              </p>
              <button
                onClick={() => onRemoveClick(id)}
                className="dark:text-white text-primary hover:opacity-80 transition p-2"
              >
                <AiOutlineClose />
              </button>
            </div>
          )
        })}
      </div>
    </ModalContainer>
  )
}
