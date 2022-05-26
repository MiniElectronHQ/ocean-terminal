import { HiPlus } from 'react-icons/hi'
import Link from 'next/link'
import Classnames from 'classnames'
import { useRouter } from 'next/router'

const TabNav = ({ tabs, tabName }) => {
  const router = useRouter()

  return (
    <div id="tablist" className="flex items-center text-sm">
      <div>
        {tabs.map((tab, index) => (
          <Link href={'/redirector?name=/tab/' + index} key={index}>
            <a
              className={Classnames('tab', {
                'tab-active': tab.name === tabName,
              })}
            >
              {tab.name}
            </a>
          </Link>
        ))}
      </div>
      <div>
        <button
          className="tab text-base"
          onClick={() => {
            const newTab = {
              name: '',
              command: '',
              ls: '',
              currentPath: '',
              output: '',
              packageJSON: '',
            }
            newTab.name = `Tab #${tabs.length + 1}`
            tabs.push(newTab)
            window.electron.ipcRenderer.send('save-tabs', tabs)
            router.push('/redirector?name=/tab/' + (tabs.length - 1))
          }}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  )
}

export default TabNav
