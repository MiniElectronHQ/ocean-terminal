import { useEffect, useState } from 'react'
import { VscCircleLargeFilled } from 'react-icons/vsc'

const Toolbar = ({}) => {
  const [username, setUsername] = useState('username')
  const [hostname, setHostname] = useState('hostname')

  useEffect(() => {
    const data = window.electron.ipcRenderer.sendSync('get-username-hostname')
    setHostname(data.hostname)
    setUsername(data.username)
  }, [])

  return (
    <div id="toolbar">
      <div className="flex items-center justify-between px-2">
        <div className="font-bold">
          <span className="text-dracula-cyan ml-1">
            {username}
            <span className="text-dracula-gray">@</span>
            {hostname}
          </span>
        </div>
        <div className="can-drag p-2 flex-1 text-center font-bold">
          ocean
          <span className="text-dracula-cyan">~</span>terminal
        </div>
        <button
          type="button"
          onClick={() => {
            window.electron.ipcRenderer.sendSync('close-app')
          }}
          className="cursor-pointer"
          style={{
            color: '#e2595d',
            zIndex: '9999999',
          }}
        >
          <VscCircleLargeFilled />
        </button>
      </div>
    </div>
  )
}

export default Toolbar
