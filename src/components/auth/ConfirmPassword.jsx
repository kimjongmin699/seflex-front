import React, { useEffect, useState } from 'react'
import { Container } from '../Container'
import { Title } from '../from/Title'
import { FormInput } from '../from/FormInput'
import { Submit } from '../from/Submit'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ImSpinner3 } from 'react-icons/im'
import { resetPassword, verifyPasswordResetToken } from '../../api/auth'
import { useNotification } from '../../hooks'

export const ConfirmPassword = () => {
  const [password, setPassword] = useState({
    one: '',
    two: '',
  })
  const [isVerifying, setIsVerifying] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const id = searchParams.get('id')
  //console.log(token, id)

  //isValid, isVerifying, !isValid

  const { updateNotification } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    isValidToken()
  }, [])

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id)
    setIsVerifying(false)
    console.log(valid)
    // if (error) return updateNotification('error', error)
    if (error) {
      navigate('/auth/reset-password', { replace: true })
      return console.log(error)
    }

    if (!valid) {
      setIsValid(false)
      setIsVerifying(false)
      return navigate('/auth/reset-password', { replace: true })
    }

    setIsValid(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPassword({ ...password, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password.one.trim())
      return updateNotification('error', 'password is missing')
    if (password.one.trim().length < 6)
      return updateNotification('error', 'Password more than 6')
    if (password.one !== password.two)
      return updateNotification('error', 'Password not match')

    const { error, message } = await resetPassword({
      newPassword: password.one,
      userId: id,
      token,
    })
    if (error) return updateNotification('error', error)

    updateNotification('success', message)
    navigate('/auth/signin', { replace: true })

    console.log(password)
  }

  if (isVerifying)
    return (
      <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
        <div className="flex justify-center flex-cols mt-92 items-center">
          <h1 className="text-4xl text-white p-3 rounded">
            Please wait we are verifying your token
          </h1>
          <ImSpinner3 className="animate-spin text-3xl text-white mx-auto" />
        </div>
      </div>
    )

  if (!isValid)
    return (
      <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
        <div className="flex justify-center flex-cols mt-92 items-center">
          <h1 className="text-4xl text-white p-3 rounded">
            Sorry the Token is inValid!!
          </h1>
        </div>
      </div>
    )

  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="bg-secondary space-y-6 rounded p-6 w-[500px]"
        >
          <Title>Enter New Password</Title>
          <FormInput
            value={password.one}
            label="New Password"
            placeholder="Write New Password..."
            name="one"
            type="password"
            onChange={handleChange}
          />
          <FormInput
            value={password.two}
            label="Confirm Password"
            placeholder="Write Confirm Password"
            name="two"
            type="password"
            onChange={handleChange}
          />
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </div>
  )
}
