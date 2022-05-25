import Toolbar from '../components/Toolbar'
import Link from 'next/link'

import electron from 'electron'
import { useEffect } from 'react'
const ipcRenderer = electron.ipcRenderer || false

function Home() {
  useEffect(() => {
    console.log(ipcRenderer.sendSync('run-command', 'whoami'))
  })

  return (
    <>
      <Toolbar />
      <div className="grid grid-col-1 w-full text-center">
        <h1 className="text-2xl">Ocean::Terminal</h1>
        <Link href="/tab/0">Open Terminal</Link>
      </div>
    </>
  )
}

export default Home
