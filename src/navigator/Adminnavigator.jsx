import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from '../components/NotFound'

import { Actor } from '../components/Admin/Actor'
import Movie from '../components/Admin/Movie'
import { Dashboard } from '../components/Admin/Dashboard'
import Navbar from '../components/Admin/Navbar'
import Header from '../components/Admin/Header'
import MovieUpload from '../components/Admin/MovieUpload'
import ActorUpload from '../components/modals/ActorUpload'
import SearchMovies from '../components/Admin/SearchMovies'

export const Adminnavigator = () => {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false)
  const [showActorUploadModal, setShowActorUploadModal] = useState(false)

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false)
  }

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true)
  }

  const hideActorUploadModal = () => {
    setShowActorUploadModal(false)
  }

  const displayActorUploadModal = () => {
    setShowActorUploadModal(true)
  }

  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        <Navbar />
        <div className="flex-1 max-w-screen-xl">
          <Header
            onAddActorClick={displayActorUploadModal}
            onAddMovieClick={displayMovieUploadModal}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/actors" element={<Actor />} />
            <Route path="/search" element={<SearchMovies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </>
  )
}

// <div className="flex dark:bg-primary bg-white">
//       <Navbar />
//       <div className="flex-1  p-2 max-w-screen-xl">
//         <Header
//           onAddActorClick={() => console.log('actor')}
//           onAddMovieClick={() => console.log('movie')}
//         />
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/movies" element={<Movie />} />
//           <Route path="/actors" element={<Actor />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </div>
