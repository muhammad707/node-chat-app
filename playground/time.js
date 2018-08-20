var moment = require('moment');

var date = moment();
// date.add(9, 'years');
// console.log(date.format('MMM Do YYYY'));

console.log(date.add(20, 'minutes').format('h:mm a'));
