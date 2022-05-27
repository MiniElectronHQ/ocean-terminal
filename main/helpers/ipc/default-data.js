import { exec } from '../../helpers'

const ipcDefaultData = (store) => {
  ;(async () => {
    store.set('username', await exec('whoami'))
    store.set('hostname', await exec('hostname'))
  })()

  if (!store.get('tabs')) {
    store.set('tabs', [])
  }

  if (!store.get('sudo-password')) {
    store.set('sudo-password', [])
  }

  if (!store.get('pids')) {
    store.set('pids', [])
  }
}

export default ipcDefaultData
