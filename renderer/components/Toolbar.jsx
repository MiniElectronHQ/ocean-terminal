import { useEffect, useState } from 'react'
import { HiPlus } from 'react-icons/hi'
import { BiChevronDown } from 'react-icons/bi'
import { VscCircleLargeFilled } from 'react-icons/vsc'

const Toolbar = ({}) => {
  const [username, setUsername] = useState('username')
  const [hostname, setHostname] = useState('hostname')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const data = window.electron.ipcRenderer.sendSync('get-username-hostname')
    setHostname(data.hostname)
    setUsername(data.username)
  }, [])

  return (
    <div id="toolbar">
      <div className="flex items-center justify-between">
        <div className="px-2 py-1 flex items-center space-x-3">
          <div>
            <button
              className="flex items-center space-x-1 px-1 text-sm font-bold"
              onClick={() => {
                setVisible(!visible)
              }}
            >
              <span>1/2</span> <BiChevronDown />
            </button>
            {visible && (
              <div
                className="fixed left-0 bg-dracula-dark-gray border-r border-dracula-gray"
                style={{
                  top: '41px',
                  width: '250px',
                  height: 'calc(100vh - 41px)',
                  zIndex: 999999,
                }}
              >
                <div className="p-3">select workspaces</div>
              </div>
            )}
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
            window.electron.ipcRenderer.sendSync('close-app')
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
