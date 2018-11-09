const storage = require('./storage');


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

  getCommands: (namespace) => {
    let index = storage.getFile()
    return index[namespace]
  },

  writeCommand: (namespace, name, command) => {
    let index = storage.getFile()
  },

  runCommand: (namespace, name) => {
    let index = storage.getFile()
  },
}
