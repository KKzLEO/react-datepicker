export const padStart = (string, targetLength, padString = ' ') => {
  return (Array(targetLength).join(padString) + string).slice(-targetLength)
}

export const isNil = (value) => value === null || value === undefined

export const noop = () => {}

export const getUrlParams = (location = window.location) => {
  const { search } = location

  if (isNil(search)) return {}

  return search
    .substring(1)
    .split('&')
    .reduce((acc, param) => {
      const [key, value] = param.split('=')

      return {
        ...acc,
        [key]: value,
      }
    }, {})
}
