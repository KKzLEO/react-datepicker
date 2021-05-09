import { getDaysInMonth, subtract, add, getDacade } from 'utils/date'
import { GRIDS, MAX_YEARS, MIN_YEARS } from 'constants/calendar'

export const generateCalender = (year, month) => {
  const dateObj = new Date(year, month - 1, 1)
  const daysInMonth = getDaysInMonth(dateObj)
  const weekNumber = dateObj.getDay()

  const prevMonthCalendar = Array.from({ length: weekNumber }, (_, index) => {
    return subtract(dateObj, { days: weekNumber - index })
  })

  const thisMonthCalendar = Array.from(
    { length: daysInMonth },
    (_, index) => new Date(year, month - 1, index + 1)
  )

  const nextMonthFirstDay = add(dateObj, { months: 1 })
  const nextMonthCalendar = Array.from(
    { length: GRIDS - weekNumber - daysInMonth },
    (_, index) => add(nextMonthFirstDay, { days: index })
  )

  return [...prevMonthCalendar, ...thisMonthCalendar, ...nextMonthCalendar]
}

export const generateMonthCalender = (year) => {
  const jan = new Date(year, 0, 1)

  return Array.from({ length: 12 }, (_, index) => {
    return add(jan, { months: index })
  })
}

export const generateYearCalender = (year) => {
  if (year > MAX_YEARS || year < MIN_YEARS) return []

  const [decadeStart, decadeEnd] = getDacade(year)

  const prev = decadeStart === MIN_YEARS ? null : decadeStart - 1
  const thisDecade = Array.from(
    { length: 10 },
    (_, index) => decadeStart + index
  )
  const next = decadeEnd === MAX_YEARS ? null : decadeEnd + 1

  return [prev, ...thisDecade, next]
}
