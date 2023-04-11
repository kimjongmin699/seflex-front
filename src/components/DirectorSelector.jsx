import React, { useState } from 'react'
import { LiveSearch } from './Admin/LiveSearch'
import { renderItem } from '../utils/helper'
import { useSearch } from '../hooks'
import { searchActor } from '../api/actor'
import Label from './Label'

export default function DirectorSelector({ onSelect }) {
  const [value, setValue] = useState('')
  const [profiles, setProfiles] = useState([])

  const { handleSearch, resetSearch } = useSearch()

  const handleOnChange = ({ target }) => {
    const { value } = target
    setValue(value)
    handleSearch(searchActor, value, setProfiles)
  }

  const handleOnSelect = (profile) => {
    setValue(profile.name)
    onSelect(profile)
    setProfiles([])
    resetSearch()
  }

  return (
    <div>
      <Label htmlFor="director">Direcor</Label>
      <LiveSearch
        name="director"
        value={value}
        results={profiles}
        placeholder="Search Profile"
        renderItem={renderItem}
        onSelect={handleOnSelect}
        onChange={handleOnChange}
      />
    </div>
  )
}
