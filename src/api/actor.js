import { getToken } from '../utils/helper'
import client from './client'

export const createActor = async (formData) => {
  const token = getToken()
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/actor/create',
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

export const searchActor = async (query) => {
  const token = getToken()
  try {
    const { data } = await client.get(
      `https://flexkim.herokuapp.com/api/actor/search?name=${query}`,
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

export const getActors = async (pageNo, limit) => {
  const token = getToken()
  try {
    const { data } = await client.get(
      `https://flexkim.herokuapp.com/api/actor/actors?pageNo=${pageNo}&limit=${limit}`,
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

export const updateActors = async (id, formData) => {
  const token = getToken()
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/actor/update/' + id,
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

export const deleteActor = async (id) => {
  const token = getToken()
  try {
    const { data } = await client.delete(
      'https://flexkim.herokuapp.com/api/actor/' + id,

      {
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
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

export const getActorProfile = async (id) => {
  try {
    const { data } = await client.get(
      `https://flexkim.herokuapp.com/api/actor/single/${id}`
    )
    console.log(data)
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}
