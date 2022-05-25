import { runCommand } from '../../helpers'

const ipcTerminal = (store, ipcMain) => {
  ipcMain.on('get-username-hostname', async (event, command) => {
    event.returnValue = {
      username: store.get('username'),
      hostname: store.get('hostname'),
    }
  })

  ipcMain.on('run-command', async (event, args) => {
    const result = await runCommand(args.command, args.cwd)
    event.returnValue = result
  })
}

export default ipcTerminal
