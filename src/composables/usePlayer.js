import { ref } from 'vue'
import { fetchWebApi } from '../utils/fetchWebApi'

export function usePlayer() {
  const isPlaying = ref(false)
  const currentTrack = ref(null)

  const getPlayBackState = async () => {
    const response = await fetchWebApi(`v1/me/player`, 'GET')
    return response
  }

  const play = (trackUri = '') => {
    // Play a track using Spotify API
    return trackUri
  } 

  const pause = () => {
    // Pause playback using Spotify API
  }

  return { isPlaying, currentTrack, play, pause, getPlayBackState }
}
