const fs = require('fs');
const Database = require('better-sqlite3')
const moment = require('moment');

const alert = require('./alert')
const homeDir = require('os').homedir()

const configDir = homeDir +'/.config'
const mainDir = configDir +'/nama'

const db = new Database(mainDir + '/nama.db')

module.exports = {
  init: () => {
    db.prepare('CREATE TABLE IF NOT EXISTS namespaces (namespace TEXT UNIQUE PRIMARY KEY, description TEXT, team_id INTEGER, team_name TEXT)').run()
    db.prepare('CREATE TABLE IF NOT EXISTS commands (namespace TEXT, name TEXT, command TEXT, description TEXT, permission_level INT, updated_at INT, PRIMARY_KEY(namespace, command))').run()
    db.prepare('CREATE TABLE IF NOT EXISTS sync (id INTEGER PRIMARY KEY NOT NULL, synced INTEGER DEFAULT 0, synced_datetime INTEGER DEFAULT 0)').run()    
  },

  updateNamespace: (namespace, description) => {
    return db.prepare('INSERT OR REPLACE INTO namespaces (namespace, description) VALUES(?, ?)').run(namespace, description)
  },

  deleteNamespace: (namespace) => {
    db.prepare('DELETE FROM namespaces WHERE namespace = ?').run(namespace)
  },

  getAllNamespaces: () => {
    return db.prepare('select namespace, description from namespaces').all()
  },

  getNamespace: (namespace) => {
    return db.prepare('select namespace, description from namespaces where namespace = ?').get(namespace)
  },

  getCommands: (namespace) => {
    return db.prepare('select name, command, description, updated_at from commands where namespace = ?').all(namespace)
  },

  getCommand: (namespace, name) => {
    return db.prepare('select name, command, description, updated_at from commands where namespace = ? and name = ?').get(namespace, name)
  },

  //Handle create/update
  updateCommand: (namespace, name, command, description, updated_at = moment().unix()) => {
    alert(description)
    const query = db.prepare('INSERT OR REPLACE INTO commands (namespace, name, command, description, updated_at) VALUES(?, ?, ?, ?, ?)').run(namespace, name, command, description, updated_at)
    return module.exports.getCommand(namespace, name)
  },

  removeCommand: (namespace, name) => {
    return db.prepare('DELETE FROM commands WHERE namespace = ? and name = ?').run(namespace, name)
  },

  serializeDB: () => {
    let dataObject = [];
    const namespaces = db.prepare('select namespace, description from namespaces').all()
    for(var i in namespaces) {
      let namespace = namespaces[i]
      let namespaceObject = {
        namespace: namespace.namespace,
        commands: module.exports.getCommands(namespaces[i].namespace)
      }
      dataObject.push(namespaceObject)
    }
    return dataObject
  },
  deserializeOverwriteDB: (schema) => {
    db.prepare('DELETE FROM commands').run()
    db.prepare('DELETE FROM namespaces').run()
    for (var i in schema) {
      module.exports.updateNamespace(schema[i]['namespace'], schema[i]['description'])
      for(var j in schema[i]['commands']) {
        const command = schema[i]['commands'][j];
        module.exports.updateCommand(schema[i]['namespace'], command['name'], command['command'], command['description'], command['updated_at'])
      }
    }
  },
  storeSyncLog: () => {
    const query = db.prepare('INSERT OR REPLACE INTO sync (id, synced, synced_datetime) VALUES(?, ?, ?)').run(1, 1, moment().unix())
  },
  getSyncStatus: () => {
    return db.prepare('select synced, synced_datetimed from sync where id = ?').get(1)
  }
}
