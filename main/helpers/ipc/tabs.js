const ipcTabs = (store, ipcMain) => {
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

  ipcMain.on('save-tabs', (event, tabs) => {
    store.set('tabs', tabs)
  })
}

export default ipcTabs
