import { exec } from '../../helpers'

const ipcDefaultData = (store) => {
  ;(async () => {
    store.set('username', await exec('whoami'))
    store.set('hostname', await exec('hostname'))
  })()

  store.set('tabs', [])
  store.set('pids', [])
  store.set('sudo-password', '')
}

export default ipcDefaultData
