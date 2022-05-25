import _ from 'lodash'

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
    const tabs = store.get('tabs') || []
    tabs[arg.id].name = arg.tab.name
    tabs[arg.id].command = arg.tab.command
    tabs[arg.id].ls = arg.tab.ls
    tabs[arg.id].currentPath = arg.tab.currentPath
    tabs[arg.id].output = arg.tab.output
    tabs[arg.id].packageJSON = arg.tab.packageJSON
    store.set('tabs', tabs)
    event.returnValue = _.cloneDeep(tabs)
  })

  ipcMain.on('save-tabs', (event, tabs) => {
    store.set('tabs', tabs)
  })
}

export default ipcTabs
