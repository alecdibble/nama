const minimist = require('minimist')


const storage = require('./services/storage')
const namespaces = require('./services/namespaces')
const commands = require('./services/commands')
const alert = require('./services/alert')
const help = require('./services/help')
const tabcomplete = require('./services/tabcomplete')

const { version } = require('../package.json')

module.exports = () => {

  if(!process.env.BASH_EXPORTED) {
    alert('source ~/.bashrc', 'run')
  }

  storage.init();

  const args = minimist(process.argv.slice(2))

  // alert(args, 'json')

  let cmd = args._[0] || 'base'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'create':
      if(args._.length == 1) {
          namespaces.create(args)
        } else {
          commands.create(args)
        }
      break

    case 'base':
      namespaces.list(args)
      break

    case 'version': 
      alert(`v${version}`)
      break

    case 'help':
      help(args)
      break

    case 'completion':
      return tabcomplete(args)
      break

    default:
      if(namespaces.lookup(args)) {
        if(args._.length == 1) {
          commands.list(args)
        } else {
          commands.run(args)
        }
      }
      else {
        alert(`"${cmd}" is not a valid command!`)
      }
      break
  }
}


