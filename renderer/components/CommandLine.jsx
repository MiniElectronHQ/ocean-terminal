import { useState } from 'react'
import { MdFolderOpen } from 'react-icons/md'
import { FaDollarSign } from 'react-icons/fa'

const CommandLine = ({ path, submitCommand, className }) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="mb-2">
      <h3 className="font-bold flex space-x-2 items-center text-dracula-cyan">
        <MdFolderOpen />
        <span className="text-dracula-yellow truncate w-full block">
          ~{path}
        </span>
      </h3>
      <div className={`${className} command-line flex items-center font-bold`}>
        <FaDollarSign className="text-dracula-cyan text-sm mr-1" />
        <input
          autoFocus={true}
          placeholder="Type a command..."
          className="w-full bg-gray-900 text-white p-1 font-bold border-transparent"
          style={{ backgroundColor: 'rgba(0,0,0,0)' }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              if (event.target.value.trim() !== '') {
                submitCommand(event)
              }
            }
          }}
          defaultValue={inputValue}
        />
      </div>
    </div>
  )
}

export default CommandLine
