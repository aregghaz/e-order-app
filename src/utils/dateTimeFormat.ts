export const timestampToDate = (date: Date | string) => {
  const year = new Date(date).getFullYear()
  const monthRaw = new Date(date).getMonth()
  const monthFormatted = monthRaw > 8 ? monthRaw + 1 : `0${monthRaw + 1}`
  const dayRaw = new Date(date).getDate()
  const day = dayRaw > 9 ? dayRaw : `0${dayRaw}`

  return `${day}/${monthFormatted}/${year}`
}

export const checkAge = (date: Date | string) => {
  const birthDate = new Date(date)
  const currentDate = new Date().getTime()
  const birthDateTimestamp = birthDate.getTime()
  const ageDifference = currentDate - birthDateTimestamp

  const millisecondsPerYear = 365 * 24 * 60 * 60 * 1000

  return Math.floor(ageDifference / millisecondsPerYear)
}
