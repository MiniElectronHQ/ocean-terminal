const spawn = require('child_process').spawn

const spawnCommand = async (event, command, cwd) => {
  let result
  let child
  try {
    const startCommand = command.split(' ')[0]
    const args = command.split(' ').slice(1)
    child = spawn(startCommand, args, {
      cwd: cwd,
      shell: true,
      detached: true,
    })

    child.stdout.on('data', (data) => {
      result = data.toString()
      if (result) {
        event.reply('reply-spawn-pipe', result.trim())
      }
    })
  } catch (e) {
    result = 'Error: ' + e
    return result
  }
}

export default spawnCommand
