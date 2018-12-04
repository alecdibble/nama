const minimist = require('minimist')

const namespaces = require('./services/namespaces')
const commands = require('./services/commands')
const alert = require('./services/alert')
const help = require('./services/help')
const tabcomplete = require('./services/tabcomplete')

const { version } = require('../package.json')

module.exports = () => {

  // if(!process.env.BASH_EXPORTED) {
  //   return('ERROR: Bashrc not properly sourced. Please re-run.')
  // }

  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || 'base'
  let description = null

  

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  if (args.c || args.create) {
    cmd = 'create'
  }

  if (args.default_namespace) {
    cmd = 'default'
  }

  if(args.d || args.description) {
    description = args.d || args.description
  }

  switch (cmd) {
    case 'c':
    case 'create':
      if(args._.length == 2) {
          namespaces.create(args._[1], description)
        } else {
          commands.create(args._[1], args._[2], args._[3], description)
        }
      break

    case 'rm':
    case 'delete':
      if(!args._[2]) {
        namespaces.delete(args._[1])
      }
      else if(args._[2]) {
      commands.delete(args._[1], args._[2])
      }
      else {
        alert("Wrong number of arguments supplied")
      }
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
      if(!namespaces.lookup('Default')) {
        namespaces.create('Default')
        break
      }
      if(args._[0] == 'completion') {
        tabcomplete('Default')
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
        commands.create('Default', args._[1], args._[2], description)
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


