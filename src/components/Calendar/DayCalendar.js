import React from 'react'
import PropTypes from 'prop-types'
import { MINI_NAME_OF_WEEK_MAP } from 'constants/calendar'
import { isSameDate, isSameMonth } from 'utils/date'
import { ROWS, COLUMNS } from 'constants/calendar'

import * as Style from './style'

const DayCalendar = ({
  selectedDate,
  calendar,
  handleClickItem,
  calendarDate,
}) => {
  const today = new Date()

  return (
    <Style.GridContainer rows={ROWS} columns={COLUMNS}>
      {Object.values(MINI_NAME_OF_WEEK_MAP).map((weekDay) => (
        <Style.WeekDayItem key={weekDay}>{weekDay}</Style.WeekDayItem>
      ))}
      {calendar.map((date) => (
        <Style.GridItem
          key={+date}
          active={isSameDate(selectedDate, date)}
          highlight={isSameDate(today, date)}
          disable={!isSameMonth(calendarDate, date)}
          clickable={isSameMonth(calendarDate, date)}
          onClick={handleClickItem({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
          })}
        >
          {date.getDate()}
        </Style.GridItem>
      ))}
    </Style.GridContainer>
  )
}

DayCalendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  calendarDate: PropTypes.instanceOf(Date).isRequired,
  calendar: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  handleClickItem: PropTypes.func.isRequired,
}

export default DayCalendar
