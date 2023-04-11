import React, { useEffect, useState } from 'react'
import { getTopRatedMovie } from '../../api/movie'
import { useNotification } from '../../hooks'
import MovieList from './MovieList'

export default function SecondGrade() {
  const [movies, setMovies] = useState([])
  const { updateNotification } = useNotification()

  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovie('secondGrade')
    if (error) return updateNotification('error', error)

    setMovies([...movies])
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return <MovieList movies={movies} title="2학년(Second Grade)" />
}
