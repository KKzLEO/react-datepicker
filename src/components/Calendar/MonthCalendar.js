import React from 'react'
import PropTypes from 'prop-types'
import { isSameMonth } from 'utils/date'
import { MONTH_ROWS, MONTH_COLUMNS } from 'constants/calendar'

import * as Style from './style'

const MonthCalendar = ({ selectedDate, handleClickItem, calendar }) => {
  return (
    <Style.GridContainer rows={MONTH_ROWS} columns={MONTH_COLUMNS}>
      {calendar.map((date) => (
        <Style.GridItem
          key={+date}
          active={isSameMonth(selectedDate, date)}
          onClick={handleClickItem({ month: date.getMonth() })}
          clickable
          size={50}
        >
          {date.toLocaleString('en-us', {
            month: 'short',
          })}
        </Style.GridItem>
      ))}
    </Style.GridContainer>
  )
}

MonthCalendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  calendar: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  handleClickItem: PropTypes.func.isRequired,
}

export default MonthCalendar
