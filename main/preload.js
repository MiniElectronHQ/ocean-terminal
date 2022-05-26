const {
  contextBridge,
  ipcRenderer,
  IpcRendererEvent,
  shell,
} = require('electron')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    ...ipcRenderer,
    on(channel, callback) {
      ipcRenderer.on(channel, callback)

      return function () {
        return ipcRenderer.removeListener(channel, subscription)
      }
    },
  },
  data: {
    myFlags: ['a', 'b', 'c'],
    bootTime: 1234,
  },
})
