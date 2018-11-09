const tabtab = require('tabtab')

tabtab.install({
  name: 'a',
  completer: 'a'
})
  .then(() => console.log('Completion installed'))
  .catch(err => console.error(err))
