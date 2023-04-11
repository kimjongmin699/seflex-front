import React, { useEffect, useState } from 'react'
import { getTopRatedMovie } from '../../api/movie'
import { useNotification } from '../../hooks'
import MovieList from './MovieList'

export default function FifthGrade() {
  const [movies, setMovies] = useState([])
  const { updateNotification } = useNotification()

  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovie('fifthGrade')
    if (error) return updateNotification('error', error)

    setMovies([...movies])
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return <MovieList movies={movies} title="5학년(Fifth Grade)" />
}
