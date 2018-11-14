const fs = require('fs');
const alert = require('./alert')
const homeDir = require('os').homedir();

const configDir = homeDir +'/.config';
const mainDir = configDir +'/nama';

module.exports = {
  init: () => {
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, 0744);
    }
    if (!fs.existsSync(mainDir)) {
      fs.mkdirSync(mainDir, 0744);
    }
  }
}
