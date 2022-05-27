import { BsArrowUpSquare } from 'react-icons/bs'
import { AiOutlineClear } from 'react-icons/ai'

const TerminalToolbar = ({ command, cleanup }) => {
  return (
    <div
      id="terminalReminder"
      className="flex space-x-2 items-center justify-between absolute w-full top-0 left-0"
      style={{ zIndex: 999999 }}
    >
      <strong>
        <span className="text-dracula-gray mr-1">Just ran:</span> $ {command}{' '}
      </strong>
      <div className="flex space-x-2">
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
