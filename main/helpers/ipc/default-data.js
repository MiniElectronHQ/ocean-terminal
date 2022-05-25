import { exec } from '../../helpers'

const ipcDefaultData = (store) => {
  ;(async () => {
    store.set('username', await exec('whoami'))
    store.set('hostname', await exec('hostname'))
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
