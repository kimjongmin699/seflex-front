import React, { useState } from 'react'
import { LiveSearch } from '../Admin/LiveSearch'

import { useNotification, useSearch } from '../../hooks'
import { commonInputClasses, renderItem } from '../../utils/helper'
import { searchActor } from '../../api/actor'

//const cast = [{ actor: id, roleAs: '', leadActor: true }]

const defaultCastInfo = {
  profile: {},
  roleAs: '',
  leadActor: false,
}

export default function CastForm({ onSubmit }) {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo })
  const [profiles, setProfiles] = useState([])
  const { leadActor, profile, roleAs } = castInfo

  const { handleSearch, resetSearch } = useSearch()
  const { updateNotification } = useNotification()

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target

    if (name === 'leadActor')
      return setCastInfo({ ...castInfo, leadActor: checked })

    setCastInfo({ ...castInfo, [name]: value })
  }
  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile })
  }
  const handleSubmit = () => {
    const { profile, roleAs } = castInfo
    if (!profile.name) return updateNotification('error', 'Cast-profile empty')
    if (!roleAs.trim()) return updateNotification('error', 'Cast-role empty')

    onSubmit(castInfo)
    setCastInfo({ ...defaultCastInfo, profile: { name: '' } })
    resetSearch()
    setProfiles([])
  }

  const handleProfileChange = ({ target }) => {
    const { value } = target
    const { profile } = castInfo
    profile.name = value
    setCastInfo({ ...castInfo, ...profile })

    handleSearch(searchActor, value, setProfiles)
  }

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        className="w-4 h-4"
        checked={leadActor}
        onChange={handleOnChange}
        title="Set as lead Actor"
      />
      <LiveSearch
        placeholder="Searh Profile"
        value={profile.name}
        results={profiles}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
        onChange={handleProfileChange}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Role as"
          className={commonInputClasses + ' rounded p-1 text-lg border-2'}
          value={roleAs}
          name="roleAs"
          onChange={handleOnChange}
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-secondary hover:opacity-70 dark:bg-white dark:text-primary font-semibold text-white px-1 rounded"
      >
        Add
      </button>
    </div>
  )
}
