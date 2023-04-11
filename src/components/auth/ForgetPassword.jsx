import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Submit } from '../from/Submit'
import { Container } from '../Container'
import { FormInput } from '../from/FormInput'
import { Title } from '../from/Title'
import { forgetPassword } from '../../api/auth'
import { useNotification } from '../../hooks'

export const validateEmail = ({ email }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (!email) return { ok: false, error: 'Email is missing' }
  if (!isValidEmail.test(email)) return { ok: false, error: 'Email is Invalid' }

  return { ok: true }
}

export const ForgetPassword = () => {
  const [email, setEmail] = useState('')

  const { updateNotification } = useNotification()

  const handleChange = ({ target }) => {
    const { value } = target
    setEmail(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(email))
      return updateNotification('error', 'Invalid Email')

    const { error, message } = await forgetPassword(email)
    console.log('message', message)
    console.log('error', error)
    // if (error) return updateNotification('error', error)

    // updateNotification('success', message)
  }

  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="bg-secondary space-y-6 rounded p-6 w-[500px]"
        >
          <Title>Please Enter Your Email</Title>
          <FormInput
            label="Email"
            value={email}
            onChange={handleChange}
            placeholder="Write Email..."
            name="email"
          />

          <Submit value="Send Link" />
          <div className="flex justify-between">
            <Link
              className="text-dark-subtle hover:text-white"
              to="/auth/signin"
            >
              Sign In
            </Link>
            <Link
              className="text-dark-subtle hover:text-white"
              to="/auth/signup"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </Container>
    </div>
  )
}
