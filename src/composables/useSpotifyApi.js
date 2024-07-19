import { fetchWebApi } from '../utils/fetchWebApi'

//const topTracks = ref([]);

export function useSpotifyApi() {
  const getTopTracks = async () => {
    const response = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET')
    console.log(response.items)
    return response.items
  }

  const getProfile = async () => {
    const response = await fetchWebApi('v1/me', 'GET')
    return response
  }

  const getUserPlaylists = async () => {
    const response = await fetchWebApi(`v1/me/playlists/`, 'GET')
    const filteredPLaylists = response.items.filter((playlist) => playlist.owner.display_name === 'Mikeoxygen')
    return filteredPLaylists
  }

  const fetchUserPlaylists = async () => {
    // Fetch playlists from Spotify
  }

  const fetchLikedSongs = async () => {
    // Fetch liked songs from Spotify
  }

  const createPlaylist = async () => {
    // Create a new playlist on Spotify
  }

  return {
    fetchUserPlaylists,
    fetchLikedSongs,
    createPlaylist,
    getTopTracks,
    getProfile,
    getUserPlaylists
  }
}
