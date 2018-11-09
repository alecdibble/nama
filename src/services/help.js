const alert = require('./alert')

let topLevelHelp = `
a
  -Lists namepaces & shows info/help bar at top

a create [namespace]
  -Creates a namespace

a create [namespace] [alias] [command]
  Sets a command in a namespace

a [namespace]
  -Lists commands in namespace
  
a [namespace] [alias]
  -Runs command
`;

module.exports = (args) => {
  return alert(topLevelHelp);

}
