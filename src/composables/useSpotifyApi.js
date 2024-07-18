import {fetchWebApi} from '../utils/fetchWebApi'

//const topTracks = ref([]);

export function useSpotifyApi() {
  const getTopTracks = async () => {
    // Fetch top artists from Spotify
    const response = await fetchWebApi( 'v1/me/top/tracks?time_range=long_term&limit=5', 'GET');
    console.log(response.items);
    return response.items;
  }





  const getProfile = async () => {
    const response = await fetchWebApi( 'v1/me', 'GET');
    return response;
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

  return { fetchUserPlaylists, fetchLikedSongs, createPlaylist, getTopTracks, getProfile }
}
