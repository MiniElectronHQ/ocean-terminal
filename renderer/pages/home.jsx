import Toolbar from '../components/Toolbar'
import WavePanel from '../components/WavePanel'
import TabNav from '../components/TabNav'
import electron from 'electron'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const ipcRenderer = electron.ipcRenderer || false

function Home() {
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    setTabs(ipcRenderer.sendSync('get-tabs'))
  }, [])

  return (
    <div>
      <Toolbar />
      <TabNav tabs={tabs} />
      <WavePanel />
      <div className="grid grid-col-1 w-full text-center">
        <h1 className="text-2xl">Ocean::Terminal</h1>
        <Link href="/tab/0">Open Terminal</Link>
      </div>
    </div>
  )
}

export default Home
