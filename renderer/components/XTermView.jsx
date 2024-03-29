import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Toolbar from '/components/Toolbar'
import TabNav from '/components/TabNav'
import WavePanel from '/components/WavePanel'
import CommandLine from '/components/CommandLine'
import TerminalToolbar from '/components/TerminalToolbar'
import XTerm from '/components/XTerm'
import { FitAddon } from 'xterm-addon-fit'
import classNames from 'classnames'

function Tab() {
  const router = useRouter()
  const { id } = router.query

  const [tabs, setTabs] = useState([])
  const [tab, setTab] = useState({})
  const [command, setCommand] = useState('')
  const [path, setPath] = useState('')
  const [interactive, setInteractive] = useState(false)

  const xtermRef = useRef(null)
  const fitAddon = new FitAddon()

  useEffect(() => {
    const currentTab = window.electron.ipcRenderer.sendSync('get-tab', id)
    window.electron.ipcRenderer.send('set-current-tab-id', id)
    setTabs(window.electron.ipcRenderer.sendSync('get-tabs'))
    setTab(currentTab)
    setCommand(currentTab.command)
    setPath(visiblePath(currentTab.path))
    xtermRef.current.terminal.write('\x1bc')
    xtermRef.current.terminal.write(currentTab.output)
    window.electron.ipcRenderer.send(
      'terminal.keystroke',
      `cd ${currentTab.path}\r`,
      `cd ${currentTab.path}`,
      !interactive
    )
  }, [id])

  useEffect(() => {
    let testTerm = xtermRef.current.terminal
    let testFitAddon = fitAddon

    window.electron.ipcRenderer.send(
      'terminal.keystroke',
      `export PS1="$ "\r`,
      `export PS1="$ "`,
      !interactive
    )

    window.electron.ipcRenderer.on('reply-spawn-pipe', (event, result) => {
      let output = result.data
        .replaceAll(`${result.currentCommand}\r\n`, '')
        .replace(`${result.currentCommand}`, '')

      if (output.includes(`$`) && result.currentInteractive) {
        output = output.replace(`$`, '')
      }

      testTerm.write(output)
      testFitAddon.fit()

      const id = window.electron.ipcRenderer.sendSync('get-current-tab-id')
      const currentTab = window.electron.ipcRenderer.sendSync('get-tab', id)
      currentTab.output = output
      window.electron.ipcRenderer.send('edit-tab', {
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

    window.electron.ipcRenderer.send('cleanup', id)

    if (command.split(' ')[0] === 'cd') {
      updatePath()
    }

    window.electron.ipcRenderer.send(
      'terminal.keystroke',
      `${command}\r`,
      command,
      !interactive
    )
    xtermRef.current.terminal.write('\x1bc')
    event.target.value = ''
    setTabs(window.electron.ipcRenderer.sendSync('edit-tab', { id, tab }))
  }

  const folderUp = () => {
    setCommand('cd ../')
    xtermRef.current.terminal.write('\x1bc')

    const command = 'cd ../'
    window.electron.ipcRenderer.send(
      'terminal.keystroke',
      `${command}\r`,
      command,
      !interactive
    )
    window.electron.ipcRenderer.send('exec-command', {
      command: command,
      cwd: tab.path,
    })
    updatePath()
  }

  const cleanup = () => {
    setCommand('')
    xtermRef.current.terminal.write('\x1bc')
    window.electron.ipcRenderer.send('cleanup', id)
  }

  const updatePath = () => {
    setTimeout(() => {
      const currentTab = window.electron.ipcRenderer.sendSync('get-tab', id)
      setTab(currentTab)
      setPath(visiblePath(currentTab.path))
      console.log('update path', currentTab)
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
    setCommand(`cd "${item.replace('/', '')}"`)
    xtermRef.current.terminal.write('\x1bc')
    const command = `cd "${item.replace('/', '')}"`
    window.electron.ipcRenderer.send(
      'terminal.keystroke',
      `${command}\r`,
      command,
      !interactive
    )
    window.electron.ipcRenderer.send('exec-command', {
      command: `cd ${item}`,
      cwd: tab.path,
    })
    updatePath()
  }

  const setInteractiveMode = () => {
    setInteractive(!interactive)
    xtermRef.current.terminal.focus()
  }

  return (
    <div className="p-4 pt-3" id="body">
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
        folderUp={() => {
          folderUp()
        }}
      />
      <CommandLine
        className={classNames('', {
          'interactive-mode': interactive,
        })}
        path={path}
        submitCommand={(event) => {
          submitCommand(event)
        }}
      />
      <div id="terminalWrapper" className="relative">
        <TerminalToolbar
          command={command}
          interactive={interactive}
          cleanup={() => {
            cleanup()
          }}
          setInteractiveMode={() => {
            setInteractiveMode()
          }}
        />
        <div
          className={classNames('terminalWrapper', {
            'interactive-mode': interactive,
          })}
        >
          <XTerm
            className="terminal"
            ref={xtermRef}
            options={{
              convertEol: true,
              theme: {
                background: '#1e1f29',
              },
              fontFamily: 'FiraCode, monospace',
              fontSize: 12,
              fontWeight: 700,
            }}
            addons={[fitAddon]}
            onData={(e) => {
              window.electron.ipcRenderer.send('terminal.keystroke', e)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Tab
