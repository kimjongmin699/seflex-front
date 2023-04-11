import React, { useEffect, useState } from 'react'
import AppInfoBox from '../AppInfoBox'
import LatestUploads from '../LatestUploads'
import { getAppInfo } from '../../api/admin'
import { useNotification } from '../../hooks'
import MostRatedMovies from '../MostRatedMovies'

export const Dashboard = () => {
  const [appInfo, setAppInfo] = useState({
    movieCount: 0,
    reviewCount: 0,
    userCount: 0,
  })

  const { updateNotification } = useNotification()

  const fetchAppInfo = async () => {
    const { appInfo, error } = await getAppInfo()

    if (error) return updateNotification('error', error)
    setAppInfo({ ...appInfo })
  }

  useEffect(() => {
    fetchAppInfo()
  }, [])

  return (
    <div className="grid grid-cols-3 gap-5 p-5 mx-3">
      <AppInfoBox
        title="Total Uplaods"
        subTitle={appInfo.movieCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Reviews"
        subTitle={appInfo.reviewCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Users"
        subTitle={appInfo.userCount.toLocaleString()}
      />

      <LatestUploads />
      <MostRatedMovies />
    </div>
  )
}

// const search = (value) => {
//   console.log(value)
// }
// const debounceSearch = debounce(search, 500)
// const handleChane = ({ target }) => {
//   debounceSearch(target.value)
// }
// return (
//   <div className="p-14">
//     <input
//       type="text"
//       onChange={handleChane}
//       className="border border-gray-500"
//     />
//   </div>
// )
