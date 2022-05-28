import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
import {
  createWindow,
  defaultData,
  ipcTabs,
  ipcApp,
  ipcTerminal,
} from './helpers'

const store = new Store()
const isProd = process.env.NODE_ENV === 'production'

const os = require('os')
const pty = require('node-pty')
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env,
})
let currentCommand = ''

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

let mainWindow
;(async () => {
  await app.whenReady()

  mainWindow = createWindow('main', {
    width: 1324,
    height: 928,
    frame: false,
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    await mainWindow.loadURL(`http://localhost:${process.argv[2]}/home`)
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  mainWindow.on('ready-to-show', async () => {
    mainWindow.show()
  })
})()

app.on('window-all-closed', () => {
  app.quit()
})

ptyProcess.on('data', function (data) {
  mainWindow.webContents.send('reply-spawn-pipe', {
    data: data,
    currentCommand: currentCommand,
  })
})

ipcMain.on('terminal.keystroke', (event, key, command) => {
  ptyProcess.write(key)
  currentCommand = command
})

defaultData(store)
ipcTabs(store, ipcMain)
ipcTerminal(store, ipcMain)
ipcApp(store, ipcMain, app)
