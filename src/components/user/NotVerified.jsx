import React from 'react'
import { useAuth } from '../../hooks'
import { useNavigate } from 'react-router-dom'

export const NotVerified = () => {
  const { authInfo } = useAuth()
  const { isLoggedIn } = authInfo
  console.log(authInfo)
  //const isVerified = authInfo.profile?.isVerified
  const isVerified = true

  const navigate = useNavigate()

  const navigateToVerification = () => {
    navigate('/', { state: { user: authInfo.profile } })
  }

  return (
    <div>
      {isLoggedIn && !isVerified ? (
        <div className="flex justify-center items-center h-screen ">
          <div className="flex flex-col space-y-3 text-2xl items-center bg-blue-50">
            <p className="text-2lg text-center ">
              It looks like you haven't verified your account,
            </p>
            <button
              onClick={navigateToVerification}
              className=" text-blue-500 font-semibold hover:underline"
            >
              Click verify your account
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
