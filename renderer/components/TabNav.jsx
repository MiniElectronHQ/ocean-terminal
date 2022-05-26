import { HiPlus } from 'react-icons/hi'
import Link from 'next/link'
import Classnames from 'classnames'
import { useRouter } from 'next/router'

const TabNav = ({ tabs, tabName }) => {
  const router = useRouter()

  // const [tabName, setTabName] = useState('')

  // const onChange = (e) => {
  //   tab.name = e.target.value
  //   setTabName(e.target.value)
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault()

  //   window.electron.ipcRenderer.send('edit-tab', { id, tab })
  //   setTabs(window.electron.ipcRenderer.sendSync('get-tabs'))
  // }

  return (
    <div id="tablist" className="flex items-center text-sm">
      <div>
        {tabs.map((tab, index) => (
          <Link href={'/tab/' + index} key={index}>
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
              name: 'Tab #1',
              path: `/home/${
                window.electron.ipcRenderer.sendSync('get-username-hostname')[
                  'username'
                ]
              }`,
              command: '',
              output: '',
              wave: {
                folders: [],
                files: [],
                dev: {
                  package_json: '',
                  git: '',
                  readme: '',
                },
              },
            }
            newTab.name = `Tab #${tabs.length + 1}`
            tabs.push(newTab)
            window.electron.ipcRenderer.send('save-tabs', tabs)
            router.push('/tab/' + (tabs.length - 1))
          }}
        >
          <HiPlus />
        </button>
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
      </div>
    </div>
  )
}

export default TabNav
