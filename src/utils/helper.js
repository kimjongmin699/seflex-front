export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  return isValid.test(email)
}

export const getToken = () => localStorage.getItem('auth-token')

export const catchError = (error) => {
  const { response } = error
  if (response?.data) return response.data

  return { error: error.message || error }
}

export const renderItem = (result) => {
  return (
    <div key={result.id} className="flex rounded space-x-2 overflow-hidden">
      <img
        src={result.avatar}
        alt=""
        className="w-16 h-16 rounded object-cover"
      />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  )
}

export const commonInputClasses =
  'w-full outline-none bg-transparent text-primary dark:text-white dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary transition'

export const getPoster = (posters = []) => {
  const { length } = posters
  if (!length) return null
  //if poster has more 2 items then selecting second poster.
  if (length > 2) return posters[1]
  //otherwise the first one
  return posters[0]
}

export const convertReviewCount = (count = 0) => {
  if (count <= 999) return count

  return parseFloat(count / 1000).toFixed(2) + 'k'
}
