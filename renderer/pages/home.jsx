import { useEffect, useState } from 'react'

import Link from 'next/link'

import Toolbar from '../components/Toolbar'
import TabNav from '../components/TabNav'

import electron from 'electron'
const ipcRenderer = electron.ipcRenderer || false

function Home() {
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    setTabs(ipcRenderer.sendSync('get-tabs'))
  }, [])

  return (
    <>
      <Toolbar />
      <TabNav tabs={tabs} />
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <img className="ml-auto mr-auto" src="/images/logo.png" />
        <span>⚡ Electrons ⚡</span>
        <span>+</span>
        <span>Next.js</span>
        <span>+</span>
        <span>tailwindcss</span>
        <span>=</span>
        <span>💕 </span>
      </div>
    </>
  )
}

export default Home
