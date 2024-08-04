<script setup>
import ArtistCard from '@/components/ArtistCard.vue'
import PlaylistCard from '@/components/PlaylistCard.vue'
import { onMounted, ref } from 'vue'
import SongCard from '../components/SongCard.vue'
import { useAuth } from '../composables/useAuth'
import { useSpotifyApi } from '../composables/useSpotifyApi'

const { getRecommendedTracks, getUserPlaylists, getTopArtists } = useSpotifyApi()
const { isAuthenticated } = useAuth()

const recommendedTracks = ref([])
const userPlaylists = ref([])
const topArtists = ref([])

onMounted(async () => {
  recommendedTracks.value = await getRecommendedTracks()
  userPlaylists.value = await getUserPlaylists()
  userPlaylists.value = userPlaylists.value.slice(0, 5)
  topArtists.value = await getTopArtists()
})
</script>

<template>
  <main>
    <section class="" v-if="isAuthenticated">
      <div class=""><h2 class="heading">Recommended tracks</h2></div>
      <div class="flex" v-if="recommendedTracks?.length">
        <SongCard v-for="track in recommendedTracks" :key="track.id" :track="track" />
      </div>

      <div class="flex-align-center between w-90 gap-2">
        <h2 class="heading">My Playlists</h2>
        <a href="/playlists" class="">show all</a>
      </div>

      <div class="flex flex-wrap" v-if="userPlaylists?.length">
        <PlaylistCard v-for="playlist in userPlaylists" :key="playlist.id" :playlist="playlist" />
      </div>

      <div class="top-artists" v-if="topArtists?.length">
        <div class="flex-align-center between w-90">
          <h2 class="heading">Top Artists</h2>
          <a href="/artists" class="">show all</a>
        </div>
        <div class="flex gap-2 flex-wrap mt-2">
          <ArtistCard v-for="artist in topArtists" :key="artist.id" :artist="artist" />
        </div>
      </div>
    </section>

    <section v-else class="hero">
      <h1>Muse Music</h1>
      <p class="log-in-statement">Please log in to explore muse</p>
    </section>
  </main>
</template>

<style scoped>
.heading {
  color: white;
  font-weight: 600;
  font-size: 2rem;
}

main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 2rem 0;
}

@media (min-width: 768px) {
  main {
    padding: 0 2rem;
  }
}

.frame {
  margin: 0 auto;
  width: 100%;
  text-align: center;
}
ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
}
.hero {
  text-align: center;
}

.hero p {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.hero h1 {
  color: hsla(160, 100%, 37%, 1);
  font-size: 5rem;
  font-weight: 600;
}
.top-artists {
  margin-top: 2rem;

  .artist-name {
    font-size: 1.2rem;
    font-weight: 500;
    color: white;
  }
}

.artist-image {
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 1rem;
}
</style>
