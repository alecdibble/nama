const alert = require('./alert')

let topLevelHelp = `
na
  -Lists namepaces & shows info/help bar at top

na create [namespace]
  -Creates a namespace

na create [namespace] [alias] [command]
  Sets a command in a namespace

na [namespace]
  -Lists commands in namespace
  
na [namespace] [alias]
  -Runs command
`;

module.exports = (args) => {
  return alert(topLevelHelp);

}
