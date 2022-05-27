import { exec } from './index'

const DefaultData = (store) => {
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

export default DefaultData
