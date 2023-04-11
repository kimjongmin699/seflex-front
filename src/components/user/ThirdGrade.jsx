import React, { useEffect, useState } from 'react'
import { getTopRatedMovie } from '../../api/movie'
import { useNotification } from '../../hooks'
import MovieList from './MovieList'

export default function ThirdGrade() {
  const [movies, setMovies] = useState([])
  const { updateNotification } = useNotification()

  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovie('thirdGrade')
    if (error) return updateNotification('error', error)

    setMovies([...movies])
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return <MovieList movies={movies} title="3학년(Third Grade)" />
}
