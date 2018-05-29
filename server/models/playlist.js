let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Playlist'

let songSchema = new Schema({
   
        title: { type: String, required: true },
        albumArt: { type: String, required: true },
        artist: { type: String, required: true },
        collection: { type: String, required: true },
        price: { type: Number, required: true },
        preview: { type: String, required: true },
    
})

let schema = new Schema({
    title: {String},
    songs: [songSchema]
})


schema.pre('save', function(next){
    this.markModified('songs')
    next()
})

module.exports = mongoose.model(schemaName, schema)