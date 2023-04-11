import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovieForAdmin, searchPublicMovies } from '../../api/movie'
import { useNotification } from '../../hooks'
import MovieListItem from '../MovieListItem'
import { NotFound } from '../NotFound'
import NotFoundText from '../NotFoundText'
import MovieList from './MovieList'
import { Container } from '../Container'

export default function SearchMovies() {
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [resultNotFound, setResultNotFound] = useState(false)

  const { updateNotification } = useNotification()

  const query = searchParams.get('title')

  const searchMovies = async (val) => {
    const { error, results } = await searchPublicMovies(val)

    if (error) return updateNotification('error', error)
    if (!results.length) {
      setResultNotFound(true)
      return setMovies([])
    }
    setResultNotFound(false)
    setMovies([...results])
  }

  useEffect(() => {
    if (query.trim()) searchMovies(query)
  }, [query])

  return (
    <div className="p-5 space-y-3 dark:bg-primary bg-white min-h-screen ">
      <Container className="px-2 xl:p-0">
        <NotFoundText text="Record Not Found!" visible={resultNotFound} />
        <MovieList movies={movies} />
      </Container>
    </div>
  )
}
