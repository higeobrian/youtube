var express = require('express')
var bp = require ('body-parser')
var app = express()
var cors = require('cors')
var port = 3000
var playlist = require('./routes/playlists')

app.use (cors())

require('./db/mlab-config')

app.use(bp.json())
app.use(bp.urlencoded({
  extended : true
}))

app.use(playlist.router)

//catch all
app.get('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})

app.listen(port, () => {
  console.log('server running on port', port)
})