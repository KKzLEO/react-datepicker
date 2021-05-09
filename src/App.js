import DemoPage from 'components/page/Demo'
import { inspect } from '@xstate/inspect'
import { getUrlParams } from 'utils/base'

if (getUrlParams().debug) {
  inspect({
    iframe: false,
  })
}

function App() {
  return <DemoPage />
}

export default App
