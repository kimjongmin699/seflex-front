import React, { useEffect } from 'react'
import { BsFillSunFill, BsPlusCircle } from 'react-icons/bs'
import { Container } from '../Container'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useTheme } from '../../hooks'
import AppSearchForm from '../from/AppSearchForm'

export const NavBar = () => {
  const { toggleTheme } = useTheme()
  const { authInfo, handleLogout } = useAuth()
  const { isLoggedIn } = authInfo

  const navigate = useNavigate()

  const handleSearchSubmit = (query) => {
    navigate('/movie/search?title=' + query)
  }

  // useEffect(() => {
  //   if (!isLoggedIn) return navigate('/auth/signin')
  // }, [authInfo.isLoggedIn])

  return (
    <div className="bg-secondary shadow-sm px-4 shadow-gray-500">
      <Container className="">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="./logo512.png" className="sm:h-10 h-8 " alt="" />
          </Link>

          <ul className="flex items-center md:space-x-4 space-x-2">
            <li className="space-x-3">
              {isLoggedIn ? (
                <button className="bg-dark-subtle dark:bg-white sm:text-2xl text-lg rounded-md p-1">
                  {' '}
                  <Link to="/create">
                    <BsPlusCircle size={24} />
                  </Link>
                </button>
              ) : null}
              <button
                onClick={toggleTheme}
                className="bg-dark-subtle dark:bg-white sm:text-2xl text-lg rounded-md p-1"
              >
                {' '}
                <BsFillSunFill size={24} />
              </button>
            </li>
            <li>
              <AppSearchForm
                onSubmit={handleSearchSubmit}
                placeholder="Search"
                inputClassName="border-dark-subtle text-white focus:border-white sm:w-auto"
              />
            </li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-xl font-bold text-white "
              >
                Log Out
              </button>
            ) : (
              <Link to="/auth/signin">
                <li className="text-2xl font-bold text-white">Login</li>
              </Link>
            )}
          </ul>
        </div>
      </Container>
    </div>
  )
}
