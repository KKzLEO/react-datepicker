import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import * as Style from './style'
import useClickOutside from 'hooks/useClickOutside'
import { useActor } from '@xstate/react'
import DayCalendar from './DayCalendar'
import MonthCalendar from './MonthCalendar'
import YearCalendar from './YearCalendar'

const Calendar = ({ actor, selectedDate, containerRef }) => {
  const [state, send] = useActor(actor)

  useClickOutside(containerRef, () => send('CLOSE'))

  const {
    calendarDate,
    dayCalendar,
    monthCalendar,
    yearCalendar,
  } = state.context

  const renderTitle = () => {
    if (state.matches('open.selectingDate')) {
      return `${calendarDate.toLocaleString('en-us', {
        month: 'short',
      })} ${calendarDate.getFullYear()}`
    }

    if (state.matches('open.selectingMonth')) {
      return calendarDate.getFullYear()
    }

    if (state.matches('open.selectingYear')) {
      const start = yearCalendar[1]
      const end = yearCalendar[yearCalendar.length - 2]

      return [start, end].join('-')
    }

    return null
  }

  const handleClickTitle = () => send('NAV_UP')
  const handleClickPrev = () => send('PREV')
  const handleClickNext = () => send('NEXT')
  const selectDate = ({ year, month, day }) => () => {
    send({ type: 'SELECT', payload: { year, month, day } })
  }

  return (
    <Style.Container
      visible={state.matches('open')}
      top={containerRef.current?.clientHeight}
    >
      <Style.TitleContainer>
        <Style.Arrow onClick={handleClickPrev}>{'<'}</Style.Arrow>
        <Style.Title onClick={handleClickTitle}>{renderTitle()}</Style.Title>
        <Style.Arrow onClick={handleClickNext}>{'>'}</Style.Arrow>
      </Style.TitleContainer>
      {state.matches('open.selectingDate') && (
        <DayCalendar
          selectedDate={selectedDate}
          calendarDate={calendarDate}
          calendar={dayCalendar}
          handleClickItem={selectDate}
        />
      )}
      {state.matches('open.selectingMonth') && (
        <MonthCalendar
          selectedDate={selectedDate}
          calendar={monthCalendar}
          handleClickItem={selectDate}
        />
      )}
      {state.matches('open.selectingYear') && (
        <YearCalendar
          selectedDate={selectedDate}
          calendar={yearCalendar}
          handleClickItem={selectDate}
        />
      )}
    </Style.Container>
  )
}

Calendar.propTypes = {}

export default Calendar
