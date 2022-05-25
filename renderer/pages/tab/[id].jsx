import electron from 'electron'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Toolbar from '../../components/Toolbar'
import TabNav from '../../components/TabNav'
import WavePanel from '../../components/WavePanel'

const ipcRenderer = electron.ipcRenderer || false

function Tab({}) {
  const router = useRouter()
  const { id } = router.query

  const [tabName, setTabName] = useState('')
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    setTabs(ipcRenderer.sendSync('get-tabs'))
  }, [])

  useEffect(() => {
    const tmptab = ipcRenderer.sendSync('get-tab', id)
    setTabName(tmptab.name)
  }, [])

  const onChange = (e) => setTabName(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()

    ipcRenderer.send('edit-tab', { id, tabName })
    setTabs(ipcRenderer.sendSync('get-tabs'))
  }

  return (
    <>
      <Toolbar />
      <TabNav tabs={tabs} tabName={tabName} />
      <WavePanel>
        <span>
          ⚡ name: {tabName} <br /> index: {id} ⚡
        </span>
        <div className="bg-gray-900 text-white">
          <h3>Edit Name</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="text-gray-800 p-2"
              value={tabName}
              onChange={onChange}
            />
          </form>
        </div>
      </WavePanel>
    </>
  )
}

export default Tab
