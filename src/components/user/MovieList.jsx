import React from 'react'
import GridContainer from '../GridContainer'
import { Link } from 'react-router-dom'
import RatingStar from '../RatingStar'
import { getPoster } from '../../utils/helper'

export default function MovieList({ title, movies }) {
  if (!movies.length) return null

  return (
    <div >
      {title ? (
        <h1 className=" text-2xl dark:text-white text-secondary font-semibold ">
          {title}
        </h1>
      ) : null}
      <GridContainer>
        {movies.map((movie) => (
          <ListItem movie={movie} key={movie.id} />
        ))}
      </GridContainer>
    </div>
  )
}

const ListItem = ({ movie }) => {
  const trimTitle = (text = '') => {
    if (text.length <= 20) return text
    return text.substring(0, 20) + '...'
  }

  const { title, responsivePosters, poster, reviews, id } = movie

  return (
    <Link to={'/movie/' + id} className="w-60" key={movie.id}>
      <img
        src={getPoster(responsivePosters) || poster}
        alt=""
        className="h-48 object-cover w-full rounded-md"
      />
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={title}
      >
        {trimTitle(title)}
      </h1>
      <RatingStar rating={reviews.rating} />
    </Link>
  )
}
