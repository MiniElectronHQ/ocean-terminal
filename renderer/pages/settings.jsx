import Toolbar from '../components/Toolbar'
import WavePanel from '../components/WavePanel'
import TabNav from '../components/TabNav'
import { useEffect, useState } from 'react'

function Home() {
  const [tabs, setTabs] = useState([])
  const [password, setPassword] = useState('')

  useEffect(() => {
    setTabs(window.electron.ipcRenderer.sendSync('get-tabs'))
    const sudoPassword =
      window.electron.ipcRenderer.sendSync('get-sudo-password')
    setPassword(sudoPassword)
  }, [])

  const setSudoPassword = (e) => {
    setPassword(e.target.value)
  }

  const updateSettings = (e) => {
    window.electron.ipcRenderer.send('save-sudo-password', password)
  }

  return (
    <div id="settings">
      <div id="settingsWrapper" style={{ height: 'calc(100vh - 80px)' }}>
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
          style={{ height: 'calc(100vh - 80px)' }}
        >
          <div className="p-3 bg-darker-800 rounded text-left">
            <h3 className="text-sm font-bold mb-0.5">Set Sudo Password</h3>
            <input
              type="password"
              placeholder="Enter sudo password..."
              className="text-gray-300 p-2 bg-dracula-dark-gray w-full border border-dracula-gray rounded"
              value={password}
              onChange={setSudoPassword}
            />

            <button
              onClick={updateSettings}
              className="py-1 px-2 rounded text-sm font-medium mt-2 bg-nosferatu-600 text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
