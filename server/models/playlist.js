let mongoose = require('mongoose')
let Schema = mongoose.Schema
let schemaName = 'playlist'

let song = new Schema({
   
    title: { type: String, required: true },
    albumArt: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    price: { type: Number, required: true },
    preview: { type: String, required: true },

})

let playlist = new Schema({
    title: {type: String, required: true},
    songs: [song]

})

playlist.pre('save', function(next){ //event listener (pre) mark it as changed.. Mongoose always assume something changed, so it replaces existing stuff on db.
    this.markModified('songs')
    next()
})
//can't use a lambda expression 'save', (next) =>.... 


module.exports = mongoose.model(schemaName, playlist)