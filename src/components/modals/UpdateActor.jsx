import React, { useState } from 'react'
import ModalContainer from './ModalContainer'
import ActorForm from '../from/ActorForm'
import { useNotification } from '../../hooks'
import { updateActors } from '../../api/actor'

export default function UpdateActor({
  onSuccess,
  visible,
  onClose,
  initialState,
}) {
  const [busy, setBusy] = useState(false)
  const { updateNotification } = useNotification()

  const handleSubmit = async (data) => {
    setBusy(true)
    const { actor, error } = await updateActors(initialState.id, data)
    setBusy(false)
    if (error) return updateNotification('error', error)
    onSuccess(actor)
    updateNotification('success', 'Actor Update success')
    onClose()
    console.log(actor)
  }

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm
        title="Update Actor"
        btnTitle="Update"
        onSubmit={!busy ? handleSubmit : null}
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  )
}
