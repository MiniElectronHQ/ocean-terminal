const { contextBridge, ipcRenderer } = require('electron')
console.log('preload...')
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    // ...ipcRenderer,
    // on(eventName, callback) {
    //   ipcRenderer.on(eventName, callback)
    // },
  },
  data: {
    myFlags: ['a', 'b', 'c'],
    bootTime: 1234,
  },
})
