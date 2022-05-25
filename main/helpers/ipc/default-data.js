const ipcDefaultData = (store) => {
  ;(async () => {
    store.set('username', await runCommand('whoami'))
    store.set('hostname', await runCommand('hostname'))
  })()

  store.set('tabs', [
    {
      name: 'Tab #1',
      path: '/home/wynter',
      command: '',
      ls: '',
      output: '',
      packageJSON: '',
    },
    {
      name: 'Tab #2',
      path: '/home/wynter',
      command: '',
      ls: '',
      output: '',
      packageJSON: '',
    },
    {
      name: 'Tab #3',
      path: '/home/wynter',
      command: '',
      ls: '',
      output: '',
      packageJSON: '',
    },
  ])
}

export default ipcDefaultData
