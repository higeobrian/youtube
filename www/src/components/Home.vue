<template>
  <div class="Home container">
    <!-- Search Bar -->
    <div class="row">

      <div class="col-6" v-if="showLogin">
          <form v-on:submit.prevent="login">
            <input type="text" name="name" placeholder="Login" v-model="user.name">
            <button class="btn btn-light" type="submit">Login</button>
          </form>
      </div>

      <div class="col-6">
        <input type="text" v-model="query">
        <button @click="search">Search</button>
      </div>

    </div>

    <!-- Results -->

<div class="row">
    <div class="results">
        <h3>Results</h3>
        <ul>
          <li v-for="result in results">
          <h5>Title: {{results.title}</h5>
          </li>

          <li v-for="result in results">
          <h6>Album:</h6>
          <br>
          <img :src={{song.albumArt}>
          </br>
          </li>

          <li v-for="result in results">
          <h6>Artist: </h6>{{results.artist}}</li>

          <li v-for="result in results">
          <h6>Collection: </h6>{{results.collection}}</li>

          <li v-for="result in results">
          <h6>Price: </h6>{{results.price}</li>

          <li v-for="result in results">
          <h6>Preview:</h6>
          <br>
          <audio controls>
            <source :src={{song.preview}} type="audio/mpeg">
            </br>
          </audio>
          </li>

          <button @click="addToMyPlaylist(myPlaylist)">Add To PlayList</button>
        </ul>
      </div>

      <!-- MyFood -->

      <div class="myplaylist">
        <h3>My Playlist</h3>
        <ul>
          <!-- <li v-for="(food, index) in myplaylist"> -->
            <!-- <router-link :to="{name: 'PlaylistDetails', params: {id: index}}"> -->

              <li v-for="result in results"></li>
              <h5 class="trackname">Title: {{myPlaylist.trackName}}</h5>
          </li>

          <li v-for="myPlaylist in myPlaylists">
          <h6>Album: {{myPlaylist.collectionName}}</h6>
          <br>
          <img :src={{myPlaylist.albumArt}>
          </br>
          </li>

          <li v-for="result in results">
          <h6 class="artist">Artist: </h6>{{myPlaylist.artist}}</li>

          <li v-for="result in results">
          <h6 class="collection">Collection: </h6>{{myPlaylist.collection}}</li>

          <li v-for="myPlaylist in myPlaylists">
          <h6 class="price">Price: </h6>{{myPlaylist.price}</li>

          <li v-for="myPlaylist in myPlaylists">
          <h6 class="preview">Preview: {{myPlaylist.preview}}</h6>
          <br>
          <audio controls>
            <source :src={{myPlaylist.preview}} type="audio/mpeg">
            </br>
          </audio>
          </li>

          <div class="image">
              <img :src="search.artworkUrl100" :alt="search.collectionName"></div>

          <!-- </router-link> -->
        </ul>
        <button @click="moveUp(myPlaylist.trackId)">Move Up</button>
        <button @click="moveDown(myPlaylist.trackId)">Move Down</button>
        <button @click="removeFromPlaylist(myPlaylist.trackId)">Remove From Playlist</button>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        query: ''
      }
    },
    computed: {
      results() {
        return this.$store.state.results
      },
      myPlaylist() {
        return this.$store.state.myPlaylist
      }
    },
    methods: {
      search() {
        this.$store.dispatch('search', this.query)
        this.query = ''
      },
      addToPlaylist(song) {
        this.$store.dispatch('addToPlaylist', song)
      },
      removeFromPlaylist(song) {
      this.$store.dispatch("removeFromPlaylist", song);
      },
      moveUp(song){
        this.$store.dispatch('upSongPosition', song._id)
      },
      moveDown(song){
        this.$store.dispatch('downSongPosition', song._id)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>