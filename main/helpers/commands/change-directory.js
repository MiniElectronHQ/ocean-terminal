import { exec } from '../../helpers'

const changeDirectory = async (command, store) => {
  const id = store.get('current-tab-id')
  const tabs = store.get('tabs')
  const newPath = command.split(' ')[1]
  const cleanPath = await exec('pwd', tabs[id].path + '/' + newPath)
  const folders = await exec('ls -d */', cleanPath)
  const files = await exec('ls -p --block-size=M | grep -v /', cleanPath)
  if (!files.includes('Error: ')) {
    tabs[id].wave.files = files.split('\n')
  } else {
    tabs[id].wave.files = []
  }
  if (!folders.includes('Error: ')) {
    tabs[id].wave.folders = folders.split('\n')
  } else {
    tabs[id].wave.folders = []
  }
  tabs[id].path = cleanPath
  store.set('tabs', tabs)
  return tabs
}

export default changeDirectory
