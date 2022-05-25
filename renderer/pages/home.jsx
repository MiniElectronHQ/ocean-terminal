import Toolbar from '../components/Toolbar'
import Link from 'next/link'

function Home() {
  return (
    <div>
      <Toolbar />
      <div className="grid grid-col-1 w-full text-center">
        <h1 className="text-2xl">Ocean::Terminal</h1>
        <Link href="/tab/0">Open Terminal</Link>
      </div>
    </div>
  )
}

export default Home
