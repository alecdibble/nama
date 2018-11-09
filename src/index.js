const minimist = require('minimist')
const storage = require('./services/storage')
const namespaces = require('./services/namespaces')
const commands = require('./services/commands')

module.exports = () => {

  storage.init();

  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || 'base'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'create':
      namespaces.create(args)
      break
    case 'base':
      return namespaces.list(args)
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
        console.error(`"${cmd}" is not a valid command!`)
      }
      break
  }
}


