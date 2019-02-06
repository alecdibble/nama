const fs = require('fs');
const path = require('path');
const db = require('./db')
const storage = require('./storage');
const alert = require('./alert');
const homeDir = require('os').homedir();

module.exports = {
  cacheDeleteAll: () => {
    if (!fs.existsSync(storage.cacheDir)) {
      fs.mkdirSync(storage.cacheDir, 0755);
    }
    const files = fs.readdirSync(storage.cacheDir);
    for (const file of files) {
      fs.unlinkSync(path.join(storage.cacheDir, file));
    }
  },
  cacheWrite: () => {
    module.exports.cacheDeleteAll();
    const namespaces = db.getAllNamespaces();
    for (const i in namespaces) {
      var namespaceFile = path.join(storage.cacheDir, namespaces[i].namespace);
      var stream = fs.createWriteStream(namespaceFile, {flags:'a'});
      const commands = db.getCommands(namespaces[i].namespace);
      for (const j in commands) { 
        stream.write('_nama_command_' + commands[j].name + '="' + commands[j].command  +  '"\n');
      }
      stream.end();
    }
  },
}
