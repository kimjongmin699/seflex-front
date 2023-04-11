import React, { useEffect, useRef, useState } from 'react'
import { Container } from '../Container'
import { Title } from '../from/Title'
import { Submit } from '../from/Submit'
import { useLocation, useNavigate } from 'react-router-dom'
import { resendEmailVerificationToken, verifyUserEmail } from '../../api/auth'
import { useAuth, useNotification } from '../../hooks'

const OTP_LENGTH = 6
let currentOTPIndex

const isValidOTP = (otp) => {
  //['','','','','','']
  let valid = false

  for (let val of otp) {
    valid = !isNaN(parseInt(val))
    if (!valid) break
  }

  return valid
}

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)

  const { isAuth, authInfo } = useAuth()
  const { isLoggedIn, profile } = authInfo
  const isVerified = profile?.isVerified

  const inputRef = useRef()
  const { updateNotification } = useNotification()

  const { state } = useLocation()
  const navigate = useNavigate()
  const user = state?.user

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1)
  }

  const focusPrevInputField = (index) => {
    let nextIndex
    const diff = index - 1
    nextIndex = diff !== 0 ? diff : 0
    setActiveOtpIndex(nextIndex)
  }

  const handleOtpChange = ({ target }) => {
    const { value } = target
    const newOtp = [...otp]
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length)

    if (!value) focusPrevInputField(currentOTPIndex)
    else focusNextInputField(currentOTPIndex)
    setOtp([...newOtp])
  }

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index
    if (key === 'Backspace') {
      focusPrevInputField(currentOTPIndex)
    }
  }

  const handleOTPResend = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id)

    if (error) return updateNotification('error', error)

    updateNotification('success', message)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isValidOTP(otp)) {
      return updateNotification('error', 'inValid OTP')
    }
    //submit OTP
    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      OTP: otp.join(''),
      userId: user.id,
    })
    if (error) return updateNotification('error', error)

    updateNotification('success', message)
    localStorage.setItem('auth-token', userResponse.token)
    isAuth()
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex])

  useEffect(() => {
    if (!user) navigate('/not-found')
    if (isLoggedIn && isVerified) navigate('/')
  }, [user, isLoggedIn, isVerified])

  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="bg-secondary rounded p-6 space-y-6"
        >
          <div>
            <Title>Please enter the OTP to verify your account</Title>
            <p className="text-center text-dark-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ''}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 border-dark-subtle focus:border-white rounded bg-transparent outline-none text-center text-white font-semibold text-xl spin-button-none"
                />
              )
            })}
          </div>
          <div>
            <Submit value="Verify Account" />
            <button
              onClick={handleOTPResend}
              type="button"
              className="dark:text-white mt-2 text-blue-500 font-semibold hover:underline"
            >
              I don't have OTP
            </button>
          </div>
        </form>
      </Container>
    </div>
  )
}
