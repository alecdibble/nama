const minimist = require('minimist')

const sync = require('./services/syncHelper')
const db = require('./services/db')

module.exports = () => {
  const args = minimist(process.argv.slice(2));

  if(args.d) {
    db.deserializeOverwriteDB(args._[0])
    return console.log("Sync update successful!")
  }
  if(args.s) {
    return console.log(JSON.stringify(db.serializeDB()))
  }
}
