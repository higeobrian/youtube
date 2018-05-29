var mongoose = require('mongoose')
var connectionString = 'mongodb://youtube:123456@ds135540.mlab.com:35540/youtube'
var connection = mongoose.connection

mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})

connection.once('open', ()=>{
  console.log('Connected to Database')
})
