import Toolbar from '../components/Toolbar'
import WavePanel from '../components/WavePanel'
import TabNav from '../components/TabNav'
import { useEffect, useState } from 'react'
import Link from 'next/link'

function Home() {
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    setTabs(window.electron.ipcRenderer.sendSync('get-tabs'))
  }, [])

  return (
    <div>
      <Toolbar />
      <TabNav tabs={tabs} />
      <WavePanel />
      <div
        className="flex items-center justify-center w-full h-screen text-center"
        style={{ height: 'calc(100vh - 82px)' }}
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-1 text-nosferatu-50">
            ocean::terminal
          </h1>
          <p className="text-nosferatu-200 mb-4">
            A highly opinionated take on the ole' terminal emulator.
          </p>
          <p className="text-nosferatu-900 bg-nosferatu-700 p-1 px-3 text-xs font-bold rounded-full inline-block mx-auto text-center">
            v0.0.1
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
