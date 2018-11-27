const db = require('./db')
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
  create: (namespace, name, command, description) => {
    db.updateCommand(namespace, name, command, description)
  },

  delete: (namespace, name) => {

    if(db.getCommand(namespace, name)) {
      db.removeCommand(namespace, name)
    }
    else {
      alert(`\x1b[31mERROR\x1b[0m: Command not found in ${namespace}`)
    }
  },

  list: (namespace) => {

    let currentCommands = db.getCommands(namespace)

    alert(`\x1b[4m\x1b[1m${namespace}\x1b[0m`) 
    
    // alert('  name'.padEnd(15) + "  command")
    // alert('  ' + '-'.repeat(namespace.length))
    if(Object.keys(currentCommands).length < 1) { 
      return alert(`  \x1b[2mNo commands have been created for ${namespace}\x1b[0m \n`)
    }
    commandString = currentCommands.map(command => '  ' + command.name.padEnd(6) + '  \x1b[2m' + command.command + '\x1b[0m'.padEnd(10) + (command.description ? '  (' + command.description + ')' : '')).filter(v => v).join('\n');
    return alert(commandString + '\n') 
  },

  run: (namespace, name) => { 
    let currentCommand = db.getCommand(namespace, name)
    if(!currentCommand) {
      return alert(commandDoesntExistError)
    }
    return alert(currentCommand.command, 'run')
  },
}
