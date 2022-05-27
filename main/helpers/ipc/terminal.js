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

  ipcMain.on('spawn-command', async (event, args) => {
    await spawn(event, args.command, args.cwd, store, args.id)
  })

  ipcMain.on('get-sudo-password', async (event, password) => {
    event.returnValue = store.get('sudo-password')
  })

  ipcMain.on('save-sudo-password', async (event, password) => {
    store.set('sudo-password', password)
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
