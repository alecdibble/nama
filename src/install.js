const ttt = require('tabtabtab')
const storage = require('./services/storage')
const shell = require('shelljs');

storage.init()

const db = require('./services/db')


console.log("Installing autcompletion script for main program: ")
ttt.installMultiple([
    // {
    //   name: 'a',
    //   completer: 'a',
    // },
    {
      name: 'nama',
      completer: 'nama',
    },
    {
      name: 'ad',
      completer: 'ad',
    }
  ],
  'bash',
  'nama'
)
.then(() => {
  shell.exec('echo "na() { if [[ \'$1\' == \"completion\" ]]; then nama $@; else . nama $@; fi }" >> ~/.bashrc' , {silent:true}, function(code, stdout, stderr) {
    if(code == 0) {
      return console.log('Installation completed!')
    }
    return console.log('\x1b[31mERROR\x1b[0m: Problem with sync!')
  });
})
.catch(err => console.log(err))

db.init()
