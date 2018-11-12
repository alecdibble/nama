const minimist = require('minimist')

//TODO: Check if na-sync is executable, if so, use that for storage instead
const storage = require('./services/storage')

const namespaces = require('./services/namespaces')
const commands = require('./services/commands')
const defaultNamespace = require('./services/default')
const alert = require('./services/alert')
const help = require('./services/help')
const tabcomplete = require('./services/tabcomplete')

const { version } = require('../package.json')

module.exports = () => {

  if(!process.env.BASH_EXPORTED) {
    return('ERROR: Bashrc not properly sourced. Please re-run.')
  }

  storage.init()

  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || 'base'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  if (args.c || args.create) {
    cmd = 'create'
  }

  if (args.d || args.default) {
    cmd = 'default'
  }

  switch (cmd) {
    case 'c':
    case 'create':
      if(args._.length == 2) {
          namespaces.create(args._[1])
        } else {
          commands.create(args._[1], args._[2], args._[3])
        }
      break

    case 'rm':
    case 'delete':
      commands.delete(args._[1], args._[2])
      break

    case 'base':
      if(args.a) {
        namespaces.listAll()
      }
      else {
        namespaces.list()
      }
      break

    case 'default':
      if(args._[0] == 'completion') {
        tabcomplete('Default')
        break
      }
      if(!namespaces.lookup('Default')) {
        namespaces.create('Default')
        break
      }
      if(args._.length == 0) {
        commands.list('Default')
        break
      }
      if(args._[0] == "c" || args._[0] == "create" || args.c || args.create) {
        if(args._.length < 3 ||  args._.length > 3) {
          return alert(`\x1b[31mERROR\x1b[0m: Incorrect argument count for default alias creation!`)
        }
        commands.create('Default', args._[1], args._[2])
        break
      }
      else {
        commands.run('Default', args._[0])
        break
      }
      break

    case 'version': 
      alert(`v${version}`)
      break

    case 'help':
      help()
      break

    case 'completion':
      return tabcomplete()
      break

    default:
      if(namespaces.lookup(args._[0])) {
        if(args._.length == 1) {
          commands.list(args._[0])
        } else {
          commands.run(args._[0], args._[1])
        }
      }
      else {
        alert(`"${cmd}" is not a valid command!`)
      }
  }
}


