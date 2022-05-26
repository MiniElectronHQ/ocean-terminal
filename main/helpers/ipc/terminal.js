import { exec, spawn } from '../../helpers'

const ipcTerminal = (store, ipcMain) => {
  ipcMain.on('get-username-hostname', async (event, command) => {
    event.returnValue = {
      username: store.get('username'),
      hostname: store.get('hostname'),
    }
  })

  ipcMain.on('exec-command', async (event, args) => {
    const result = await exec(args.command, args.cwd)
    event.returnValue = result
  })

  ipcMain.on('spawn-command', async (event, args) => {
    await spawn(event, args.command, args.cwd, store)
  })
}

export default ipcTerminal
