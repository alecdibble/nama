const storage = require('./storage');
const alert = require('./alert')


module.exports = {
  getNamespaces: () => {
    let index = storage.getFile()
    return Object.keys(index)
  },

  writeNamespace: (namespace) => {
    let index = storage.getFile()
    index[namespace] = {}
    storage.writeFile(index)
  },

  getNames: (namespace) => {
    let index = storage.getFile()
    return Object.keys(index[namespace])
  },

  getCommands: (namespace) => {
    let index = storage.getFile()
    return index[namespace]
  },

  getCommand: (namespace, name) => {
    let index = storage.getFile()

    let namespaceArray = index[namespace]
    

    if(!(name in namespaceArray)) {
      return false
    }
    return namespaceArray[name]
  },

  writeCommand: (namespace, name, command) => {
    let index = storage.getFile()
    index[namespace][name] = command
    storage.writeFile(index)
  },
}
