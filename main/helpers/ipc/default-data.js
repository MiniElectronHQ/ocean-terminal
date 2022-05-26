import { exec } from '../../helpers'

const ipcDefaultData = (store) => {
  ;(async () => {
    store.set('username', await exec('whoami'))
    store.set('hostname', await exec('hostname'))
  })()

  store.set('tabs', [
    {
      name: 'Tab #1',
      path: `/home/${store.get('username')}`,
      command: '',
      output: '',
      wave: {
        folders: [],
        files: [],
        dev: {
          package_json: '',
          git: '',
          readme: '',
        },
      },
    },
  ])
}

export default ipcDefaultData
