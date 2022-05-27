import { HiPlus } from 'react-icons/hi'
import Link from 'next/link'
import Classnames from 'classnames'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const TabNav = ({ tabs, setTabs, tab }) => {
  const router = useRouter()
  const { id } = router.query

  const [tabName, setTabName] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTabName(tab?.name)
    setVisible(false)
  }, [tab, tabs])

  const onChange = (e) => {
    tab.name = e.target.value
  }

  const onSubmit = (e) => {
    e.preventDefault()
    window.electron.ipcRenderer.send('edit-tab', { id, tab })
    setTabs(window.electron.ipcRenderer.sendSync('get-tabs'))
  }

  const newTab = () => {
    const homePath = `/home/${
      window.electron.ipcRenderer.sendSync('get-username-hostname')['username']
    }`
    const newTab = {
      name: 'Tab #1',
      path: homePath,
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
  }

  return (
    <div
      id="tablist"
      className="flex items-center text-sm"
      style={{ zIndex: 9999999 }}
    >
      <div className="relative">
        {tabs.map((tab, index) => {
          if (index === parseInt(id)) {
            return (
              <div key={index} className="inline-block relative">
                <span
                  className="tab tab-active "
                  onClick={() => {
                    setVisible(!visible)
                  }}
                >
                  {tabName}
                </span>
                {visible && (
                  <div
                    className="bg-dracula-dark-gray text-white absolute left-0 p-3 rounded shadow-xl"
                    style={{ top: '27px', zIndex: 9999999 }}
                  >
                    <form onSubmit={onSubmit}>
                      <input
                        placeholder="Tab Name"
                        type="text"
                        className="text-gray-300 p-2 bg-dracula-gray border border-dracula-gray rounded"
                        defaultValue={tabName}
                        onChange={onChange}
                      />
                    </form>
                  </div>
                )}
              </div>
            )
          } else {
            return (
              <Link href={'/tab/' + index} key={index}>
                <a className="tab">{tab.name}</a>
              </Link>
            )
          }
        })}
      </div>
      <div>
        <button
          className="tab text-base"
          onClick={() => {
            newTab()
          }}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  )
}

export default TabNav
