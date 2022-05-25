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
    event.reply('reply-spawn-pipe', 'test')
  } catch (e) {
    result = 'Error: ' + e
    return result
  }

  if (child) {
    child.stdout.on('data', (data) => {
      console.log(data.toString())
      result = data.toString()
      // return result.trim(result)
      event.reply('reply-spawn-pipe', data.toString())
    })
  }
}

export default spawnCommand
