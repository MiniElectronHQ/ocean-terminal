import { HiPlus } from 'react-icons/hi'
import Link from 'next/link'
import Classnames from 'classnames'

const TabNav = ({ tabs, tabName }) => {
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
        <button className="tab text-base" onClick={() => {}}>
          <HiPlus />
        </button>
      </div>
    </div>
  )
}

export default TabNav
