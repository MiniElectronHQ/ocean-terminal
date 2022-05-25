import electron from 'electron'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Toolbar from '../../components/Toolbar'
import TabNav from '../../components/TabNav'
import WavePanel from '../../components/WavePanel'
import CommandLine from '../../components/CommandLine'
import TerminalToolbar from '../../components/TerminalToolbar'
import FolderViewer from '../../components/FolderViewer'
// import XTerm from '../../components/XTerm'

const ipcRenderer = electron.ipcRenderer || false

function Tab({}) {
  const router = useRouter()
  const { id } = router.query

  const [tabName, setTabName] = useState('')
  const [tabs, setTabs] = useState([])
  const [tab, setTab] = useState({})

  const [command, setCommand] = useState('')
  const [currentPath, setCurrentPath] = useState('')
  const [packageJSON, setPackageJSON] = useState('')
  const [ls, setls] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    setTabs(ipcRenderer.sendSync('get-tabs'))
    const response = ipcRenderer.sendSync('get-tab', id)
    setTab(response)
    setTabName(response.name)
    setCommand(response.command)
    setCurrentPath(response.currentPath)
    setPackageJSON(response.packageJSON)
    setls(response.ls)
    setOutput(response.output)
  }, [])

  const onChange = (e) => {
    tab.name = e.target.value
    setTabName(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    ipcRenderer.send('edit-tab', { id, tab })
    setTabs(ipcRenderer.sendSync('get-tabs'))
  }

  const submitCommand = (event) => {
    console.log('submit from tab', id, 'with command:', event.target.value)
    setCommand(event.target.value)
    tab.command = event.target.value

    // send('run-kill-process')
    // setls('')
    // runCommand('clear')
    // runCommand(event.target.value)

    const updatedTabs = ipcRenderer.sendSync('edit-tab', { id, tab })
    setTabs(updatedTabs)
    event.target.value = ''
  }

  const folderUp = () => {
    // setls('')
    // runCommand('clear')
    // setCommand('cd ../')
    // runCommand('cd ../')
  }

  const cleanup = () => {
    // send('run-kill-process')
    // setCommand('')
    // setls('')
    // runCommand('clear')
  }

  const openFolder = (name) => {
    // setCommand(`cd ${name}`)
    // runCommand(`cd ${name}`)
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
        currentPath={tab.currentPath}
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
        {/* <XTerm
          ref={xtermRef}
          options={{
            convertEol: true,
            theme: {
              background: '#1e1f29',
            },
          }}
          addons={[fitAddon]}
        /> */}
      </div>
    </div>
  )
}

export default Tab
