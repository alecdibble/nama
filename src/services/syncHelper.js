const db = require('./db')
const alert = require('./alert')
const shell = require('shelljs');

module.exports = {
  getSyncStatus: () => {
    const status = db.getSyncStatus()

  },
  serializeForSync: () => {
    db.storeSyncLog()
    return console.log(JSON.stringify(db.serializeDB()))
  },
  deserializeDB: (schema) => {
    db.storeSyncLog()
  },
  syncAddNamespace: (namespace, description = '') => {
    if(description == null) {
      description = ''
    }
    if(shell.which('nama-sync')) {
      shell.exec('nama-sync namespace add ' + namespace + ' "' + description + '"' , {silent:true}, function(code, stdout, stderr) {
        if(code == 0) {
          // alert('Program output: ' + stdout);
          db.storeSyncLog()
          return alert('Sync sucessful')
        }
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
  syncAddCommand: (namespace, commandName, command, updated_at, description = '') => {
    if(shell.which('nama-sync')) {
      shell.exec('nama-sync command add ' + namespace + ' ' + commandName + ' ' + command + ' ' + updated_at + ' "' + description + '"' , {silent:true}, function(code, stdout, stderr) {
        if(code == 0) {
          alert('Program output: ' + stdout);
          db.storeSyncLog()
          return alert('Sync sucessful')
        }
        return alert('Error with sync!')
      });
    }
  },
  syncRemoveCommand: () => {
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
