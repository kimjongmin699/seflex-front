import React from 'react'
import { NotVerified } from './user/NotVerified'
import { Container } from './Container'
import HeroSlideshow from './user/HeroSlideShow'
import FirstGrade from './user/FirstGrade'
import SecondGrade from './user/SecondGrade'
import ThirdGrade from './user/ThirdGrade'
import FourthGrade from './user/FourthGrade'
import FifthGrade from './user/FifthGrade'
import SixthGrade from './user/SixthGrade'

export const Home = () => {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="px-2 xl:p-0">
        <NotVerified />
        {/* slider */}
        <HeroSlideshow />
        {/* Most rated movies */}
        <div className="space-y-3 py-8">
          <div className="flex overflow-x-scroll custom-scroll-bar ">
            <FirstGrade />
          </div>
          <div className="flex overflow-x-scroll custom-scroll-bar ">
            <SecondGrade />
          </div>
          <div className="flex overflow-x-scroll custom-scroll-bar">
            <ThirdGrade />
          </div>
          <div className="flex overflow-x-scroll custom-scroll-bar">
            <FourthGrade />
          </div>
          <div className=" flex overflow-x-scroll custom-scroll-bar">
            <FifthGrade />
          </div>
          <div className=" flex overflow-x-scroll custom-scroll-bar">
            <SixthGrade />
          </div>
        </div>
      </Container>
    </div>
  )
}
