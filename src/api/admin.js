import { catchError, getToken } from '../utils/helper'
import client from './client'

export const getAppInfo = async () => {
  const token = getToken()
  try {
    const { data } = await client.get(
      'hhttps://flexkim.herokuapp.com/api/admin/app-info',
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

export const getMostRatedMovies = async () => {
  const token = getToken()
  try {
    const { data } = await client.get(
      'https://flexkim.herokuapp.com/api/admin/most-rated',
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
