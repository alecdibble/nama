const acc = require('./accessors')
const alert = require('./alert')
const commands = require('./commands')

let createError = `Error: Please supply a valid namespace.

Example:

  a create test

  - Will create a namespace with the name 'test'
`;

module.exports = { 
  create: (args) => {
    if(args._.length < 2) {
      return alert(createError);
    }

    let namespace = args._[1]

    let currentNamespaces = acc.getNamespaces()
    if(namespace in currentNamespaces) {
      return alert(`Error: ${namespace} namespace already exists`);
    }

    acc.writeNamespace(namespace)
  },

  list: (args) => {
    let currentNamespaces = acc.getNamespaces()

    if(currentNamespaces.length < 1) {
      return alert('Error: No namespaces have been created')
    }

    alert('\n  NAMESPACES')
    alert('  --------')

    namespaceString = currentNamespaces.map(key => '  ' + key).filter(v => v).join('\n');
    return alert(namespaceString + '\n')
  },

  listAll: (args) => {
    let currentNamespaces = acc.getNamespaces()

    if(currentNamespaces.length < 1) {
      return alert('Error: No namespaces have been created')
    }

    for(var i in currentNamespaces) {
      commands.list(args, currentNamespaces[i])
    }
    
  },

  lookup: (args) => {
    let namespace = args._[0]
    let currentNamespaces = acc.getNamespaces()
    if(currentNamespaces.includes(namespace)) {
      return true
    }
    return false
  },
}
