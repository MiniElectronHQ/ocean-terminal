import { AiOutlineClear } from 'react-icons/ai'
import { FaICursor } from 'react-icons/fa'
import classNames from 'classnames'

const TerminalToolbar = ({
  command,
  cleanup,
  setInteractiveMode,
  interactive,
}) => {
  return (
    <div
      id="terminalReminder"
      className="flex space-x-2 items-center justify-between absolute w-full top-0 left-0"
      style={{ zIndex: 999999 }}
    >
      <strong>
        {command && (
          <span>
            <span className="text-dracula-gray mr-1">Just ran:</span> ${' '}
            {command}
          </span>
        )}
      </strong>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => {
            setInteractiveMode()
          }}
          // className="py-1 px-2 bg-dracula-gray text-xs font-bold text-gray-200 rounded flex space-x-4 items-center"
          className={classNames(
            'py-1 px-2 text-xs font-bold text-gray-200 rounded flex space-x-4 items-center',
            {
              'bg-dracula-gray': !interactive,
              'bg-darker-700': interactive,
            }
          )}
        >
          <FaICursor />
        </button>
        <button
          type="button"
          onClick={() => {
            cleanup()
          }}
          className="py-1 px-2 bg-dracula-gray text-xs font-bold text-gray-200 rounded flex space-x-4 items-center"
        >
          <AiOutlineClear />
        </button>
      </div>
    </div>
  )
}

export default TerminalToolbar
