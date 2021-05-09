import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { datePickerMachine } from 'machines/datePicker'
import { useMachine } from '@xstate/react'
import { noop, isNil } from 'utils/base'
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
  canInput,
}) => {
  const [state, send] = useMachine(datePickerMachine, {
    devTools: true,
    context: {
      selectedDate: isNil(value) ? new Date() : new Date(value),
      format,
      onChangeHook: onChange,
      canInput,
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

  const renderMessage = () => {
    if (state.matches('typing.invalid')) {
      return <Style.ErrorMessage>{invalidFormatMessage}</Style.ErrorMessage>
    }

    if (hasError && helperText) {
      return <Style.ErrorMessage>{helperText}</Style.ErrorMessage>
    }

    if (helperText) return <Style.Message>{helperText}</Style.Message>
  }

  return (
    <Style.Container ref={containerRef} className={className}>
      <Calendar
        actor={calendarActor}
        selectedDate={selectedDate}
        containerRef={containerRef}
      />

      {label && (
        <Style.Label
          {...(id && { htmlFor: id })}
          error={hasError || state.matches('typing.invalid')}
        >
          {label}
        </Style.Label>
      )}

      <Style.InputContainer>
        <Style.Input
          type="text"
          ref={ref}
          {...(id && { id })}
          value={inputDateString}
          onClick={handleInputClick}
          onChange={handleInputChange}
        />
        <Style.IconContainer onClick={openCalendar}>
          {CustomIcon ? CustomIcon : <Style.Icon size={20} />}
        </Style.IconContainer>
      </Style.InputContainer>
      {renderMessage()}
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
  canInput: false,
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
  canInput: PropTypes.bool,
}

export default DatePicker
