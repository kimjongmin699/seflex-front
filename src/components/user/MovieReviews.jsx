import React, { useEffect, useState } from 'react'
import { Container } from '../Container'
import CustomButtonLink from '../CustomButtonLink'
import RatingStar from '../RatingStar'
import { useParams } from 'react-router-dom'
import { deleteReview, geteReviewByMovie } from '../../api/review'
import { useAuth, useNotification } from '../../hooks'
import { BsPencil, BsTrash } from 'react-icons/bs'
import ConfirmModal from '../modals/ConfirmModal'
import NotFoundText from '../NotFoundText'
import EditRatingModal from '../modals/EditRatingModal'

const getNameInitial = (name = '') => {
  return name[0].toLocaleUpperCase()
}

export default function MovieReviews() {
  const [reviews, setReviews] = useState([])
  const [movieTitle, setMovieTitle] = useState('')
  const [profileOwnersReview, setProfileOwnersReviews] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)
  const [busy, setBusy] = useState(false)

  const { movieId } = useParams()
  const { authInfo } = useAuth()
  const profileId = authInfo.profile?.id

  const { updateNotification } = useNotification()

  const fetchReviews = async () => {
    const { movie, error } = await geteReviewByMovie(movieId)
    if (error) updateNotification('error', error)

    setReviews([...movie.reviews])
    setMovieTitle(movie.title)
  }

  const findProfileOwnersReview = () => {
    if (profileOwnersReview) return setProfileOwnersReviews(null)

    const matched = reviews.find((review) => review.owner.id === profileId)
    if (!matched) {
      return updateNotification('error', 'You do not have any review!')
    }
    setProfileOwnersReviews(matched)
  }

  const handleDeleteConfirm = async () => {
    setBusy(true)
    const { error, message } = await deleteReview(profileOwnersReview.id)
    setBusy(false)
    if (error) return updateNotification('error', error)

    updateNotification('success', message)

    const updatedReviews = reviews.filter(
      (r) => r.id !== profileOwnersReview.id
    )
    setReviews([...updatedReviews])
    setProfileOwnersReviews(null)
    hideConfirmModal()
  }

  const displayConfirmModal = () => setShowConfirmModal(true)
  const hideConfirmModal = () => setShowConfirmModal(false)
  const hideEditModal = () => {
    setShowEditModal(false)
    setSelectedReview(null)
  }

  const handleOnEditClick = () => {
    const { id, content, rating } = profileOwnersReview
    setSelectedReview({ id, content, rating })

    setShowEditModal(true)
  }

  const handleOnReviewUpdate = (review) => {
    const updatedReview = {
      ...profileOwnersReview,
      rating: review.rating,
      content: review.content,
    }
    setProfileOwnersReviews({ ...updatedReview })

    const newReviews = reviews.map((r) => {
      if (r.id === updatedReview.id) return updatedReview
      return r
    })
    setReviews([...newReviews])
  }
  useEffect(() => {
    if (movieId) fetchReviews()
  }, [movieId])

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2 py-9">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews for:
            </span>{' '}
            {movieTitle}
          </h1>
          {profileId ? (
            <CustomButtonLink
              onClick={findProfileOwnersReview}
              label={profileOwnersReview ? 'View All' : 'Find My Review'}
            />
          ) : null}
        </div>

        <NotFoundText text="No Reviews !" visible={!reviews.length} />

        {profileOwnersReview ? (
          <div>
            <ReviewCard review={profileOwnersReview} />
            <div className="flex space-x-3 text-primary dark:text-white text-xl p-3">
              <button type="button">
                <BsTrash onClick={displayConfirmModal} />
              </button>
              <button onClick={handleOnEditClick}>
                <BsPencil />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review.card} />
            ))}
          </div>
        )}
      </Container>
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are you sure?"
        subtitle="This Action will remove this review permanetly!"
      />
      <EditRatingModal
        visible={showEditModal}
        onSuccess={handleOnReviewUpdate}
        initialState={selectedReview}
        onClose={hideEditModal}
      />
    </div>
  )
}

const ReviewCard = ({ review }) => {
  if (!review) return null
  const { owner, content, rating } = review
  return (
    <div className="flex space-x-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none">
        {getNameInitial(owner.name)}
      </div>
      <div>
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          John Doe
        </h1>
        <RatingStar rating={rating} />
        <p className="text-light-subtle dark:text-dark-subtle">{content}</p>
      </div>
    </div>
  )
}
