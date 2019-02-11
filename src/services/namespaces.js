const db = require('./db')
const alert = require('./alert')
const commands = require('./commands')
const syncHelper = require('./syncHelper')

let createError = `Error: Please supply a valid namespace.

Example:

  a create test

  - Will create a namespace with the name 'test'
`;

module.exports = { 
  create: (namespace, description) => {
    db.updateNamespace(namespace, description)
    module.exports.list()
    syncHelper.syncAddNamespace(namespace, description);
  },

  delete: (namespace) => {
    db.deleteNamespace(namespace)
    alert(namespace + ' namespace has been deleted')
    syncHelper.syncRemoveNamespace(namespace);
  },

  list: () => {
    let currentNamespaces = db.getAllNamespaces()

    if(currentNamespaces == undefined || currentNamespaces.length < 1) {
      return alert('Error: No namespaces have been created')
    }

    alert('\x1b[4mNamespaces\x1b[0m')

    namespaceString = currentNamespaces.map(n => n.description ? '  ' + n.namespace.padEnd(10) + "  \x1b[2m"+ n.description + "\x1b[0m" : '  ' + n.namespace).filter(v => v).join('\n');
    return alert(namespaceString + '\n')
  },

  listAll: () => {
    let currentNamespaces = db.getAllNamespaces()

    if(currentNamespaces == undefined || currentNamespaces.length < 1) {
      return alert('Error: No namespaces have been created')
    }

    for(var i in currentNamespaces) {
      commands.list(currentNamespaces[i].namespace)
    }
    
  },

  lookup: (namespace) => {
    let currentNamespaces = db.getNamespace(namespace)
    if(currentNamespaces && currentNamespaces.namespace == namespace) {
      return true
    }
    return false
  },
}
