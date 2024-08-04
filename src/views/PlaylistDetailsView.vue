<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayerStore } from '../stores/playerStore'
import { fetchWebApi } from '../utils/fetchWebApi'

const route = useRoute()
const playlist = ref(null)
const loading = ref(false)
const error = ref(null)
const { playTrack, setPlaylist, currentTrack } = usePlayerStore()

const playTrackFromPlaylist = (track, index) => {
  setPlaylist(playlist.value.tracks.items)
  playTrack(track, index)
}

watch(() => route.params.id, fetchData, { immediate: true })

async function fetchData(id) {
  error.value = playlist.value = null
  loading.value = true

  try {
    playlist.value = await fetchWebApi(`v1/playlists/${id}`, 'GET')
  } catch (err) {
    error.value = err.toString()
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const playlistId = route.params.id
  playlist.value = await fetchWebApi(`v1/playlists/${playlistId}`, 'GET')
  if (playlist.value.tracks.items.length > 0) {
    playTrackFromPlaylist(playlist.value.tracks.items[0], 0) // Play the first track immediately
  }
})

const isCurrentTrack = (trackId) => {
  return currentTrack.value && currentTrack.value.id === trackId
}

const convertmstoMinutes = (ms) => {
  let minutes = Math.floor(ms / 60000)
  let seconds = ((ms % 60000) / 1000).toFixed(0)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
</script>

<template>
  <div class="playlist mx-auto w-80">
    <div class="flex flex-wrap gap-2 playlist-info">
      <div class="cover-container">
        <img :src="playlist?.images[0].url" alt="Playlist cover" class="playlist-cover" />
      </div>

      <div>
        <p class="tag">playlist</p>
        <h1 class="playlist-name">{{ playlist?.name }}</h1>
        <p>
          Created by: <span class="owner"> {{ playlist?.owner.display_name }} </span>
        </p>
        <p>
          Tracks: <span class="tracks"> {{ playlist?.tracks.total }}</span>
        </p>
        <button
          @click="playTrackFromPlaylist(playlist.tracks.items[0].track, 0)"
          class="btn play-icon"
        >
          Play
        </button>
      </div>
    </div>

    <ul v-if="playlist?.tracks?.items?.length">
      <div class="flex-center between table-heading">
        <p class="tag">Track</p>
        <p class="tag album-title">Album</p>
        <p class="tag duration-title">Duration</p>
      </div>
      <li
        v-for="track in playlist.tracks.items"
        :key="track.track.id"
        @click="playTrack(track.track, index)"
        :class="{ active: isCurrentTrack(track.track.id) }"
      >
        <div class="flex-align-center between">
          <div class="flex gap-2">
            <img :src="track.track.album.images[2].url" alt="Album cover" class="track-image" />

            <div class="track-info flex">
              <h1 class="track-name">{{ track.track.name }}</h1>
              <p>
                {{ track.track.artists[0].name }}
              </p>
            </div>
          </div>

          <p class="track-album">
            <span class=""> {{ track.track.album.name }}</span>
          </p>

          <p class="track-duration">
            <span class=""> {{ convertmstoMinutes(track.track.duration_ms) }}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.playlist {
  padding: 1rem 0;
  min-height: 100vh;
  margin-bottom: 3rem;
}

.playlist-info {
  margin: 2rem 0;
}

ul {
  list-style-type: none;
  padding: 10px 0;
}

li {
  margin-bottom: 1rem;
  padding: 20px;
}

li:hover,
li.active {
  background: hsla(160, 100%, 37%, 0.2);
  border-radius: 0.5rem;
}

.playlist-cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-right: 1rem;
}

.tag {
  text-transform: uppercase;
  color: hsla(160, 100%, 37%, 1);
  font-weight: 500;
}

.playlist-name {
  text-transform: capitalize;
  font-weight: 600;
  color: white;
}

.owner,
.tracks {
  color: white;
}

.track-info {
  flex-direction: column;
  min-width: 17rem;
}
.track-image {
  border-radius: 10px;
}

.track-name {
  margin-right: 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 500;
}

.album-title,
.track-album {
  display: none;
}

.table-heading {
  padding: 10px;
}

@media (min-width: 768px) {
  .table-heading {
    padding: 10px 20px;
  }

  .album-title,
  .track-album {
    display: block;
  }

  .track-album {

    
  }

  .album-title {
    padding-left: 10rem;
  }
}

.cover-container {
  position: relative;
}

.btn {
  background: hsla(160, 100%, 37%, 1);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: transparent;
  margin-top: 1rem;
}
</style>
