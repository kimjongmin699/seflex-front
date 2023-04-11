import React, { useEffect, useState } from 'react'
import ModalContainer from './ModalContainer'
import MovieForm from '../Admin/MovieForm'
import { getMovieForUpdate, updateMovie } from '../../api/movie'
import { useNotification } from '../../hooks'

export default function UpdateMovie({ visible, onSuccess, movieId }) {
  const [busy, setBusy] = useState(false)
  const [ready, setReady] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const { updateNotification } = useNotification()

  const handleSubmit = async (data) => {
    console.log('data', data)
    setBusy(true)
    const { error, movie, message } = await updateMovie(movieId, data)
    setBusy(false)

    if (error) return updateNotification('error', error)

    updateNotification('success', message)
    onSuccess(movie)
  }

  const fetchMovieToUpdate = async () => {
    const { movie, error } = await getMovieForUpdate(movieId)
    if (error) return updateNotification('error', error)
    setSelectedMovie(movie)
    setReady(true)
    //setShowUpdateModal(true)
  }

  useEffect(() => {
    if (movieId) fetchMovieToUpdate()
  }, [movieId])

  return (
    <ModalContainer visible={visible}>
      {ready ? (
        <MovieForm
          initialState={selectedMovie}
          btnTitle="Update"
          onSubmit={!busy ? handleSubmit : null}
          busy={busy}
        />
      ) : (
        <div className="w-full h-full justify-center items-center">
          <p className="text-light-subtle dark:text-dark-subtle text-xl animate-pulse">
            Please wait..
          </p>
        </div>
      )}
    </ModalContainer>
  )
}
