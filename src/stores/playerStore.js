// src/stores/playerStore.js
import { computed, reactive } from 'vue'
import { fetchWebApi } from '../utils/fetchWebApi'

export const playerState = reactive({
  isPlaying: false,
  currentTrack: null,
  progress: 0,
  audio: new Audio()
})

export const usePlayerStore = () => {
  const playTrack = (track) => {
    if (playerState.currentTrack?.id !== track.id) {
      playerState.currentTrack = track
      playerState.audio.src = track.preview_url
    }
    playerState.audio.play()
    playerState.isPlaying = true
  }

  const pauseTrack = () => {
    playerState.audio.pause()
    playerState.isPlaying = false
  }

  const getUsersQueue = async () => {
    const response = await fetchWebApi('v1/me/player/queue', 'GET')
    return response.queue
  }

  playerState.audio.ontimeupdate = () => {
    playerState.progress = (playerState.audio.currentTime / playerState.audio.duration) * 100
  }

  return {
    isPlaying: computed(() => playerState.isPlaying),
    currentTrack: computed(() => playerState.currentTrack),
    progress: computed(() => playerState.progress),
    playTrack,
    getUsersQueue,
    pauseTrack
  }
}
