import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

let api = axios.create({
  baseURL: 'https://itunes.apple.com/search?term=',
  timeout: 3000
})

let playlistUrl = axios.create ({
  baseURL: 'http://localhost:3000/api/playlist',
  timeout: 3000
})

vue.use(vuex)

export default new vuex.Store({
  state:{
    // user: {},
    results: [],
    playlist: [], 
    songs: []
    // sortUp: true
  },

mutations:{
    // addSong(state, songs){
    //   state.songs = songs
    // },
      getPlaylist(state, playlist){
        state.playlist = playlist
      },
      listResults(state, results){
        state.results = results
      },
      addToPlaylist(state, playlist){
        state.playlist.push(playlist)
      },
      removeFromPlaylist(state, payload) {
        state.playlist.splice(payload, 1)
      }
    // promoteTrack(state, songs){ 
    //     state.songs = songs
    // },
    // demoteTrack(state, songs){ 
    //     state.songs = songs
    // }
},

actions:{

    getResults({commit, dispatch}, payload){
        api.get(payload)
          .then(res=>{
            commit("setResults", res.data.results)
          })
          .catch(err=>{
            alert(err.response.data.message)
          })
      },

      addToPlaylist({commit, dispatch}, payload){
        var song = {
          title: song.trackName,
          albumArt: song.artworkUrl60,
          artist: song.artistName,
          collection: song.collectionName,
          price: song.collectionPrice,
          preview: song.previewUrl
        }
        commit('addToPlaylist', song)
        // dispatch('addSong', )
      },

      removeFromPlaylist({commit, dispatch}, payload){
        commit('removeFromPlaylist', payload)
        // dispatch('addSong', )
      }, 
      
      // getPlaylist({dispatch, commit}) {
      //   playlistUrl.get('playlist')
      //   .then(res=>{
      //     commit('getPlaylist', res.data)
      //   })
      // }, 
    }    
})

