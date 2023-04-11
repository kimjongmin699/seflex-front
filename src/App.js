import './App.css'
import { Home } from './components/Home'
import { NotFound } from './components/NotFound'
import { ConfirmPassword } from './components/auth/ConfirmPassword'
import EmailVerification from './components/auth/EmailVerification'
import { ForgetPassword } from './components/auth/ForgetPassword'
import { SignUp } from './components/auth/SignUp'
import { Signin } from './components/auth/Signin'
import { NavBar } from './components/user/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useAuth } from './hooks'
import { Adminnavigator } from './navigator/Adminnavigator'
import SingleMovie from './components/user/SingleMovie'
import MovieReviews from './components/user/MovieReviews'
import SearchMovies from './components/user/SearchMovies'
import Create from './components/user/Create'

function App() {
  const { authInfo } = useAuth()
  const isAdmin = authInfo.profile?.role === 'admin'
  console.log(isAdmin)
  if (isAdmin) return <Adminnavigator />

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/reset-password" element={<ConfirmPassword />} />
        <Route path="/movie/:movieId" element={<SingleMovie />} />
        <Route path="/movie/reviews/:movieId" element={<MovieReviews />} />
        <Route path="/movie/search" element={<SearchMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
