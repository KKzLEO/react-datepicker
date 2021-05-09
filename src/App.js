import DemoPage from 'components/page/Demo'

import { inspect } from '@xstate/inspect'

inspect({
  iframe: false,
})

function App() {
  return <DemoPage />
}

export default App
