const acc = require('./accessors')
const alert = require('./alert')

let noNameError = `\x1b[31mError\x1b[0m: Please supply a valid command name.

Example:

  a create test test-alias 'cd ~/'

  - Will create an alias called test-alias in the test namespace
    that will change to the home directory
`;

let noNameDeleteError = `\x1b[31mError\x1b[0m: Please supply a valid command name for deletion.

Example:

  a rm test test-alias

  - Will delete an alias called test-alias in the test namespace
`;

let commandDoesntExistError = `\x1b[31mError\x1b[0m: Supplied command doesn't exist`;

module.exports = { 
  create: (namespace, name, command) => {
    acc.writeCommand(namespace, name, command)
  },

  delete: (args) => {

    if(getCommand(namespace, name)) {
      acc.deleteCommand(namespace, name)
    }
    else {
      alert(`\x1b[31mERROR\x1b[0m: Command not found in ${namespace}`)
    }
  },

  list: (namespace) => {

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

  run: (namespace, name) => { 
    let currentCommand = acc.getCommand(namespace, name)
    if(!currentCommand) {
      return alert(commandDoesntExistError)
    }
    return alert(currentCommand, 'run')
  },
}
