import React from 'react'
import PropTypes from 'prop-types'
import { YEAR_ROWS, YEAR_COLUMNS } from 'constants/calendar'
import { isSameDacade } from 'utils/date'

import * as Style from './style'

const YearCalendar = ({ selectedDate, handleClickItem, calendar }) => {
  return (
    <Style.GridContainer rows={YEAR_ROWS} columns={YEAR_COLUMNS}>
      {calendar.map((year, index) => (
        <Style.GridItem
          // key={year}
          active={year === selectedDate.getFullYear()}
          onClick={handleClickItem({ year })}
          disable={!isSameDacade(year, calendar[1])}
          clickable={isSameDacade(year, calendar[1])}
          size={50}
        >
          {year === null ? '' : year}
        </Style.GridItem>
      ))}
    </Style.GridContainer>
  )
}

YearCalendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  calendar: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.oneOf([null]),
    ])
  ).isRequired,
  handleClickItem: PropTypes.func.isRequired,
}

export default YearCalendar
