const fs = require('fs');
const Database = require('better-sqlite3')

const alert = require('./alert')
const homeDir = require('os').homedir()

const configDir = homeDir +'/.config'
const mainDir = configDir +'/nama'

const db = new Database(mainDir + '/nama.db')

module.exports = {
  init: () => {
    db.prepare('CREATE TABLE IF NOT EXISTS namespaces (namespace TEXT UNIQUE, team_name TEXT)').run()
    db.prepare('CREATE TABLE IF NOT EXISTS commands (namespace TEXT, name TEXT, command TEXT)').run()  
  },

  createNamespace: (namespace) => {

  },

  getAllNamespaces: () => {

  },

  getCommands: (namespace) => {

  },

  getCommand: (namespace, command) => {

  },

  //Handle create/update
  updateCommand: (namespace, name, command) => {

  },

  removeCommand: (namespace, name) => {

  }
}
