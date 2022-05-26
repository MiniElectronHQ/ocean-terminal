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
      // ipcRenderer.on(eventName, callback)
    },
  },
  data: {
    myFlags: ['a', 'b', 'c'],
    bootTime: 1234,
  },
})
