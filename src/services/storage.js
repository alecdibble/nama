const fs = require('fs');
const alert = require('./alert')
const homeDir = require('os').homedir();

const mainDir = homeDir +'/.na';
const indexFile = mainDir + '/.local_index';

module.exports = {
  init: () => {
    if (!fs.existsSync(mainDir)) {
      fs.mkdirSync(mainDir, 0744);
      if (!fs.existsSync(indexFile)) {
        fs.writeFileSync(indexFile, JSON.stringify({}));
      }
    }
  },

  getFile: () => {
    let rawData = null
    
    try{
      rawData = fs.readFileSync(indexFile);
    }
    catch(e) {
      return alert("Error reading file");
    }

    try{
      return JSON.parse(rawData);
    }
    catch(e) {
      return alert("Error parsing file");
    }
  },

  writeFile: (index) => {
    try{
      return fs.writeFileSync(indexFile, JSON.stringify(index));
    }
    catch(e) {
      return alert('Error writing file');
    }
  }
}
