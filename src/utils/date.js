import { MONTHS_HAVE_30_DAYS, MAX_YEARS, MIN_YEARS } from 'constants/calendar'
import { padStart } from './base'

export const add = (date, { days, months, years }) => {
  const dateObj = new Date(date)

  if (days) dateObj.setDate(dateObj.getDate() + days)
  else if (months) dateObj.setMonth(dateObj.getMonth() + months)
  else if (years) dateObj.setFullYear(dateObj.getFullYear() + years)

  return dateObj
}

export const subtract = (date, { days, months, years }) => {
  return add(date, { days: -days, months: -months, years: -years })
}

export const getDacade = (year) => {
  const decadeStart = Math.floor(year / 10) * 10
  const decadeEnd = decadeStart + 9

  return [decadeStart, decadeEnd]
}

export const isSameDate = (dateA, dateB) => {
  const isSameYear = dateA.getFullYear() === dateB.getFullYear()
  const isSameMonth = dateA.getMonth() === dateB.getMonth()
  const isSameDay = dateA.getDate() === dateB.getDate()

  return isSameYear && isSameMonth && isSameDay
}

export const isSameMonth = (dateA, dateB) => {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth()
  )
}

export const isSameDacade = (yearA, yearB) => {
  const [start, end] = getDacade(yearB)

  return yearA <= end && yearA >= start
}

export const isLeapYear = (year) => {
  if (year % 4 !== 0) return false
  if (year % 100 === 0 && year % 400 !== 0) return false

  return true
}

export const getDaysInMonth = (date) => {
  const isLeap = isLeapYear(date.getFullYear())
  const month = date.getMonth() + 1
  const isFeb = month === 2

  if (isLeap && isFeb) return 29
  if (isFeb) return 28
  if (MONTHS_HAVE_30_DAYS.includes(month)) return 30

  return 31
}

export const isDate = (date) => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]'
  const isValidDate = date && !Number.isNaN(date.valueOf())

  return isDate && isValidDate
}

export const format = (date, format = 'YYYY/MM/DD') => {
  const dateObj = new Date(date)

  if (!isDate(dateObj)) return new Error('invalid date')

  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  const hour = dateObj.getHours()
  const hour12 = convert24HourTo12(hour)
  const minutes = dateObj.getMinutes()
  const second = dateObj.getSeconds()

  return format
    .replace('YYYY', year)
    .replace('MM', padStart(month, 2, '0'))
    .replace('DD', padStart(day, 2, '0'))
    .replace('HH', padStart(hour, 2, '0'))
    .replace('hh', padStart(hour12, 2, '0'))
    .replace('mm', padStart(minutes, 2, '0'))
    .replace('ss', padStart(second, 2, '0'))
}

export const convert24HourTo12 = (hour) => hour % 12 || 12

export const isValidDate = (dateString, format = 'YYYY/MM/DD') => {
  // Check if it can be coverted to date obj
  if (!isDate(new Date(dateString))) return false

  // Check length
  if (dateString.length !== format.length) return false

  const isDividedBySlash = format.includes('/')

  const dateStringArray = isDividedBySlash
    ? dateString.split('/')
    : dateString.split('-')
  const formatArray = isDividedBySlash ? format.split('/') : format.split('-')

  if (dateStringArray.length !== formatArray.length) return false
  if (
    !dateStringArray.every(
      (element, index) => element.length === formatArray[index].length
    )
  ) {
    return false
  }

  const year = parseInt(dateStringArray[formatArray.indexOf('YYYY')], 10)
  const month = parseInt(dateStringArray[formatArray.indexOf('MM')], 10)
  const day = parseInt(dateStringArray[formatArray.indexOf('DD')], 10)

  if (isNaN(year) || isNaN(month) || isNaN(day)) return false

  if (year > MAX_YEARS || year < MIN_YEARS) return false

  return true
}
