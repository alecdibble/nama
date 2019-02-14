const db = require('./db')
const alert = require('./alert')
const shell = require('shelljs');

module.exports = {
  getSyncStatus: () => {
    const status = db.getSyncStatus()

  },
  serializeForSync: () => {
    db.storeSyncLog()
    return console.log(Buffer.from(JSON.stringify(db.serializeDB())).toString('base64'))
  },
  deserializeDb: (schema) => {
    db.storeSyncLog()
    db.deserializeOverwriteDB(JSON.parse(Buffer.from(schema, 'base64').toString()))
    return
  },
  syncSendChanges: () => {
    if(shell.which('nama-sync')) {
      shell.exec('nama-sync schemaMerge ' + Buffer.from(JSON.stringify(db.serializeDB())).toString('base64') , {silent:true}, function(code, stdout, stderr) {
        if(code == 0) {
          // alert('Program output: ' + stdout);
          db.storeSyncLog()
          return alert('Sync sucessful!')
        }
        return alert(stderr)
        return alert('Error with sync!')
      });
    }
  },
  syncRemoveNamespace: (namespace) => {
    if(shell.which('nama-sync')) {
      shell.exec('nama-sync namespace remove ' + namespace , {silent:true}, function(code, stdout, stderr) {
        if(code == 0) {
          // alert('Program output: ' + stdout);
          db.storeSyncLog()
          return alert('Sync sucessful!')
        }
        return alert('Error with sync!')
      });
    }
  },
  syncRemoveCommand: (namespace, commandName) => {
    if(shell.which('nama-sync')) {
      shell.exec('nama-sync command remove ' + namespace + ' ' + commandName, {silent:true}, function(code, stdout, stderr) {
        if(code == 0) {
          alert('Program output: ' + stdout);
          db.storeSyncLog()
          return alert('Sync sucessful')
        }
        return alert('Error with sync!')
      });
    }
  },
}
