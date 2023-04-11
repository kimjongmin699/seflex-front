import React, { useEffect, useState } from 'react'
import { getTopRatedMovie } from '../../api/movie'
import { useNotification } from '../../hooks'
import MovieList from './MovieList'

export default function TopRatedMovies() {
  const [movies, setMovies] = useState([])
  const { updateNotification } = useNotification()

  const fetchMovies = async (signal) => {
    const { error, movies } = await getTopRatedMovie(null, signal)
    if (error) return updateNotification('error', error)

    setMovies([...movies])
  }

  useEffect(() => {
    const ac = new AbortController()
    fetchMovies(ac.signal)
    console.log('movies', movies)
    return () => {
      ac.abort()
    }
  }, [])

  return (
    <div className="flex">
      <MovieList movies={movies} title="Viewer Choice(Movie)" />
    </div>
  )
}
