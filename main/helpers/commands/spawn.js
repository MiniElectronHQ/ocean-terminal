const spawn = require('child_process').spawn
import changeDirectory from './change-directory'

const spawnCommand = async (event, command, cwd, store, id) => {
  let result
  try {
    let startCommand = command.split(' ')[0]
    const args = command.split(' ').slice(1)

    if (!command.includes('sudo -S') && command.includes('sudo ')) {
      startCommand = 'sudo -S ' + startCommand.replace('sudo ', '')
    }

    let child = spawn(startCommand, args, {
      cwd: cwd,
      shell: true,
      detached: true,
    })

    const child_processes = store.get('child_processes')

    if (child_processes[id] !== undefined) {
      console.log('found child', child_processes[id])
      child = child_processes[id]
    } else {
      console.log('not found child', child)
      child_processes.push(child)
      store.set('child_processes', child_processes)
    }

    console.log(child.pid)

    store.set('pids', [...store.get('pids'), { id: id, pid: child.pid }])

    child.stdout.on('data', (data) => {
      result = data.toString()
      event.reply('reply-spawn-pipe', result.trim())
    })

    child.stderr.on('data', function (data) {
      if (command.includes('sudo -S')) {
        child.stdin.write(store.get('sudo-password') + '\n')
      }
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
