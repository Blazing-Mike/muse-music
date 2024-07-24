<script setup>
import { onMounted, ref } from 'vue'
import { usePlayer } from '../composables/usePlayer'

const { pause, getPlayBackState } = usePlayer()
const state = ref({})
const artists = ref([])
const playerImage = ref('')
const audio = ref(null)
// const circleLeft = ref(null)
// const barWidth = ref(null)
// const duration = ref(null)
// const currentTime = ref(null)
const isTimerPlaying = ref(false)
// const tracks = ref([])
// const currentTrack = ref(null)
// const currentTrackIndex = ref(0)
// const transitionName = ref(null)

function play() {
  if (audio.value.paused) {
    audio.value.play()
    isTimerPlaying.value = true
  } else {
    audio.value.pause()
    isTimerPlaying.value = false
  }
}

function generateTime() {
  let width = (100 / this.audio.duration) * this.audio.currentTime
  this.barWidth = width + '%'
  this.circleLeft = width + '%'
  let durmin = Math.floor(this.audio.duration / 60)
  let dursec = Math.floor(this.audio.duration - durmin * 60)
  let curmin = Math.floor(this.audio.currentTime / 60)
  let cursec = Math.floor(this.audio.currentTime - curmin * 60)
  if (durmin < 10) {
    durmin = '0' + durmin
  }
  if (dursec < 10) {
    dursec = '0' + dursec
  }
  if (curmin < 10) {
    curmin = '0' + curmin
  }
  if (cursec < 10) {
    cursec = '0' + cursec
  }
  this.duration = durmin + ':' + dursec
  this.currentTime = curmin + ':' + cursec
}

function updateBar(x) {
  let progress = this.$refs.progress
  let maxduration = this.audio.duration
  let position = x - progress.offsetLeft
  let percentage = (100 * position) / progress.offsetWidth
  if (percentage > 100) {
    percentage = 100
  }
  if (percentage < 0) {
    percentage = 0
  }
  this.barWidth = percentage + '%'
  this.circleLeft = percentage + '%'
  this.audio.currentTime = (maxduration * percentage) / 100
  this.audio.play()
}

function clickProgress(e) {
  this.isTimerPlaying = true
  this.audio.pause()
  this.updateBar(e.pageX)
}

function prevTrack() {
  this.transitionName = 'scale-in'
  this.isShowCover = false
  if (this.currentTrackIndex > 0) {
    this.currentTrackIndex--
  } else {
    this.currentTrackIndex = this.tracks.length - 1
  }
  this.currentTrack = this.tracks[this.currentTrackIndex]
  this.resetPlayer()
}

function nextTrack() {
  this.transitionName = 'scale-out'
  this.isShowCover = false
  if (this.currentTrackIndex < this.tracks.length - 1) {
    this.currentTrackIndex++
  } else {
    this.currentTrackIndex = 0
  }
  this.currentTrack = this.tracks[this.currentTrackIndex]
  this.resetPlayer()
}

function resetPlayer() {
  this.barWidth = 0
  this.circleLeft = 0
  this.audio.currentTime = 0
  this.audio.src = this.currentTrack.source
  setTimeout(() => {
    if (this.isTimerPlaying) {
      this.audio.play()
    } else {
      this.audio.pause()
    }
  }, 300)
}

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

    <div class="">
      <span>0.00</span>
      <div class="progress-bar"></div>
      <span>{{}}</span>
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
</style>
