const minimist = require('minimist')

const sync = require('./services/syncHelper')
const db = require('./services/db')
const cache = require('./services/cache')
const alert = require('./services/alert')

module.exports = () => {
  const args = minimist(process.argv.slice(2));

  if(args.d) {
    sync.deserializeDb(args.d)
    cache.cacheWrite()
    return console.log("Sync update successful!")
  }
  if(args.s) {
    return sync.serializeForSync()
  }
  if(args.t) {
    if(args.t == true) {
      return console.log(db.getSyncStatus()['synced_datetime'])
    }
    return db.storeSyncLog(args.t)
  }
}
