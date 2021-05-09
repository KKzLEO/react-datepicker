import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { datePickerMachine } from 'machines/datePicker'
import { useMachine } from '@xstate/react'
import { noop } from 'utils/base'
import Calendar from 'components/Calendar'

import * as Style from './style'

const DatePicker = ({
  onChange,
  id,
  label,
  format,
  value,
  className,
  ref,
  icon: CustomIcon,
  hasError,
  helperText,
  invalidFormatMessage,
}) => {
  const [state, send] = useMachine(datePickerMachine, {
    devTools: true,
    context: {
      selectedDate: new Date(value),
      format,
      onChangeHook: onChange,
    },
  })
  const containerRef = useRef(null)

  const { calendarActor, selectedDate, inputDateString } = state.context

  const handleInputChange = (e) => {
    send('CHANGE', { date: e.target.value })
  }

  const handleInputClick = () => {
    send('CLICK')
  }

  const openCalendar = () => {
    send('OPEN')
  }

  return (
    <Style.Container ref={containerRef} className={className}>
      <Calendar
        actor={calendarActor}
        selectedDate={selectedDate}
        containerRef={containerRef}
      />

      {label && <Style.Label htmlFor={id}>{label}</Style.Label>}

      <Style.InputContainer>
        <Style.Input
          type="text"
          ref={ref}
          id={id}
          value={inputDateString}
          onClick={handleInputClick}
          onChange={handleInputChange}
        />
        <Style.IconContainer onClick={openCalendar}>
          {CustomIcon ? <CustomIcon /> : <Style.Icon size={20} />}
        </Style.IconContainer>
      </Style.InputContainer>
      {state.matches('typing.invalid') && (
        <Style.ErrorMessage>{invalidFormatMessage}</Style.ErrorMessage>
      )}
      {hasError && helperText && (
        <Style.ErrorMessage>{helperText}</Style.ErrorMessage>
      )}
      {helperText && <Style.Message>{helperText}</Style.Message>}
    </Style.Container>
  )
}

DatePicker.defaultProps = {
  onChange: noop,
  id: '',
  label: '',
  value: new Date(),
  format: 'YYYY/MM/DD',
  helperText: '',
  hasError: false,
  icon: null,
  ref: null,
  className: '',
  invalidFormatMessage: 'Invalid format',
}

DatePicker.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.string,
  format: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  className: PropTypes.string,
  ref: PropTypes.any,
  icon: PropTypes.node,
  hasError: PropTypes.bool,
  helperText: PropTypes.string,
  invalidFormatMessage: PropTypes.string,
}

export default DatePicker
