module.exports = { 
  sortObject: (unordered) =>{
    let ordered = {}
    Object.keys(unordered).sort().forEach((key) => {
      ordered[key] = unordered[key]
    })
    return ordered
  },

}
