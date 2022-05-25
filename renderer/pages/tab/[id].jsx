import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import electron from 'electron'
import Toolbar from '../../components/Toolbar'
import TabNav from '../../components/TabNav'

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

    return () => {}
  }, [])

  const onChange = (e) => setTabName(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()

    ipcRenderer.send('edit-tab', { id, tabName })
    setTabs(ipcRenderer.sendSync('get-tabs'))
    console.log('ran onsubmit')
  }

  return (
    <>
      <Toolbar />
      <TabNav tabs={tabs} tabName={tabName} />

      <span>
        ⚡ name: {tabName} - index: {id} ⚡
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
    </>
  )
}

export default Tab
