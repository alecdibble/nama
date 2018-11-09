const acc = require('./accessors')
const alert = require('./alert')

let noNameError = `Error: Please supply a valid command name.

Example:

  na create test test-alias 'cd ~/'

  - Will create an alias called test-alias in the test namespace
    that will change to the home directory
`;

let commandDoesntExistError = `Error: Supplied command doesn't exist`;

module.exports = { 
  create: (args) => {
    if(args._.length < 4) {
      return alert(noNameError)
    }

    let namespace = args._[1]
    let name = args._[2]
    let command = args._[3]

    acc.writeCommand(namespace, name, command)
  },

  list: (args, namespace) => {
    if(!namespace) {
      namespace = args._[0]
    }

    let currentCommands = acc.getCommands(namespace)

    alert(`\n  \x1b[4m\x1b[1m${namespace}\x1b[0m`) 
    
    // alert('  name'.padEnd(15) + "  command")
    // alert('  ' + '-'.repeat(namespace.length))
    if(Object.keys(currentCommands).length < 1) { 
      return alert(`  \x1b[2mNo commands have been created for ${namespace}\x1b[0m \n`)
    }
    commandString = Object.keys(currentCommands).map(key => '  ' + key.padEnd(10) + '   \x1b[2m' + currentCommands[key] + '\x1b[0m').filter(v => v).join('\n');
    return alert(commandString + '\n') 
  },

  run: (args) => {
    let namespace = args._[0]
    let name = args._[1]
    let currentCommand = acc.getCommand(namespace, name)
    if(!currentCommand) {
      return alert(commandDoesntExistError)
    }
    return alert(currentCommand, 'run')
  },
}
