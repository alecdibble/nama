const tabtab = require('tabtab')
const db = require('./services/db')

console.log("Installing autcompletion script for main program: ")
tabtab.install({
  name: 'a',
  completer: 'a'
})
.then(() => {
  console.log('First installation complete!\n\n')
  console.log('Starting install of default shortcut autocompletion script:')
  tabtab.install({
    name: 'ad',
    completer: 'ad'
  })
    .then(() => console.log('Completion installed'))
    .catch(err => console.log(err))
})
.catch(err => console.log(err))

db.init()
