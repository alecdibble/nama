const tabtab = require('tabtab')
const alert = require('./alert')
const db = require('./db')


module.exports = () =>{
  const env = tabtab.parseEnv(process.env)

  switch(env.prev) {
    case "create":
      namespaces = db.getAllNamespaces()
      //Add code to turn into array of names
      tabtab.log(namespaces)
      break

    case "ad":
      commands = db.getCommands('Default')
      // Add code to turn into array of command names
      return tabtab.log(commands)
      return

    default:
      if(env.words == 1) {
        namespaces = db.getAllNamespaces()
        processedNamespaces = namespaces.map(namespace => namespace.namespace)
        //Add code to turn into array of names
        return tabtab.log(processedNamespaces)
      }
      if(env.words == 2) {
        commands = db.getCommands(env.prev)
        processedNamespaces = commands.map(command => command.name)
        // Add code to turn into array of command names
        return tabtab.log(commands)
      }
  }
}
