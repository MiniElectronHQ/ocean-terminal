const ipcDefaultData = (store) => {
  ;(async () => {
    store.set('username', await runCommand('whoami'))
    store.set('hostname', await runCommand('hostname'))
  })()

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
    {
      name: 'Tab #3',
      command: '',
      ls: '',
      currentPath: '',
      output: '',
      packageJSON: '',
    },
  ])
}

export default ipcDefaultData
