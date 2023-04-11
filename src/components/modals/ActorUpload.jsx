import React, { useState } from 'react'
import ModalContainer from './ModalContainer'
import ActorForm from '../from/ActorForm'
import { createActor } from '../../api/actor'
import { useNotification } from '../../hooks'
import { useNavigate } from 'react-router-dom'

export default function ActorUpload({ visible, onClose }) {
  const [busy, setBusy] = useState(false)
  const { updateNotification } = useNotification()
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    setBusy(true)
    const { actor, error } = await createActor(data)
    setBusy(false)
    if (error) return updateNotification('error', error)

    updateNotification('success', 'Actor Update success')
    onClose()
    navigate('/')
  }

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        title="Create New Actor"
        btnTitle="Create"
        onSubmit={!busy ? handleSubmit : null}
        busy={busy}
      />
    </ModalContainer>
  )
}
