<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { usePlayerStore } from '../stores/playerStore'
import IconNext from './icons/IconNext.vue'
import IconPause from './icons/IconPause.vue'
import IconPlay from './icons/IconPlay2.vue'

const {
  isPlaying,
  currentTrack,
  currentTrackIndex,
  progress,
  playTrack,
  pauseTrack,
  getUsersQueue,
  playNextTrack,
  playPrevTrack
} = usePlayerStore()
//const playButtonLabel = computed(() => (isPlaying.value ? IconPause : IconPlay))
const artists = computed(() => (currentTrack.value ? currentTrack.value.artists : []))
const playerImage = computed(() => (currentTrack.value ? currentTrack.value.album.images[2] : ''))
const queue = ref([])
watch(currentTrack, (newTrack) => {
  if (newTrack) {
    console.log('Track changed:', newTrack)
  }
})

const progressStyleObject = computed(() => ({
  width: `${progress.value}%`
}))

const time = computed(() => {
  const minutes = Math.floor(progress.value / 60)
  const seconds = Math.floor(progress.value % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
})

onMounted(async () => {
  queue.value = await getUsersQueue()
  console.log('Queue:', queue)
})
</script>

<template>
  <div class="queue-container">
    <ul>
      <li v-for="track in queue" :key="track.id">
        <p>{{ track.name }}</p>
      </li>
    </ul>
  </div>
  <div class="player flex-align-center flex-wrap gap-2" v-if="currentTrack">
    <div class="track-item flex-align-center gap-1">
      <div class="song-card__image">
        <img :src="playerImage.url" alt="Album cover" class="player-image" />
      </div>
      <div class="song-card__info">
        <h3 class="title">{{ currentTrack?.name }}</h3>
        <div class="flex">
          <p class="flex-align-center" v-for="artist in artists" :key="artist.id">
            {{ artist.name }}<span v-if="artists.length > 1">,</span>
          </p>
        </div>
      </div>
    </div>

    <button @click="playPrevTrack" :disabled="currentTrackIndex <= 0" class="prev-button">
      <IconNext />
    </button>

    <button @click="isPlaying ? pauseTrack() : playTrack(currentTrack)" class="play-button">
      <div v-if="isPlaying">
        <IconPause />
      </div>
      <div v-else>
        <IconPlay />
      </div>
    </button>

    <button @click="playNextTrack" class="next-bttuon">
      <IconNext />
    </button>

    <div class="controls">
      <div class="flex-align-center gap-1">
        <span>0:00</span>
        <div class="progress-bar">
          <div class="progress" :style="progressStyleObject"></div>
        </div>
        <span>{{ time }}</span>
      </div>
    </div>
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

.player-image {
  border-radius: 10px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  min-width: 100%;
  height: 5px;
  background-color: #ddd;
  position: relative;
}

@media (min-width: 768px) {
  .progress-bar {
    min-width: 400px;
  }
}

.progress {
  height: 100%;
  background-color: #4caf50;
}

.queue-container {
  position: fixed;
  right: 0;
  height: 600px;
  background-color: rgba(0, 0, 0, 0.5);
}

.play-button,
.next-bttuon,
.prev-button {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
}

.prev-button {
  transform: rotate(180deg);
}
</style>
