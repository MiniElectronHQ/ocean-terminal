const ipcApp = (store, ipcMain, app) => {
  ipcMain.on('close-app', (event, arg) => {
    app.quit()
  })
}

export default ipcApp
