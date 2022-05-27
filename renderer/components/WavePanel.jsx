import { MdMicrowave } from 'react-icons/md'
import FolderViewer from './FolderViewer'
import PackageJSON from './PackageJSON'

const WavePanel = ({ tab, openFolder, folderUp, children }) => {
  return (
    <div id="infoPanel">
      {/* <h1
        id="infoPanel-headline"
        className="p-2 text-xs uppercase tracking-wide text-dracula-gray font-bold flex items-center justify-between"
      >
        <span>Wave Panel</span>
        <MdMicrowave className="text-sm" />
      </h1> */}

      <div className="p-2">
        <FolderViewer
          tab={tab}
          openFolder={(item) => {
            openFolder(item)
          }}
          folderUp={(item) => {
            folderUp(item)
          }}
        />
      </div>
      <div className="p-2">{children}</div>
      <PackageJSON tab={tab} />
    </div>
  )
}

export default WavePanel
