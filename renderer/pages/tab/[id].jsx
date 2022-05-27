import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Toolbar from '../../components/Toolbar'
import TabNav from '../../components/TabNav'
import WavePanel from '../../components/WavePanel'
import CommandLine from '../../components/CommandLine'
import TerminalToolbar from '../../components/TerminalToolbar'
import { XTerm } from 'xterm-for-react'
import { FitAddon } from 'xterm-addon-fit'
import _ from 'lodash'

function Tab() {
  const router = useRouter()
  const { id } = router.query

  const [tabs, setTabs] = useState([])
  const [tab, setTab] = useState({})
  const [command, setCommand] = useState('')
  const [path, setPath] = useState('')

  const xtermRef = useRef(null)
  const fitAddon = new FitAddon()

  useEffect(() => {
    const currentTab = window.electron.ipcRenderer.sendSync('get-tab', id)
    window.electron.ipcRenderer.send('set-current-tab-id', id)
    setTabs(window.electron.ipcRenderer.sendSync('get-tabs'))
    setTab(currentTab)
    setCommand(currentTab.command)
    setPath(visiblePath(currentTab.path))
    xtermRef.current.terminal.writeUtf8('\x1bc')
    xtermRef.current.terminal.writeUtf8(currentTab.output)
  }, [id])

  useEffect(() => {
    let testTerm = xtermRef.current.terminal
    let testFitAddon = fitAddon

    window.electron.ipcRenderer.on('reply-spawn-pipe', (event, result) => {
      if (result !== '\u001b[H\u001b[2J\u001b[3J') {
        testTerm.writeUtf8(`${result}\n`)
      } else {
        testTerm.writeUtf8(result)
      }
      testFitAddon.fit()

      const id = window.electron.ipcRenderer.sendSync('get-current-tab-id')
      const currentTab = window.electron.ipcRenderer.sendSync('get-tab', id)
      currentTab.output = currentTab.output + result
      window.electron.ipcRenderer.sendSync('edit-tab', {
        id,
        tab: currentTab,
      })
    })
  }, [])

  const submitCommand = (event) => {
    const command = event.target.value
    setCommand(command)
    tab.command = command
    tab.output = ''

    window.electron.ipcRenderer.send('spawn-command', {
      command: command,
      cwd: tab.path,
    })
    if (command.split(' ')[0] === 'cd') {
      updatePath()
    }
    xtermRef.current.terminal.writeUtf8('\x1bc')
    event.target.value = ''
    setTabs(window.electron.ipcRenderer.sendSync('edit-tab', { id, tab }))
  }

  const folderUp = () => {
    setCommand('cd ../')
    xtermRef.current.terminal.writeUtf8('\x1bc')
    window.electron.ipcRenderer.send('spawn-command', {
      command: 'cd ../',
      cwd: tab.path,
    })
    updatePath()
  }

  const cleanup = () => {
    setCommand('')
    xtermRef.current.terminal.writeUtf8('\x1bc')
  }

  const updatePath = () => {
    setTimeout(() => {
      const currentTab = window.electron.ipcRenderer.sendSync('get-tab', id)
      setTab(currentTab)
      setPath(visiblePath(currentTab.path))
    }, 50)
  }

  const visiblePath = (path) => {
    return path.replace(
      `/home/${
        window.electron.ipcRenderer.sendSync('get-username-hostname')[
          'username'
        ]
      }`,
      ''
    )
  }

  const openFolder = (item) => {
    setCommand(`cd ${item}`)
    xtermRef.current.terminal.writeUtf8('\x1bc')
    window.electron.ipcRenderer.send('spawn-command', {
      command: `cd ${item}`,
      cwd: tab.path,
    })
    updatePath()
  }

  return (
    <div className="p-4 pt-3">
      <Toolbar />
      <TabNav
        tabs={tabs}
        setTabs={(data) => {
          setTabs(data)
        }}
        tab={tab}
      />
      <WavePanel
        tab={tab}
        openFolder={(item) => {
          openFolder(item)
        }}
      />
      <CommandLine
        path={path}
        submitCommand={(event) => {
          submitCommand(event)
        }}
      />
      <div id="terminalWrapper" className="relative">
        {command && (
          <TerminalToolbar
            command={command}
            folderUp={() => {
              folderUp()
            }}
            cleanup={() => {
              cleanup()
            }}
          />
        )}
        <XTerm
          className="terminal"
          ref={xtermRef}
          options={{
            convertEol: true,
            theme: {
              background: '#1e1f29',
            },
            fontSize: 13,
            fontWeight: 700,
          }}
          addons={[fitAddon]}
        />
      </div>
    </div>
  )
}

export default Tab
