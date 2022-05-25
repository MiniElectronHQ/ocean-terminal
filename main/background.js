import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import Store from 'electron-store'
import {
  createWindow,
  ipcDefaultData,
  ipcTabs,
  ipcApp,
  ipcTerminal,
} from './helpers'
import path from 'path'

const store = new Store()
const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1324,
    height: 928,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    await mainWindow.loadURL(`http://localhost:${process.argv[2]}/home`)
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('ready-to-show', async () => {
    mainWindow.show()
  })
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcDefaultData(store)
ipcTabs(store, ipcMain)
ipcTerminal(store, ipcMain)
ipcApp(store, ipcMain, app)
