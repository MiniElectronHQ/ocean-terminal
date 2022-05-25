import { useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi'
import { BiChevronDown } from 'react-icons/bi'
import { VscCircleLargeFilled } from 'react-icons/vsc'

import electron from 'electron'
const ipcRenderer = electron.ipcRenderer || false

const Toolbar = ({}) => {
  const [username, setUsername] = useState('username')
  const [hostname, setHostname] = useState('hostname')

  useEffect(() => {
    const data = ipcRenderer.sendSync('get-username-hostname')
    setHostname(data.hostname)
    setUsername(data.username)
  }, [])

  return (
    <div id="toolbar">
      <div className="flex items-center justify-between">
        <div className="p-2 flex items-center space-x-3">
          <div>
            <button className="flex items-center space-x-1 text-sm font-bold">
              <span>1/2</span> <BiChevronDown />
            </button>
            <div className="absolute hidden">select workspaces</div>
          </div>
          <button>
            <HiPlus />
          </button>
        </div>
        <div className="can-drag p-2 flex-1 text-center font-bold">
          ocean
          <span className="text-dracula-cyan">::</span>terminal{'  '}
          <span className="text-dracula-cyan ml-1">
            [{username}
            <span className="text-dracula-gray">@</span>
            {hostname}]
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            ipcRenderer.sendSync('close-app')
          }}
          className="cursor-pointer mr-2"
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
