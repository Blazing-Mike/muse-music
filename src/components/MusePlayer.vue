<script setup>
import { onMounted, ref } from 'vue'
import { usePlayer } from '../composables/usePlayer'

const { play, pause, getPlayBackState } = usePlayer()
const trackUri = 'spotify:track:YOUR_TRACK_URI'
const state = ref({})
const artists = ref([])
const playerImage = ref('')

onMounted(async () => {
  state.value = await getPlayBackState()
  artists.value = state.value.item.artists
  playerImage.value = state.value.item.album.images[2]
})
</script>

<template>
  <div class="player flex-align-center gap-2">
    <div class="track-item flex-align-center gap-1">
      <div class="song-card__image">
        <img :src="playerImage.url" alt="Album cover" class="player-image" />
      </div>
      <div class="song-card__info">
        <h3 class="title">{{ state?.item?.name }}</h3>
        <div class="flex">
          <p class="flex-align-center" v-for="artist in artists" :key="artist.id">
            {{ artist.name }} <span v-if="artists.length > 1">,</span>
          </p>
        </div>
      </div>
    </div>
    <button @click="play(trackUri)">Play</button>
    <button @click="pause">Pause</button>
  </div>
</template>

<style scoped>
.player {
  width: 100%;
}

.title {
  color: white;
  font-weight: 600;
}

.player-image{
  border-radius: 10px;
}
</style>
