import { MdMicrowave } from 'react-icons/md'
import { FiFileText } from 'react-icons/fi'
import FolderViewer from './FolderViewer'

const WavePanel = ({ openFolder, packageJSON, children }) => {
  return (
    <div id="infoPanel">
      <h1
        id="infoPanel-headline"
        className="p-2 text-xs uppercase tracking-wide text-dracula-gray font-bold flex items-center justify-between"
      >
        <span>Wave Panel</span>
        <MdMicrowave className="text-sm" />
      </h1>

      <div className="p-2">
        <FolderViewer
          openFolder={(item) => {
            openFolder(item)
          }}
        />
      </div>
      <div className="p-2">{children}</div>
      {packageJSON && (
        <div className="p-2 border-l-4 border-dracula-gray">
          <h1 className="font-bold text-sm mb-2 flex text-dracula-light-gray items-center justify-between">
            <span>./package.json</span>
            <FiFileText className="text-sm text-dracula-gray" />
          </h1>
          {packageJSON.scripts && (
            <div className="mb-3">
              <h3 className="font-bold uppercase tracking-wider text-xs text-dracula-light-gray mb-1">
                Scripts
              </h3>
              <ul>
                {Object.keys(packageJSON.scripts).map((script) => (
                  <li className="text-xs text-dracula-light-gray" key={script}>
                    <span className="truncate">{script}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {packageJSON.dependencies && (
            <div className="mb-3">
              <h3 className="font-bold uppercase tracking-wider text-xs text-dracula-light-gray mb-1">
                Dependencies
              </h3>
              <ul>
                {Object.keys(packageJSON.dependencies).map((dependency) => (
                  <li
                    className="flex text-xs items-center justify-between cursor-pointer hover:underline hover:text-white text-dracula-light-gray"
                    onClick={() => {
                      window.electron.shell.openExternal(
                        `https://www.npmjs.com/package/${dependency}`
                      )
                    }}
                    key={dependency}
                  >
                    <span className="truncate">{dependency}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {packageJSON.devDependencies && (
            <div className="mb-3">
              <h3 className="font-bold uppercase tracking-wider text-xs text-dracula-light-gray mb-1">
                Dev. Dependencies
              </h3>
              <ul>
                {Object.keys(packageJSON.devDependencies).map((dependency) => (
                  <li
                    className="flex text-xs items-center justify-between cursor-pointer hover:underline hover:text-white text-dracula-light-gray"
                    onClick={() => {
                      window.electron.shell.openExternal(
                        `https://www.npmjs.com/package/${dependency}`
                      )
                    }}
                    key={dependency}
                  >
                    <span className="truncate">{dependency}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default WavePanel
