const util = require('util')
const exec = util.promisify(require('child_process').exec)
import changeDirectory from './change-directory'

const execCommand = async (command, cwd, store) => {
  let result
  try {
    const { error, stdout, stderr } = await exec(command, {
      cwd: cwd,
      shell: true,
      stdio: 'inherit',
    })

    if (stderr) {
      result = stderr
    } else if (error) {
      result = error
    } else {
      result = stdout
    }

    if (command.split(' ')[0] === 'cd') {
      return await changeDirectory(command, store)
    }

    return result.trim()
  } catch (e) {
    result = 'Error: ' + e
    return result
  }
}

export default execCommand
