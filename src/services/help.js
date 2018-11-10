const alert = require('./alert')

let topLevelHelp = `
nama - namespaced aliases
Stores a set of aliases that a grouped into single-word namespaces

a
  -Lists namepaces & shows info/help bar at top

a c [namespace]
a create [namespace]
  -Creates a namespace

a c [namespace] [alias] [command]<-Enclosed in quotes
a create [namespace] [alias] [command]<-Enclosed in quotes
  -Sets a command in a namespace
  -Ex:
    a c utils go_home ''cd ~/''

a rm [namespace] [alias]
a delete [namespace] [alias]
  -Deletes an alias in a namespace

a [namespace]
  -Lists commands in namespace
  
a [namespace] [alias]
  -Runs command
`;

module.exports = (args) => {
  return alert(topLevelHelp);

}
