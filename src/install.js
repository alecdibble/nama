const ttt = require('tabtabtab')
const storage = require('./services/storage')
storage.init()

const db = require('./services/db')


console.log("Installing autcompletion script for main program: ")
ttt.installMultiple([
    {
      name: 'a',
      completer: 'a',
    },
    {
      name: 'ad',
      completer: 'ad',
    }
  ],
  'bash',
  'nama'
)
.then(() => console.log('Completion installed'))
.catch(err => console.log(err))

db.init()
