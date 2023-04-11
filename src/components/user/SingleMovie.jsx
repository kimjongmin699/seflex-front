import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSingleMovie } from '../../api/movie'
import { useAuth, useNotification } from '../../hooks'

import RatingStar from '../RatingStar'
import { Container } from '../Container'
import RelatedMovies from '../RelatedMovies'
import AddRatingModal from '../modals/AddRatingModal'
import CustomButtonLink from '../CustomButtonLink'
import ProfileModal from '../modals/ProfileModal'

const convertReviewCount = (count = 0) => {
  if (count <= 999) return count

  return parseFloat(count / 1000).toFixed(2) + 'k'
}

const convertDate = (date = '') => {
  return date.split('T')[0]
}

export default function SingleMovie() {
  const [ready, setReady] = useState(false)
  const [movie, setMovie] = useState({})
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState({})

  const { authInfo } = useAuth()
  const { isLoggedIn } = authInfo
  const { movieId } = useParams()
  const { updateNotification } = useNotification()
  const navigate = useNavigate()

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId)
    if (error) return updateNotification('error', error)

    setReady(true)
    setMovie(movie)
  }

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate('/auth/signin')
    setShowRatingModal(true)
  }

  const hideRatingModal = () => {
    setShowRatingModal(false)
  }

  const hadleOnRatingOnSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } })
  }

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile)
    setShowProfileModal(true)
  }

  const hideProfileModal = () => {
    setShowProfileModal(false)
  }

  useEffect(() => {
    if (movieId) fetchMovie()
  }, [movieId])

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait
        </p>
      </div>
    )

  const {
    id,
    trailer,
    poster,
    title,
    storyLine,
    language,
    releseDate,
    type,
    director = {},
    reviews = {},
    writers = [],
    cast = [],
    genres = [],
  } = movie
  console.log('reviews', reviews)

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2">
        <video poster={poster} controls src={trailer}></video>
        <div className="flex justify-between">
          <h1 className="xl:text-4xl lg:text-3xl text-2xl  text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.rating} />
            <CustomButtonLink
              label={convertReviewCount(reviews.reviewCount) + ' Reviews'}
              onClick={() => navigate('/movie/reviews/' + id)}
            />

            <CustomButtonLink
              label="Rate the movie"
              onClick={handleOnRateMovie}
            />
            {/* <Link
              className="text-highlight dark:text-highlight-dark hover:underline"
              to={'/movie/reviews/' + id}
            >
              {convertReviewCount(reviews.reviewCount)} Reviews
            </Link> */}

            {/* <button
              className="text-highlight dark:text-highlight-dark hover:underline"
              type="button"
              onClick={handleOnRateMovie}
            >
              Rate the movie
            </button> */}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>

          {/* <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Director:
            </p>
            <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
              {director.name}
            </p>
          </div> */}
          <ListWithLabel label="Director:">
            <CustomButtonLink
              label={director.name}
              onClick={() => handleProfileClick(director)}
            />
          </ListWithLabel>

          <ListWithLabel label="Writers:">
            {writers.map((w) => (
              <CustomButtonLink key={w.id} label={w.name} />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Cast:">
            {cast.map(({ id, leadActor, profile }) => {
              return leadActor ? (
                <CustomButtonLink
                  key={id}
                  label={profile.name}
                  clickable={false}
                />
              ) : null
            })}
          </ListWithLabel>

          <ListWithLabel label="Language:">
            <CustomButtonLink label={language} clickable={false} />
          </ListWithLabel>

          <ListWithLabel label="Relese Date:">
            <CustomButtonLink
              label={convertDate(releseDate)}
              clickable={false}
            />
          </ListWithLabel>

          <ListWithLabel label="Genres:">
            {genres.map((g) => (
              <div key={g}>
                <CustomButtonLink label={g} />
              </div>
            ))}
          </ListWithLabel>

          <ListWithLabel label="Types:">
            <CustomButtonLink label={type} />
          </ListWithLabel>

          {/* <div className="flex">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
              Writers:
            </p>
            <div className="flex space-x-2">
              {writers.map((w) => (
                <p
                  key={w.id}
                  className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                >
                  {w.name}
                </p>
              ))}
            </div>
          </div> */}

          {/* <div className="flex">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
              Cast:
            </p>
            <div className="flex space-x-2">
              {cast.map((c) =>
                c.leadActor ? (
                  <p
                    key={c.profile.id}
                    className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                  >
                    {c.profile.name}
                  </p>
                ) : null
              )}
            </div>
          </div> */}
          {/* 
          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Language:
            </p>
            <p className="text-highlight dark:text-highlight-dark">
              {language}
            </p>
          </div> */}
          {/* 
          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Release Date:
            </p>
            <p className="text-highlight dark:text-highlight-dark">
              {convertDate(releseDate)}
            </p>
          </div> */}

          {/* <div className="flex">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
              Genres:
            </p>
            <div className="flex space-x-2">
              {genres.map((g) => (
                <p key={g} className="text-highlight dark:text-highlight-dark">
                  {g}
                </p>
              ))}
            </div>
          </div> */}

          {/* <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Type:
            </p>
            <p className="text-highlight dark:text-highlight-dark">{type}</p>
          </div> */}
          <CastProfiles cast={cast} />
          <RelatedMovies movieId={movieId} />
        </div>
      </Container>

      <ProfileModal
        visible={showProfileModal}
        onClose={hideProfileModal}
        profileId={selectedProfile.id}
      />
      <AddRatingModal
        visible={showRatingModal}
        onClose={hideRatingModal}
        onSuccess={hadleOnRatingOnSuccess}
      />
    </div>
  )
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  )
}

const CastProfiles = ({ cast }) => {
  return (
    <div className="">
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
        Cast:
      </h1>
      <div className="flex flex-wrap space-x-4">
        {cast.map(({ id, profile, roleAs }) => {
          return (
            <div
              key={id}
              className="basis-28 flex flex-col items-center text-center mb-4"
            >
              <img
                className="w-24 h-24 aspect-square object-cover rounded-full"
                src={profile.avatar}
                alt=""
              />
              <CustomButtonLink label={profile.name} />
              <span className="text-light-subtle dark:text-dark-subtle text-sm">
                as
              </span>

              <p className="text-light-subtle dark:text-dark-subtle">
                {roleAs}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
