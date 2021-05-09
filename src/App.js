// import Calendar from './components/Calendar'
import DatePicker from 'components/DatePicker'

import { inspect } from '@xstate/inspect'

inspect({
  iframe: false,
})

const FORMAT = 'YYYY-MM-DD'

function App() {
  const handleChange = (date) => console.log('date', date)

  return (
    <DatePicker
      onChange={handleChange}
      label="生日"
      value={new Date()}
      format={FORMAT}
      invalidFormatMessage={`格式必須為 ${FORMAT}`}
    />
  )
}

export default App
