const spawn = require('child_process').spawn
import { exec } from '../../helpers'

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
      changeDirectory(command, store)
    }
  } catch (e) {
    result = 'Error: ' + e
    return result
  }
}

const changeDirectory = async (command, store) => {
  const id = store.get('current-tab-id')
  const tabs = store.get('tabs')
  const newPath = command.split(' ')[1]
  const cleanPath = await exec('pwd', tabs[id].path + '/' + newPath)

  tabs[id].path = cleanPath
  store.set('tabs', tabs)
}

export default spawnCommand
