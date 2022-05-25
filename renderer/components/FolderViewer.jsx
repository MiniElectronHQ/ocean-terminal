import { MdFolderOpen } from 'react-icons/md'
import { FiFileText } from 'react-icons/fi'

const FolderViewer = ({ ls, openFolder }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full p-3"
      style={{ zIndex: 99999, paddingTop: '60px' }}
    >
      <div className="w-full h-full overflow-x-hidden">
        <div className="grid grid-cols-1">
          {ls.map((item) => {
            return (
              item.name && (
                <div
                  key={item.name}
                  className="flex items-center justify-left p-2 text-sm text-gray-300 hover:text-white hover-bg-dracula-semidark rounded text-center cursor-pointer"
                  onClick={() => {
                    openFolder(item.name)
                  }}
                >
                  {!item.name.includes('/') ? (
                    <FiFileText className="text-xl mr-2" />
                  ) : (
                    <MdFolderOpen className="text-xl mr-2" />
                  )}
                  <span className="font-medium">
                    {item.name.replace('/', '')}
                  </span>
                </div>
              )
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FolderViewer
