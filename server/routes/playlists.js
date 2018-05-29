var router = require('express').Router()
var Playlist = require('../models/playlist')
// var Song = require('../models/playlist') // parent.. playlist/ has scope to song

router.get('/api/playlists/:id?', (req, res, next) =>{
    if(req.params.id) { // if they did give me an id... then.. do below then do .then..send to playlist
        Playlist.findById(req.params.id)
        .then(playlists => {
            return res.send(playlists)
        })
        .catch(err=> {
           return res.status(400).send({'error': 'No playlist at that Id'})
        })
    }
    Playlist.find({})
    .then(playlists => {
        return res.send(playlists)
    })
    .catch(err=> {
       return res.status(400).send({'error': err
    })
    })
    
    // }else{
    //     Playlist.findById(req.params.listId).then(playlist =>{
    //         res.send(playlist)
    //     })
    // }
})

router.post('/api/playlists', (req, res, next) => { 
    Playlist.create(req.body).then(newPlaylist => {
        return res.send(newPlaylist)
    })
    .catch(err =>{
        return res.status(400).send(err) //return means.. stop here.. a safety net.
    })
})

//add a single song.. REQ.BODY will be a song object

router.put('/api/playlists/:id/songs', (req, res, next) => {
    //Check req.body? req.params.listId?
    Playlist.findById(req.params.id).then(function(playlist){
        playlist.songs.addToSet(req.body)
        playlist.save()
        //.then()) =>{      move res.send in here?}
    })
    .catch(err => {
        res.status(400).send(err)
    })
})
//can't use lambda expression above either.. so do function(playlist).. no =>

//Update entire song array from entire playlist
//:id full playlist object
//req.body --passes entire object-- blow away the db and replace with w/e object you gave me //request 
//new true sends back new object/value

router.put('/api/playlists/:id', (req, res, next) => {
    //Check req.body? req.params.listId?
    Playlist.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(playlist =>{
        //.then()) =>{      move res.send in here?})
        res.send(playlist)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

router.delete('/api/playlists/:id', (req, res, next) => {
    Playlist.findByIdAndRemove(req.params.id).then(oldPlaylist=>{
        res.send('deleted!')
    })
    .catch(err =>{
        res.send(err)
    })
})

module.exports = {
    router
}