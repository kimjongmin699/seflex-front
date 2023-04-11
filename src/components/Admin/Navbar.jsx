import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { BiLogOut, BiMoviePlay } from 'react-icons/bi'
import { FaUserNinja } from 'react-icons/fa'
import { useAuth } from '../../hooks'

export default function Navbar() {
  const {handleLogout} = useAuth()

  return (
    <nav className="w-48 min-h-screen bg-secondary border-r border-gray-300 ">
      <div className="pl-5 sticky top-0 flex flex-col h-screen justify-between">
        <ul>
          <li className="mb-5">
            <Link to="/">
              <img src="./logo192.png" alt="logo" className="h-14 p-2" />
            </Link>
          </li>
          <li>
            <NavItem to="/">
              <AiOutlineHome />
              <span>Home</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/movies">
              <BiMoviePlay />
              <span>Movies</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/actors">
              <FaUserNinja />
              <span>Actors</span>
            </NavItem>
          </li>
        </ul>
        <div className="flex flex-col items-center p-5">
          <span className="font-semibold text-white p-5">Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center pb-5 px-3 text-dark-subtle text-sm hover:text-white transition space-x-1"
          >
            <BiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({ children, to }) => {
  const commonClasses =
    ' flex items-center text-lg space-x-2 p-2 hover:opacity-80'
  return (
    <NavLink
      className={({ isActive }) =>
        (isActive ? 'text-white' : 'text-gray-400') + commonClasses
      }
      to={to}
    >
      {children}
    </NavLink>
  )
}
