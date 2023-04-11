import React, { useEffect, useState } from 'react'
import PosterSelector from '../PosterSelector'
import Selector from '../Selector'
import { useNotification } from '../../hooks'
import { ImSpinner3 } from 'react-icons/im'
import { commonInputClasses } from '../../utils/helper'

const defaultActorInfo = {
  name: '',
  about: '',
  avatar: null,
  gender: '',
}

const genderOptions = [
  { title: 'Male', value: 'male' },
  {
    title: 'Female',
    vlaue: 'female',
  },
  {
    title: 'Other',
    vlaue: 'other',
  },
]

const validateActor = ({ avatar, name, about, gender }) => {
  if (!name.trim()) return { error: 'Name is missing' }
  if (!about.trim()) return { error: 'About is missing' }
  if (!gender.trim()) return { error: 'Gender is missing' }
  if (avatar && !avatar.type?.startsWith('image'))
    return { error: 'Invalid Image File' }

  return { error: null }
}

export default function ActorForm({
  title,
  initialState,
  btnTitle,
  busy,
  onSubmit,
}) {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo })
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState('')
  const { updateNotification } = useNotification()

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file)
    setSelectedAvatarForUI(url)
  }

  const handleChange = ({ target }) => {
    const { value, name, files } = target
    if (name === 'avatar') {
      const file = files[0]
      updatePosterForUI(file)
      return setActorInfo({ ...actorInfo, avatar: file })
    }
    setActorInfo({ ...actorInfo, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { error } = validateActor(actorInfo)
    if (error) updateNotification('error', error)

    const formData = new FormData()
    //for (let key in actorInfo) {
    //  if (key) formData.append('key', actorInfo[key])
    //}
    formData.append('name', name)
    formData.append('about', about)
    formData.append('gender', gender)
    formData.append('avatar', avatar)

    onSubmit(formData)
  }

  useEffect(() => {
    if (initialState) {
      setActorInfo({ ...initialState, avatar: null })
      setSelectedAvatarForUI(initialState.avatar)
    }
  }, [initialState])

  const { about, name, gender, avatar } = actorInfo

  return (
    <form
      onSubmit={handleSubmit}
      className=" dark:bg-primary bg-white p-3 w-[35rem] rounded"
    >
      <div className="flex justify-between items-center mb-3 ">
        <h1 className="font-semibold text--xl dark:text-white text-primary">
          {title}
        </h1>
        <button className="flex items-center justify-center h-8 w-24 hover:opacity-80 rounded transition px-3 py-1 bg-primary text-white dark:bg-white dark:text-primary">
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
      </div>
      {/* <img
          src="https://photo.jtbc.co.kr/news/jam_photo/202211/16/ce71b737-0e35-4d2c-b44a-8ae8acd18094.jpg"
          alt=""
          className="w-36 h-36 aspect-square object-cover roundede"
        /> */}
      <div className="space-x-2 flex mt-3">
        <PosterSelector
          name="avatar"
          onChange={handleChange}
          selectedPoster={selectedAvatarForUI}
          className="w-36 h-36 aspect-square object-cover"
          label="Select Avatar"
          accept="image/jpg, image/jpeg, image/png"
        />
        <div className="flex-grow flex flex-col space-y-2">
          <input
            name="name"
            onChange={handleChange}
            placeholder="Enter Name"
            type="text"
            value={name}
            className={commonInputClasses + ' border-b-2'}
          />
          <textarea
            name="about"
            onChange={handleChange}
            type="text"
            value={about}
            placeholder="About"
            className={commonInputClasses + ' border-b-2 resize-none h-full'}
          ></textarea>
        </div>
      </div>
      <div className="mt-3">
        <Selector
          options={genderOptions}
          label="Gender"
          value={gender}
          onChange={handleChange}
          name="gender"
        />
      </div>
    </form>
  )
}
