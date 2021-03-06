import React, { useState, useRef } from 'react'
import DatePicker from 'components/DatePicker'
import * as Style from './style'

const FORMAT = 'YYYY-MM-DD'

const DemoPage = () => {
  const [input, setInput] = useState(null)

  const ref = useRef(null)

  return (
    <Style.Container>
      <Style.Group>
        <DatePicker
          onChange={setInput}
          label="可以手動輸入"
          value={input}
          format={FORMAT}
          invalidFormatMessage={`格式必須為 ${FORMAT}`}
          canInput
        />
      </Style.Group>
      <Style.Group>
        <DatePicker
          onChange={setInput}
          label="不可以手動輸入"
          value={input}
          format={FORMAT}
          invalidFormatMessage={`格式必須為 ${FORMAT}`}
        />
      </Style.Group>
      <Style.Group>
        <DatePicker
          onChange={setInput}
          label="可以自定義 format, MM/DD/YYYY"
          value={input}
          format="MM/DD/YYYY"
          invalidFormatMessage={`格式必須為 MM/DD/YYYY`}
        />
      </Style.Group>
      <Style.Group>
        <DatePicker
          onChange={setInput}
          label="MM/DD/YYYY 不是這個 format 都會跳出 invalid format"
          value={input}
          format="MM/DD/YYYY"
          invalidFormatMessage={`格式必須為 MM/DD/YYYY`}
          canInput
        />
      </Style.Group>
      <Style.Group>
        <DatePicker
          onChange={setInput}
          label="自定義錯誤"
          value={input}
          format={FORMAT}
          invalidFormatMessage={`格式必須為 ${FORMAT}`}
          hasError
          helperText="自定義的錯誤訊息"
        />
      </Style.Group>
      <Style.Group>
        <DatePicker
          id="react-date-picker"
          onChange={setInput}
          label="有設 ID 可以點 label input"
          value={input}
          format={FORMAT}
          invalidFormatMessage={`格式必須為 ${FORMAT}`}
          canInput
        />
      </Style.Group>
      <Style.Group>
        <DatePicker
          onChange={setInput}
          label="可以改 icon"
          value={input}
          format={FORMAT}
          invalidFormatMessage={`格式必須為 ${FORMAT}`}
          icon={<Style.CustomCalendarIcon size={20} />}
        />
      </Style.Group>
      <Style.Group>
        <DatePicker
          onChange={setInput}
          label="有 helperText"
          value={input}
          format={FORMAT}
          invalidFormatMessage={`格式必須為 ${FORMAT}`}
          helperText="我是 helper text"
        />
      </Style.Group>
      <Style.Group>
        <DatePicker
          onChange={setInput}
          label="ref"
          value={input}
          format={FORMAT}
          inputRef={ref}
          {...(ref?.current?.clientHeight && {
            helperText: `client height: ${ref?.current?.clientHeight}`,
          })}
          invalidFormatMessage={`格式必須為 ${FORMAT}`}
        />
      </Style.Group>
    </Style.Container>
  )
}

export default DemoPage
