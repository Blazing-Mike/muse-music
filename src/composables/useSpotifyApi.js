import { fetchWebApi } from '../utils/fetchWebApi'

//const topTracks = ref([]);

export function useSpotifyApi() {
  const getTopTracks = async () => {
    const response = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET')
    return response.items
  }

  const getProfile = async () => {
    const response = await fetchWebApi('v1/me', 'GET')
    return response
  }

  const getUserPlaylists = async () => {
    const response = await fetchWebApi(`v1/me/playlists/`, 'GET')
    const filteredPLaylists = response.items.filter(
      (playlist) => playlist.owner.display_name === 'Mikeoxygen'
    )
    return filteredPLaylists
  }

  const getRecentlyPlayed = async () => {
    const response = await fetchWebApi('v1/me/player/recently-played', 'GET')
    return response
  }

  const getTopArtists = async () => {
    const response = await fetchWebApi('v1/me/top/artists?time_range=long_term&limit=6', 'GET')
    return response.items
  }

  const topTracksIds = [
    '5KV5UXd1uNZZafWTudrVft',
    '6gyTRQ20O9FVRHsLBQMJ6x',
    '007i2QN59ZGOgiUujuktFp',
    '1IMRi5UVOV77PsAgdWDvzh',
    '1fFixJPR0ZXgpm1b8DeL7g'
  ]

  const getRecommendedTracks = async () => {
    const response = await fetchWebApi(
      `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`,
      'GET'
    )
    return response.tracks
  }

  const fetchLikedSongs = async () => {
    // Fetch liked songs from Spotify
  }

  const search = async (query) => {
    // Search for tracks on Spotify
    const response = await fetchWebApi(`v1/search?q=${query.value}&type=artist,album,track`, 'GET');
    return response
  }

  const createPlaylist = async () => {
    // Create a new playlist on Spotify
  }

  return {
    fetchLikedSongs,
    createPlaylist,
    getTopTracks,
    getProfile,
    getUserPlaylists,
    getRecentlyPlayed,
    getRecommendedTracks,
    getTopArtists, 
    search
  }
}
