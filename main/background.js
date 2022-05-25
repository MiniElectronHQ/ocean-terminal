import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

import Store from 'electron-store'

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
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('ready-to-show', async () => {
    mainWindow.show()
  })
})()

app.on('window-all-closed', () => {
  app.quit()
})

// -------------- Store --------------

const store = new Store()

store.set('tabs', [
  {
    name: 'Tab #1',
    command: '',
    ls: '',
    currentPath: '',
    output: '',
    packageJSON: '',
  },
  {
    name: 'Tab #2',
    command: '',
    ls: '',
    currentPath: '',
    output: '',
    packageJSON: '',
  },
])

ipcMain.on('get-tab', (event, id) => {
  const tabs = store.get('tabs') || []
  event.returnValue = tabs[id]
})

ipcMain.on('get-tabs', (event, arg) => {
  event.returnValue = store.get('tabs') || []
})

ipcMain.on('add-tab', (event, arg) => {
  const tabs = store.get('tabs') || []
  tabs.push({
    name: arg,
  })
  store.set('tabs', tabs)
})

ipcMain.on('edit-tab', (event, arg) => {
  console.log(arg)
  const tabs = store.get('tabs') || []
  tabs[arg.id].name = arg.tabName
  store.set('tabs', tabs)
})

// -------------- General --------------

ipcMain.on('close-app', (event, arg) => {
  app.quit()
})
