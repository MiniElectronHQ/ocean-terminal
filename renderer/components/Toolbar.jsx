import { useEffect, useState } from 'react'
import { VscCircleLargeFilled } from 'react-icons/vsc'
import Link from 'next/link'
import { HiOutlineCog, HiOutlineHome } from 'react-icons/hi'

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
          <span className="text-dracula-cyan">
            {username}
            <span className="text-dracula-gray">@</span>
            {hostname}
          </span>
        </div>
        <div className="can-drag p-2 flex-1 text-center font-bold">
          ocean
          <span className="text-dracula-cyan">~</span>terminal
        </div>
        <div className="flex items-center">
          <Link href="/home">
            <div className="hover:bg-darker-900 p-1 px-1.5 mr-3 rounded">
              <HiOutlineHome className="text-dracula-gray" />
            </div>
          </Link>
          {/* <Link href="/settings">
            <div className="hover:bg-darker-900 p-1 px-1.5 mr-3 rounded">
              <HiOutlineCog className="text-dracula-gray" />
            </div>
          </Link> */}
          <button
            type="button"
            onClick={() => {
              window.electron.ipcRenderer.sendSync('close-app')
            }}
            style={{
              color: '#e2595d',
              zIndex: '9999999',
            }}
          >
            <VscCircleLargeFilled />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toolbar
