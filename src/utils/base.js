export const padStart = (string, targetLength, padString = ' ') => {
  return (Array(targetLength).join(padString) + string).slice(-targetLength)
}

export const isNil = (value) => value === null || value === undefined

export const noop = () => {}
