module.exports = { 
  processForAutoComplete: (array) =>{
    return array.map(function(e) {return 'echo ' + e});
  }
}
