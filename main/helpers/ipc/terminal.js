import { runCommand } from '../../helpers'

const ipcTerminal = (store, ipcMain) => {
  ipcMain.on('get-username-hostname', async (event, command) => {
    event.returnValue = {
      username: store.get('username'),
      hostname: store.get('hostname'),
    }
  })

  ipcMain.on('run-command', async (event, command) => {
    const result = await runCommand(command)
    event.returnValue = result
  })
}

export default ipcTerminal
