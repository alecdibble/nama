const db = require('./db')
const alert = require('./alert')
const commands = require('./commands')
const cache = require('./cache')
const syncHelper = require('./syncHelper')

let createError = `Error: Please supply a valid namespace.

Example:

  a create test

  - Will create a namespace with the name 'test'
`;

let checkInvalidName = (namespaceName) => {
  if(namespaceName.includes('-')) {
    return '-'
  }
  if(namespaceName.includes('!')) {
    return '!'
  }
  if(namespaceName.includes('/')) {
    return '/'
  }
  return false
}

module.exports = { 
  create: (namespace, description) => {
    if(db.getNamespace(namespace) && !description) {
      return alert(`\x1b[31mERROR\x1b[0m: `+namespace+` already exists`)
    }
    if(checkInvalidName(namespace)) {
      return alert(`\x1b[31mERROR\x1b[0m: Invalid character (`+checkInvalidName(namespace)+`) in namespace name. Cannot save. Please try again.`)
    }
    db.updateNamespace(namespace, description)
    syncHelper.syncSendChanges();
    cache.cacheWrite()
    return alert('\u001b[32mSuccess\x1b[0m: Namespace created.')
  },

  delete: (namespace) => {
    db.deleteNamespace(namespace)
    alert('\u001b[32mSuccess\x1b[0m: ' + namespace + ' namespace has been deleted')
    cache.cacheWrite()
    syncHelper.syncRemoveNamespace(namespace);
  },

  list: () => {
    let currentNamespaces = db.getAllNamespaces()

    if(currentNamespaces == undefined || currentNamespaces.length < 1) {
      return alert('\x1b[31mERROR\x1b[0m: No namespaces have been created')
    }

    alert('\x1b[4mNamespaces\x1b[0m')

    namespaceString = currentNamespaces.map(n => n.description ? '  ' + n.namespace.padEnd(10) + "  \x1b[2m"+ n.description + "\x1b[0m" : '  ' + n.namespace).filter(v => v).join('\n');
    return alert(namespaceString + '\n')
  },

  listAll: () => {
    let currentNamespaces = db.getAllNamespaces()

    if(currentNamespaces == undefined || currentNamespaces.length < 1) {
      return alert('\x1b[31mERROR\x1b[0m: No namespaces have been created')
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
