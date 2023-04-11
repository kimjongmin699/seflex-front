import React, { useState } from 'react'
import ModalContainer from './ModalContainer'
import RatingForm from '../from/RatingForm'
import { useNotification } from '../../hooks'
import { updateReview } from '../../api/review'

export default function EditRatingModal({
  visible,
  initialState,
  onSuccess,
  onClose,
}) {
  const [busy, setBusy] = useState(false)
  const { updateNotification } = useNotification()

  const handleSubmit = async (data) => {
    setBusy(true)
    const { error, message } = await updateReview(initialState.id, data)
    setBusy(false)
    if (error) updateNotification('error', error)

    onSuccess({ ...data })
    updateNotification('success', message)
    onClose()
  }
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm
        busy={busy}
        initialState={initialState}
        onSubmit={handleSubmit}
      />
    </ModalContainer>
  )
}
