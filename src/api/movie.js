import { catchError, getToken } from '../utils/helper'
import client from './client'

export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = getToken()
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/movie/upload-trailer',
      formData,
      {
        headers: {
          authorization: 'Bearer ' + token,
          'content-type': 'multipart/form-data',
        },
        onUploadProgress: ({ loaded, total }) => {
          if (onUploadProgress)
            onUploadProgress(Math.floor((loaded / total) * 100))
        },
      }
    )
    return data
  } catch (error) {
    return catchError(error)
  }
}

export const uploadMovie = async (formData) => {
  const token = getToken()
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/movie/create',
      formData,
      {
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const getMovies = async (pageNo, limit) => {
  const token = getToken()
  try {
    const { data } = await client.get(
      `https://flexkim.herokuapp.com/api/movie/movies?page=${pageNo}&limit=${limit}`,

      {
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const getMovieForUpdate = async (id) => {
  const token = getToken()
  try {
    const { data } = await client.get(
      'https://flexkim.herokuapp.com/api/movie/for-update/' + id,

      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    console.log(data)
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const updateMovie = async (id, formData) => {
  const token = getToken()
  try {
    const { data } = await client.patch(
      'https://flexkim.herokuapp.com/api/movie/update/' + id,
      formData,

      {
        headers: {
          authorization: 'Bearer ' + token,
          'content-type': 'multipart/form-data',
        },
      }
    )
    console.log(data)
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const deleteMovie = async (id) => {
  const token = getToken()
  try {
    const { data } = await client.delete(
      `https://flexkim.herokuapp.com/api/movie/${id}`,

      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const searchMovieForAdmin = async (title) => {
  const token = getToken()
  try {
    const { data } = await client.get(
      `https://flexkim.herokuapp.com/api/movie/search?title=${title}`,

      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const getTopRatedMovie = async (type, signal) => {
  try {
    let endpoint = 'movie/top-rated'
    if (type) endpoint = endpoint + '?type=' + type
    const { data } = await client.get(`https://flexkim.herokuapp.com/api/${endpoint}`, {
      signal,
    })
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const getLatestUploads = async (type) => {
  try {
    const { data } = await client.get(
      `https://flexkim.herokuapp.com/api/movie/latest-uploads`
    )
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const getSingleMovie = async (id) => {
  try {
    const { data } = await client.get(
      `https://flexkim.herokuapp.com/api/movie/single/` + id
    )
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const getRelatedMovies = async (id) => {
  try {
    const { data } = await client.get(
      `https://flexkim.herokuapp.com/api/movie/related/` + id
    )
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const searchPublicMovies = async (title) => {
  try {
    const { data } = await client.get(
      `https://flexkim.herokuapp.com/api/movie/search-public?title=` + title
    )
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}
