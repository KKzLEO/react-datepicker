import React, { useState } from 'react'
import DatePicker from 'components/DatePicker'
import * as Style from './style'

const FORMAT = 'YYYY-MM-DD'

const DemoPage = (props) => {
  const [birthday, setBirthday] = useState(null)

  return (
    <Style.Container>
      <DatePicker
        onChange={setBirthday}
        label="生日"
        value={birthday}
        format={FORMAT}
        invalidFormatMessage={`格式必須為 ${FORMAT}`}
      />
    </Style.Container>
  )
}

DemoPage.propTypes = {}

export default DemoPage
