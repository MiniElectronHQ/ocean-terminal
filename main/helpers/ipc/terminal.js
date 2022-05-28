import { exec, spawn } from '../../helpers'

const ipcTerminal = (store, ipcMain) => {
  ipcMain.on('get-username-hostname', async (event, command) => {
    event.returnValue = {
      username: store.get('username'),
      hostname: store.get('hostname'),
    }
  })

  ipcMain.on('exec-command', async (event, args) => {
    const result = await exec(args.command, args.cwd, store)
    event.returnValue = result
  })

  ipcMain.on('get-bash-version', async (event, args) => {
    const result = await exec('echo "$BASH_VERSION"', process.env.HOME, store)
    event.returnValue = result
  })

  ipcMain.on('exec-command-reply', async (event, args) => {
    const pids = store.get('pids')
    const pid = pids.find((pid) => pid.id === args.id).pid
    const result = await exec(
      `echo "${args.command}" > /proc/${pid}/fd/0`,
      args.cwd,
      store
    )
    event.returnValue = result
  })

  ipcMain.on('spawn-command', async (event, args) => {
    await spawn(event, args.command, args.cwd, store, args.id, ipcMain)
  })

  ipcMain.on('get-sudo-password', async (event, password) => {
    event.returnValue = store.get('sudo-password')
  })

  ipcMain.on('save-sudo-password', async (event, password) => {
    store.set('sudo-password', password)
  })

  ipcMain.on('response-to-child-process', async (event, args) => {
    const child_processes = store.get('child_processes')
    const child = child_processes[args.id]
    process.stdin.pipe(child.stdin)
    if (child.stdio) {
      child.stdin.write(args.command + '\n')
    }
  })

  ipcMain.on('check-child-process', async (event, id) => {
    const pids = store.get('pids')
    const pid = pids.find((pid) => pid.id === id).pid
    try {
      process.kill(pid, 0)
      return true
    } catch (e) {
      return false
    }
  })

  ipcMain.on('cleanup', async (event, id) => {
    const allPids = store.get('pids')
    const tabPids = allPids.filter((pid) => pid.id === id)
    const newPids = allPids.filter((pid) => pid.id !== id)
    tabPids.forEach((child) => {
      try {
        process.kill(-child.pid)
      } catch (e) {}
    })
    store.set('pids', newPids)
  })
}

export default ipcTerminal
