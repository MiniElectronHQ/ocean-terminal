import { MdFolderOpen } from 'react-icons/md'
import { FiFileText } from 'react-icons/fi'

import { BiData, BiLockAlt, BiImageAlt } from 'react-icons/bi'
import { DiJavascript1 } from 'react-icons/di'
import {
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiRuby,
  SiMarkdown,
} from 'react-icons/si'
import { VscMarkdown } from 'react-icons/vsc'

const FolderViewer = ({ tab, openFolder }) => {
  const fileIcon = (extension) => {
    const className = 'flex-none text-base mr-2'
    switch (extension) {
      case 'json':
      case 'yml':
      case 'yaml':
        return <BiData className={className} style={{ color: '#96ae60' }} />
      case 'lock':
        return <BiLockAlt className={className} style={{ color: '#42a5f5' }} />
      case 'js':
      case 'jsx':
        return (
          <DiJavascript1 className={className} style={{ color: '#f4bf75' }} />
        )
      case 'ts':
      case 'tsx':
        return (
          <SiTypescript className={className} style={{ color: '#61dafb' }} />
        )
      case 'html':
        return <SiHtml5 className={className} style={{ color: '#42a5f5' }} />
      case 'css':
        return <SiCss3 className={className} style={{ color: '#6a9fb5' }} />
      case 'rb':
        return <SiRuby className={className} style={{ color: '#f44336' }} />
      case 'md':
        return (
          <VscMarkdown className={className} style={{ color: '#42a5f5' }} />
        )
      case 'png':
      case 'jpg':
      case 'webp':
      case 'jpeg':
        return <BiImageAlt className={className} style={{ color: '#42a5f5' }} />

      default:
        return <FiFileText className={className + ' opacity-25'} />
    }
  }

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
                    <MdFolderOpen
                      className="flex-none text-base mr-2"
                      style={{ color: '#42a5f5' }}
                    />
                    <span className="font-medium truncate">
                      {item.replace('/', '')}
                    </span>
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
                    {fileIcon(item.split('.').pop())}
                    <span className="font-medium truncate">
                      {item.replace('/', '')}
                    </span>
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
