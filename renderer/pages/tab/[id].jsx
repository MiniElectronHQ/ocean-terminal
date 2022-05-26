import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Toolbar from '../../components/Toolbar'
import TabNav from '../../components/TabNav'
import WavePanel from '../../components/WavePanel'
import CommandLine from '../../components/CommandLine'
import TerminalToolbar from '../../components/TerminalToolbar'
import FolderViewer from '../../components/FolderViewer'
import { XTerm } from 'xterm-for-react'
import { FitAddon } from 'xterm-addon-fit'
import _ from 'lodash'

function Tab() {
  const router = useRouter()
  const { id } = router.query

  const [tabName, setTabName] = useState('')
  const [tabs, setTabs] = useState([])
  const [tab, setTab] = useState({})

  const [command, setCommand] = useState('')
  const [path, setPath] = useState('')
  const [packageJSON, setPackageJSON] = useState('')
  const [ls, setls] = useState('')
  const [output, setOutput] = useState('')

  const xtermRef = useRef(null)
  const fitAddon = new FitAddon()

  useEffect(() => {
    setTabs(window.electron.ipcRenderer.sendSync('get-tabs'))
    const response = window.electron.ipcRenderer.sendSync('get-tab', id)
    setTab(response)
    setTabName(response.name)
    setCommand(response.command)
    setPath(response.path)
    setPackageJSON(response.packageJSON)
    setls(response.ls)
    setOutput(response.output)
  }, [])

  useEffect(() => {
    let testTerm = xtermRef.current.terminal
    let testFitAddon = fitAddon

    window.electron.ipcRenderer.on('reply-spawn-pipe', (event, result) => {
      if (result === '\n' || result === '' || result === '\r\n') {
        testTerm.write(result)
      } else if (result !== '\u001b[H\u001b[2J\u001b[3J') {
        testTerm.write(`${result}\n`)
      } else {
        testTerm.write(result)
      }
      testFitAddon.fit()
    })
  }, [])

  const onChange = (e) => {
    tab.name = e.target.value
    setTabName(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    window.electron.ipcRenderer.send('edit-tab', { id, tab })
    setTabs(window.electron.ipcRenderer.sendSync('get-tabs'))
  }

  const submitCommand = (event) => {
    setls('')
    const command = event.target.value
    setCommand(command)
    tab.command = command

    // send('run-kill-process')

    window.electron.ipcRenderer.send('spawn-command', {
      command: command,
      cwd: tab.path,
    })

    xtermRef.current.terminal.writeUtf8('\x1bc')

    setTabs(window.electron.ipcRenderer.sendSync('edit-tab', { id, tab }))
    event.target.value = ''
  }

  const folderUp = () => {
    setls('')
    setCommand('cd ../')
    xtermRef.current.terminal.write('\x1bc')
    window.electron.ipcRenderer.sendSync('exec-command', {
      command: 'cd ../',
      cwd: tab.path,
    })
  }

  const cleanup = () => {
    // send('run-kill-process')
    setCommand('')
    setls('')
    xtermRef.current.terminal.write('\x1bc')
  }

  const openFolder = (name) => {
    setCommand(`cd ${name}`)
    window.electron.ipcRenderer.sendSync('exec-command', {
      command: `cd ${name}`,
      cwd: tab.path,
    })
  }

  return (
    <div className="p-4 pt-3">
      <Toolbar />
      <TabNav tabs={tabs} tabName={tab.name} />
      <WavePanel packageJSON={packageJSON}>
        <span className="text-xs">
          <h3>index: {id}</h3>
          <div className="whitespace-pre mt-2">
            {JSON.stringify(tab, null, 2)}
          </div>
        </span>
        {/* <div className="bg-gray-900 text-white">
          <h3>Edit Name</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="text-gray-800 p-2"
              value={tabName}
              onChange={onChange}
            />
          </form>
        </div> */}
      </WavePanel>
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
        {ls && (
          <FolderViewer
            ls={ls}
            openFolder={(name) => {
              openFolder(name)
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
            // fontFamily: `'Fira Mono', monospace`,
            fontSize: 14,
            fontWeight: 900,
          }}
          addons={[fitAddon]}
        />
      </div>
    </div>
  )
}

export default Tab
