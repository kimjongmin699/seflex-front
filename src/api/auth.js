import client from './client'

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/user/create',
      userInfo
    )
    return data
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.error) return response.data

    return { error: error.message || error }
  }
}

export const verifyUserEmail = async (userInfo) => {
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/user/verify-email',
      userInfo
    )
    return data
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.error) return response.data

    return { error: error.message.error || error }
  }
}

export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/user/sign-in',
      userInfo
    )

    return data
  } catch (error) {
    const { response } = error
    if (response?.error) return response.data

    return { error: error.response.data || error }
  }
}

export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get(
      'https://flexkim.herokuapp.com/api/user/is-auth',
      {
        headers: {
          Authorization: 'Bearer ' + token,
          accept: 'application/json',
        },
      }
    )

    return data
  } catch (error) {
    console.log(error.response.data)
    const { response } = error
    if (response?.error) return response.data

    return { error: error.response.data || error }
  }
}

export const forgetPassword = async (email) => {
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/user/forget-password',
      {
        email: email,
      }
    )
    return data
  } catch (error) {
    console.log(error.response.data)
    const { response } = error
    if (response?.error) return response.data

    return { error: error.response.data || error }
  }
}

export const verifyPasswordResetToken = async (token, userId) => {
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/user/verify-pass-reset-token',
      {
        token,
        userId,
      }
    )
    return data
  } catch (error) {
    console.log(error.response.data)
    const { response } = error
    if (response?.error) return response.data

    return { error: error.response.data || error }
  }
}

export const resetPassword = async (passwordInfo) => {
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/user/reset-password',
      passwordInfo
    )
    console.log(data)
    return data
  } catch (error) {
    //   console.log(error.response.data)
    const { response } = error
    if (response?.error) return response.data

    return { error: error.response.data || error }
  }
}

export const resendEmailVerificationToken = async (userId) => {
  try {
    const { data } = await client.post(
      'https://flexkim.herokuapp.com/api/user/resend-email-verification-token',
      { userId }
    )
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.error) return response.data

    return { error: error.response.data || error }
  }
}
