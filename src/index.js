const minimist = require('minimist')

//TODO: Check if na-sync is executable, if so, use that for storage instead
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
    return('ERROR: Bashrc not properly sourced. Please re-run.')
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

  if (args.c) {
    cmd = 'create'
  }

  switch (cmd) {
    case 'c':
    case 'create':
      if(args._.length == 2) {
          namespaces.create(args)
        } else {
          commands.create(args)
        }
      break

    case 'base':
      if(args.a) {
        namespaces.listAll(args)
      }
      else {
        namespaces.list(args)
      }
      
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
  }
}


