var router = require('express').Router()
var Playlist = require('../models/playlist')
var Song = require('../models/playlist')

router.get('/api/playlists/:listId?', (req, res, next) =>{
    if(!req.params.listId) {
        Playlist.find({}).then(playlists => {
            res.send(playlists)
        })
    }else{
        Playlist.findById(req.params.listId).then(playlist =>{
            res.send(playlist)
        })
    }
})

router.post('/api/playlists', (req, res, next) => {
    Playlist.create(req.body).then(playlist => {
        res.send(playlist)
    })
})

router.post('/api/playlists/:listId', (req, res, next) => {
    Playlist.findByIdAndUpdate(req.params.playlistId, req.body).then(playlist => {
        res.send(playlist)
    })
    .catch(err =>{
        res.send({
            error: 'error'})
        })
    })

router.put('/api/playlists/:listId', (req, res, next) => {
    //Check req.body? req.params.listId?
    Playlist.create(req.body).then(playlist =>{
        playlist.songs.$addToSet(req.body)
        playlist.save()
        //.then()) =>{      move res.send in here?})
        res.send(playlist)
    })
})

module.exports = {
    router
}