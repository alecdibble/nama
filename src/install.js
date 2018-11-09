const tabtab = require('tabtab')

tabtab.install({
  name: 'na',
  completer: 'na'
})
  .then(() => console.log('Completion installed'))
  .catch(err => console.error(err))
