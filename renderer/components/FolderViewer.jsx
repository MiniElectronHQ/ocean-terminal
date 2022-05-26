import { MdFolderOpen } from 'react-icons/md'
import { FiFileText } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const FolderViewer = ({ openFolder }) => {
  const router = useRouter()
  const { id } = router.query
  const [tab, setTab] = useState(null)

  useEffect(() => {
    const currentTab = window.electron.ipcRenderer.sendSync('get-tab', id)
    setTab(currentTab)
  }, [id])

  return (
    <div>
      {tab?.wave && (
        <div className="w-full">
          <div className="grid grid-cols-1">
            {tab.wave.folders.map((item) => {
              return (
                item !== '' && (
                  <div
                    key={item}
                    className="flex items-center justify-left p-1 text-xs text-gray-300 hover:text-white hover-bg-dracula-semidark rounded text-center cursor-pointer"
                    onClick={() => {
                      openFolder(item)
                    }}
                  >
                    <MdFolderOpen className="mr-2" />
                    <span className="font-medium">{item.replace('/', '')}</span>
                  </div>
                )
              )
            })}

            {tab.wave.files.map((item) => {
              return (
                item !== '' && (
                  <div
                    key={item}
                    className="flex items-center justify-left p-1 text-xs text-gray-300 hover:text-white hover-bg-dracula-semidark rounded text-center cursor-pointer"
                    onClick={() => {
                      openFolder(item)
                    }}
                  >
                    <FiFileText className="mr-2" />
                    <span className="font-medium">{item.replace('/', '')}</span>
                  </div>
                )
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default FolderViewer
