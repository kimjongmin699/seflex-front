import React, { useEffect, useState } from 'react'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'
import { deleteActor, getActors, searchActor } from '../../api/actor'
import { useNotification, useSearch } from '../../hooks'
import NextAndPrevButton from '../NextAndPrevButton'
import UpdateActor from '../modals/UpdateActor'
import AppSearchForm from '../from/AppSearchForm'
import NotFoundText from '../NotFoundText'
import ConfirmModal from '../modals/ConfirmModal'

let currentPageNo = 0
const limit = 20

export const Actor = () => {
  const [actors, setActors] = useState([])
  const [results, setResults] = useState([])
  const [busy, setBusy] = useState(false)
  const [reachToEnd, setReachToEnd] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)

  const { updateNotification } = useNotification()
  const { handleSearch, resetSearch, resultNotFound } = useSearch()

  const fetchActors = async (pageNo) => {
    const { profiles, error } = await getActors(pageNo, limit)

    if (error) return updateNotification('error', error)

    if (!profiles.length) {
      currentPageNo = pageNo - 1
      return setReachToEnd(true)
    }

    setActors([...profiles])
  }
  useEffect(() => {
    fetchActors(currentPageNo)
  }, [])

  const handleOnNextClick = () => {
    if (reachToEnd) return
    currentPageNo += 1
    fetchActors(currentPageNo)
  }

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return
    currentPageNo -= 1
    fetchActors(currentPageNo)
  }

  const handleEditClick = (profile) => {
    setShowUpdateModal(true)
    setSelectedProfile(profile)
  }

  const hideUpdateMoodal = () => {
    setShowUpdateModal(false)
  }

  const handleOnSearchSubmit = (value) => {
    handleSearch(searchActor, value, setResults)
    console.log(value)
  }

  const handleSearchFromReset = () => {
    resetSearch()
    setResults([])
  }

  const handleOnActorUpdate = (profile) => {
    const updatedActors = actors.map((actor) => {
      if (profile.id === actor.id) {
        return profile
      }
      return actor
    })
    setActors([...updatedActors])
  }

  const handleDeleteClick = (profile) => {
    setSelectedProfile(profile)
    setShowConfirmModal(true)
  }

  const hideConfirmModal = () => {
    setShowConfirmModal(false)
  }

  const handleOnDeleteConfirm = async () => {
    setBusy(true)
    const { error, message } = await deleteActor(selectedProfile.id)
    console.log(message)
    setBusy(false)

    if (error) return updateNotification('error', error)
    updateNotification('success', message)
    hideConfirmModal()
    fetchActors(currentPageNo)
  }
  return (
    <>
      <div className="p-5">
        <div className="flex justify-end mb-5">
          <AppSearchForm
            onReset={handleSearchFromReset}
            onSubmit={handleOnSearchSubmit}
            placeholder="Search Actor.."
            showResetIcon={results.length || resultNotFound}
          />
        </div>
        <NotFoundText text="Record Not Found" visible={resultNotFound} />

        <div className="grid grid-cols-4 gap-5  my-5">
          {results.length || resultNotFound
            ? results.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleEditClick(actor)}
                  onDeleteClick={() => handleDeleteClick(actor)}
                />
              ))
            : actors.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleEditClick(actor)}
                  onDeleteClick={() => handleDeleteClick(actor)}
                />
              ))}
        </div>

        {!results.length && !resultNotFound ? (
          <NextAndPrevButton
            handleOnNextClick={handleOnNextClick}
            handleOnPrevClick={handleOnPrevClick}
            className="mt-5"
          />
        ) : null}
      </div>
      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        subtitle="This action will remove this profile premanently!"
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
      />
      <UpdateActor
        visible={showUpdateModal}
        onClose={hideUpdateMoodal}
        initialState={selectedProfile}
        onSuccess={handleOnActorUpdate}
      />
    </>
  )
}

const ActorProfile = ({ profile, onEditClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false)
  const acceptedNameLength = 15

  const handleOnMouseEnter = () => {
    setShowOptions(true)
  }

  const handleOnMouseLeave = () => {
    setShowOptions(false)
  }

  if (!profile) return null

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name

    return name.substring(0, acceptedNameLength) + '...'
  }

  const { name, avatar, about = '' } = profile

  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary h-20 overflow-hidden rounded">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 aspect-square object-cover"
        />
        <div className="px-2">
          <h1 className="tedt-xl font-semibold text-primary dark:text-white whitespace-nowrap">
            {getName(name)}
          </h1>
          <p className="text-primary dark:text-white opacity-75">
            {about.substring(0, 50)}
          </p>
        </div>
        <Options
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          visible={showOptions}
        />
      </div>
    </div>
  )
}

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null
  return (
    <div className="absolute inset-0 space-x-5 flex justify-center items-center bg-primary bg-opacity-25 backdrop-blur-sm">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  )
}
