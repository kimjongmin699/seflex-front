import React, { useEffect, useState } from 'react'
import { Container } from '../Container'
import { Title } from '../from/Title'
import { FormInput } from '../from/FormInput'
import { Submit } from '../from/Submit'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { createUser } from '../../api/auth'
import { useAuth, useNotification } from '../../hooks'
import { commonModalClasses } from '../../utils/commonClass'

export const validateUserInfo = ({ name, email, password }) => {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  //const isValidName = /^[a-z A-Z]+$/

  if (!name.trim()) return { ok: false, error: 'Name is missing' }
  //if (!isValidName.test(name)) return { ok: false, error: 'Invalid name' }
  if (!email.trim()) return { ok: false, error: 'Email is missing' }
  if (!isValidEmail.test(email)) return { ok: false, error: 'Email is Invalid' }
  if (!password.trim()) return { ok: false, error: 'Password is missing' }
  if (!password.length > 5)
    return { ok: false, error: 'Password muse be more than 6' }

  return { ok: true }
}

export const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { handleLogin, authInfo } = useAuth()
  const { isPending, isLoggedIn } = authInfo

  const navigate = useNavigate()
  const { updateNotification } = useNotification()

  const { name, email, password } = userInfo

  const handleChange = (e) => {
    const { value, name } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, error } = validateUserInfo(userInfo)

    if (!ok) return updateNotification('error', error)

    const response = await createUser(userInfo)
    if (response.error) return console.log(response.error)

    navigate('/', {
      state: { user: response.user },
      replace: true,
    })
  }

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form
          onSubmit={handleSubmit}
          className={commonModalClasses + ' w-[500px]'}
        >
          <Title>Sign Up</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            label="Name"
            placeholder="Write Name..."
            name="name"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="Write Email..."
            name="email"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="Write Password..."
            name="password"
            type="password"
          />
          <Submit value="Sign Up" />
          <div className="flex justify-between">
            <Link
              className="text-dark-subtle hover:text-white"
              to="/auth/forget-password"
            >
              Forget Password
            </Link>
            <Link
              className="text-dark-subtle hover:text-white"
              to="/auth/signin"
            >
              Sign In
            </Link>
          </div>
        </form>
      </Container>
    </div>
  )
}
