const acc = require('./accessors');

let createError = `Error: Please supply a valid namespace.

Example:

  na create test

  - Will create a namespace with the name 'test'
`;

module.exports = { 
  create: (args) => {
    if(args._.length < 2) {
      return console.error(createError);
    }

    let namespace = args._[1]

    let currentNamespaces = acc.getNamespaces()
    if(namespace in currentNamespaces) {
      return console.error(`Error: ${namespace} namespace already exists`);
    }

    acc.writeNamespace(namespace)
  },

  list: (args) => {
    let currentNamespaces = acc.getNamespaces()
    return currentNamespaces.length ? console.log(currentNamespaces.join('\n')) : console.error('Error: No namespaces have been created')
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
