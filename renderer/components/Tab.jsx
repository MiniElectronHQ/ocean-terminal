import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

import CommandLine from './CommandLine'
import TerminalToolbar from './TerminalToolbar'
import WavePanel from './WavePanel'
import FolderViewer from './FolderViewer'

import XTerm from './XTerm'
import { FitAddon } from 'xterm-addon-fit'

import runCommand from '../utils/runCommand'
import send from '../utils/send'
import reply from '../utils/reply'
import store from '../utils/store'

const Tab = ({ currentTab }) => {
  const { index } = useParams()

  const [tabs, setTabs] = useState(store('get', 'tabs') || [])
  const [tab, setTab] = useState({})

  const [command, setCommand] = useState(tab.command)
  const [currentPath, setCurrentPath] = useState(tab.currentPath)
  const [packageJSON, setPackageJSON] = useState(tab.packageJSON)
  const [ls, setls] = useState(tab.ls)
  const [output, setOutput] = useState(tab.output)

  const xtermRef = useRef(null)
  const fitAddon = new FitAddon()

  send('run-get-path')

  useEffect(() => {
    console.log(currentTab, index)
    setTab(tabs[parseInt(index)])

    reply('run-get-path', (result) => {
      setCurrentPath(result)
    })

    // setCurrentPath(store('get', 'currentPath'))

    reply('run-terminal-command', (result) => {
      xtermRef.current.terminal.clear()
      xtermRef.current.terminal.writeUtf8(result)

      fitAddon.fit()
    })

    reply('reply-terminal-ls', (result) => {
      xtermRef.current.terminal.clear()
      const data = []
      result.split('\n').forEach((item) => {
        if (item.trim() !== '') {
          data.push({
            name: item.trim(),
          })
        }
      })
      setls(data)
    })

    reply('run-package-json', (result) => {
      setPackageJSON(result)
    })

    reply('reply-spawn-pipe', (result) => {
      if (result === '\n' || result === '' || result === '\r\n') {
        xtermRef.current.terminal.writeUtf8(result)
      } else if (result !== '\u001b[H\u001b[2J\u001b[3J') {
        xtermRef.current.terminal.writeUtf8(`${result}\n`)
      }

      console.log('update via spawn reply:', result)
      setOutput(result)
      save()

      fitAddon.fit()
    })
  }, [])

  function save() {
    console.log(tab.id, 'save index / id')
    setTab({
      id: tab.id,
      title: tab.title + '-' + Date.now(),
      command: command,
      ls: ls,
      currentPath: currentPath,
      output: output,
      packageJSON: packageJSON,
    })
    console.log('save', tab)
    tabs[currentTab] = tab
    store('set', 'tabs', tabs)
    // update({
    //   id: tab.id,
    //   title: tab.title + '-' + Date.now(),
    //   command: command,
    //   ls: ls,
    //   currentPath: currentPath,
    //   output: output,
    //   packageJSON: packageJSON,
    // })
  }

  const submitCommand = (event) => {
    console.log('submit from tab', tab.id)
    setCommand(event.target.value)
    send('run-kill-process')
    setls('')
    runCommand('clear')
    runCommand(event.target.value)
    event.target.value = ''
  }

  const folderUp = () => {
    setls('')
    runCommand('clear')
    setCommand('cd ../')
    runCommand('cd ../')
  }

  const cleanup = () => {
    send('run-kill-process')
    setCommand('')
    setls('')
    runCommand('clear')
  }

  const openFolder = (name) => {
    setCommand(`cd ${name}`)
    runCommand(`cd ${name}`)
  }

  return (
    <div>
      <WavePanel packageJSON={packageJSON} />
      <CommandLine
        currentPath={currentPath}
        submitCommand={(event) => {
          submitCommand(event)
        }}
      />
      {JSON.stringify(tab)}
      <hr />
      {JSON.stringify(tabs)}
      {/* <div id="terminalWrapper" className="relative">
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
          ref={xtermRef}
          options={{
            convertEol: true,
            theme: {
              background: '#1e1f29',
            },
          }}
          addons={[fitAddon]}
        />
      </div> */}
    </div>
  )
}

export default Tab
