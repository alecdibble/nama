module.exports = (alert, option) =>{
  switch(option) {
    case 'json':
      console.log('echo "' + JSON.stringify(alert)+ '"')
      break;

    case 'run':
      console.log(alert)
      break;
      
    default:
      console.log('echo "' + alert+ '"')
  }
}
