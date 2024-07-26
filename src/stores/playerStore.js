// src/stores/playerStore.js
import { computed, reactive } from 'vue'
import { fetchWebApi } from '../utils/fetchWebApi'

export const playerState = reactive({
  isPlaying: false,
  currentTrack: null,
  playlist: [],
  currentTrackIndex: -1,
  progress: 0,
  audio: new Audio()
})

export const usePlayerStore = () => {
  const playTrack = (track, index = -1) => {
    if (playerState.currentTrack?.id !== track.id) {
      playerState.currentTrack = track
      playerState.audio.src = track.preview_url
    }
    playerState.audio.play()
    playerState.isPlaying = true
    playerState.currentTrackIndex = index
  }

  const playNextTrack = () => {
    if (playerState.currentTrackIndex < playerState.playlist.length - 1) {
      const nextIndex = playerState.currentTrackIndex + 1
      playTrack(playerState.playlist[nextIndex].track, nextIndex)
    }
  }

  const playPrevTrack = () => {
    if (playerState.currentTrackIndex > 0) {
      const prevIndex = playerState.currentTrackIndex - 1
      playTrack(playerState.playlist[prevIndex].track, prevIndex)
    }
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
    currentTrackIndex: computed(() => playerState.currentTrackIndex),
    progress: computed(() => playerState.progress),
    playTrack,
    playNextTrack,
    playPrevTrack,
    getUsersQueue,
    pauseTrack,
    setPlaylist: (playlist) => (playerState.playlist = playlist)
  }
}
