const spawn = require('child_process').spawn
import changeDirectory from './change-directory'

const spawnCommand = async (event, command, cwd, store) => {
  let result
  try {
    const startCommand = command.split(' ')[0]
    const args = command.split(' ').slice(1)
    const child = spawn(startCommand, args, {
      cwd: cwd,
      shell: true,
      detached: true,
    })

    child.stdout.on('data', (data) => {
      result = data.toString()
      event.reply('reply-spawn-pipe', result.trim())
    })

    if (command.split(' ')[0] === 'cd') {
      await changeDirectory(command, store)
    }
  } catch (e) {
    result = 'Error: ' + e
    return result
  }
}

export default spawnCommand
