const acc = require('./accessors');

let help = `Error: Please supply a valid namespace.

Example:

  na create test

  - Will create a namespace with the name 'test'
`;

module.exports = { 
  create: (args) => {
    if(args._.length < 2) {
      return false;
    }

    let namespace = args._[1]

    let currentNamespaces = acc.getNamespaces()
    if(namespace in currentNamespaces) {
      return console.error(`Error: ${namespace} namespace already exists`);
    }

    acc.writeNamespace(namespace)
  },

  list: (args) => {
    let namespace = args._[0]
    let currentCommands = acc.getCommands(namespace)
    return currentCommands.length ? console.log(currentCommands.join('\n')) : console.error(`Error: No commands have been created for namespace: ${namespace} `)
  }
}
