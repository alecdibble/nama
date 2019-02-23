const alert = require('./alert')

let topLevelHelp = `
nama - namespaced aliases
Stores a set of aliases that a grouped into single-word namespaces

na
  -Lists namepaces & shows info/help bar at top

na c [namespace]
na create [namespace]
  -Creates a namespace

na c [namespace] [alias] [command]<-Enclosed in quotes
na create [namespace] [alias] [command]<-Enclosed in quotes
  -Sets a command in a namespace
  -Ex:
    a c utils go_home 'cd ~/'

na rm [namespace] [alias]
na delete [namespace] [alias]
  -Deletes an alias in a namespace

na [namespace]
  -Lists commands in namespace
  
na [namespace] [alias]
  -Runs command
`;

module.exports = (args) => {
  return alert(topLevelHelp);

}
