const fs = require('fs');
const Database = require('better-sqlite3')

const alert = require('./alert')
const homeDir = require('os').homedir()

const configDir = homeDir +'/.config'
const mainDir = configDir +'/nama'

const db = new Database(mainDir + '/nama.db')

module.exports = {
  init: () => {
    db.prepare('CREATE TABLE IF NOT EXISTS namespaces (id INTEGER UNIQUE, namespace TEXT UNIQUE, description TEXT, team_id INTEGER, team_name TEXT)').run()
    db.prepare('CREATE TABLE IF NOT EXISTS commands (namespace TEXT, name TEXT, command TEXT, description TEXT, permission_level INT)').run()  
  },

  updateNamespace: (namespace, description) => {
    db.prepare('INSERT OR REPLACE INTO namespaces (namespace, description) VALUES(?, ?)').run(namespace, description)
  },

  getAllNamespaces: () => {
    const query = db.prepare('select namespace, description from namespaces').all()
    return query
  },

  getNamespace: (namespace) => {
    const query = db.prepare('select namespace, description from namespaces where namespace = ?').get(namespace)
    return query
  },

  getCommands: (namespace) => {
    const query = db.prepare('select name, command, description from commands where namespace = ?').all(namespace)
    return query
  },

  getCommand: (namespace, name) => {
    const query = db.prepare('select name, command, description from commands where namespace = ? and name = ?').get(namespace, name)
    return query
  },

  //Handle create/update
  updateCommand: (namespace, name, command, description) => {
    db.prepare('INSERT OR REPLACE INTO commands (namespace, name, command, description) VALUES(?, ?, ?, ?)').run(namespace, name, command, description)
  },

  removeCommand: (namespace, name) => {
    db.prepare('DELETE FROM commands WHERE namespace = ? and name = ?').run(namespace, name)
  }
}
