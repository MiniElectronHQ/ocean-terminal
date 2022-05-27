import Toolbar from '../components/Toolbar'
import WavePanel from '../components/WavePanel'
import TabNav from '../components/TabNav'
import { useEffect, useState } from 'react'

function Home() {
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    setTabs(window.electron.ipcRenderer.sendSync('get-tabs'))
  }, [])

  return (
    <div id="home">
      <div id="homeWrapper" style={{ height: 'calc(100vh - 79px)' }}>
        <Toolbar />
        <TabNav
          tabs={tabs}
          setTabs={(data) => {
            setTabs(data)
          }}
        />
        <WavePanel />
        <div
          className="flex items-center justify-center w-full h-screen text-center"
          style={{ height: 'calc(100vh - 79px)' }}
        >
          <div className="p-12 bg-darker-900 shadow-xl rounded">
            <h1 className="text-3xl font-bold mb-1 text-white">
              ocean
              <span className="text-dracula-cyan">~</span>terminal
            </h1>
            <p className="text-nosferatu-200 text-xs">
              Just another highly opinionated terminal emulator.
            </p>
            <h1 className="text-base font-bold text-nosferatu-100 my-3 flex justify-center items-center">
              <img
                src="images/wynter.jpg"
                className="w-6 h-6 mr-2 rounded-full"
              />
              by Wynter Jones
            </h1>
            <p className="text-white bg-nosferatu-300 p-1 px-3 text-xs font-bold rounded-full inline-block mx-auto text-center mb-1">
              v0.0.1
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
