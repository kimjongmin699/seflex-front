import React, { useEffect, useState } from 'react'
import { Container } from '../Container'
import { Title } from '../from/Title'
import { FormInput } from '../from/FormInput'
import { Submit } from '../from/Submit'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useNotification } from '../../hooks'
import { commonModalClasses } from '../../utils/commonClass'

export const validateUserInfo = ({ email, password }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (!email.trim()) return { ok: false, error: 'Email is missing' }
  if (!isValidEmail.test(email)) return { ok: false, error: 'Email is Invalid' }
  if (!password.trim()) return { ok: false, error: 'Password is missing' }
  if (password.length < 6)
    return { ok: false, error: 'Password must be more than 6' }

  return { ok: true }
}

export const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const { handleLogin, authInfo } = useAuth()
  const { updateNotification } = useNotification()
  const { isPending, isLoggedIn } = authInfo

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, error } = validateUserInfo(userInfo)

    if (!ok) return updateNotification('error', error)

    handleLogin(userInfo.email, userInfo.password)
  }

  // useEffect(() => {
  //   if (isLoggedIn) navigate('/')
  // }, [isLoggedIn])

  return (
    <div className="fixed inset-0 dark:bg-primary  -z-10 flex justify-center items-center">
      <Container>
        <form
          onSubmit={handleSubmit}
          className={commonModalClasses + ' w-[500px]'}
        >
          <Title>Sign In</Title>
          <FormInput
            label="Email"
            onChange={handleChange}
            placeholder="Write Email..."
            name="email"
            value={userInfo.email}
          />
          <FormInput
            label="Password"
            placeholder="Write Password..."
            name="password"
            onChange={handleChange}
            value={userInfo.password}
            type="password"
          />
          <Submit value="Sign In" busy={isPending} />
          <div className="flex justify-between">
            <Link
              className="dark:text-dark-subtle dark:hover:text-white text-black"
              to="/auth/forget-password"
            >
              Forget Password
            </Link>
            <Link
              className="dark:text-dark-subtle dark:hover:text-white text-black"
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
