const tabtab = require('tabtab')
const alert = require('./alert')
const utilities = require('./utilities')
const acc = require('./accessors')


module.exports = () =>{
  const env = tabtab.parseEnv(process.env)

  switch(env.prev) {
    case "create":
      namespaces = acc.getNamespaces()
      tabtab.log(namespaces)
      break

    case "ad":
      commands = acc.getNames('Default')
      return tabtab.log(commands)
      return

    default:
      if(env.words == 1) {
        namespaces = acc.getNamespaces()
        return tabtab.log(namespaces)
      }
      if(env.words == 2) {
        commands = acc.getNames(env.prev)
        return tabtab.log(commands)
      }
  }
}
