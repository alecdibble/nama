const fs = require('fs');
const db = require('./db')
const homeDir = require('os').homedir();

const configDir = homeDir +'/.config';
const mainDir = configDir +'/nama';
const cacheDir = mainDir +'/cache';

module.exports = {
  init: () => {
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, 0755);
    }
    if (!fs.existsSync(mainDir)) {
      fs.mkdirSync(mainDir, 0755);
    }
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, 0755);
    }
  },
  configDir: configDir,
  mainDir: mainDir,
  cacheDir: cacheDir
}
