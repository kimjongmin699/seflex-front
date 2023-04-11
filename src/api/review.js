import { catchError, getToken } from '../utils/helper'
import client from './client'

export const addReview = async (movieId, reviewData) => {
  const token = getToken()
  try {
    const { data } = await client.post(
      `https://flexkim.herokuapp.com/api/review/add/${movieId}`,
      reviewData,
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  } catch (error) {
    return catchError(error)
  }
}

export const geteReviewByMovie = async (movieId) => {
  try {
    const { data } = await client.get(
      `https://flexkim.herokuapp.com/api/review/get-reviews-by-movie/${movieId}`
    )
    return data
  } catch (error) {
    return catchError(error)
  }
}

export const deleteReview = async (reviewId) => {
  const token = getToken()
  try {
    const { data } = await client.delete(
      `https://flexkim.herokuapp.com/api/review/${reviewId}`,
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  } catch (error) {
    return catchError(error)
  }
}

export const updateReview = async (reviewId, reviewData) => {
  const token = getToken()
  try {
    const { data } = await client.patch(
      `https://flexkim.herokuapp.com/api/review/${reviewId}`,
      reviewData,
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  } catch (error) {
    return catchError(error)
  }
}
