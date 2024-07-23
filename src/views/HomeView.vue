<script setup>
import PlaylistCard from '@/components/PlaylistCard.vue'
import { onMounted, ref } from 'vue'
import SongCard from '../components/SongCard.vue'
import { useSpotifyApi } from '../composables/useSpotifyApi'

const { getRecommendedTracks, getUserPlaylists } = useSpotifyApi()
const recommendedTracks = ref([])
const userPlaylists = ref([])
onMounted(async () => {
  recommendedTracks.value = await getRecommendedTracks()
  userPlaylists.value = await getUserPlaylists()
  userPlaylists.value = userPlaylists.value.slice(0, 5)
})
</script>

<template>
  <main>
    <div class=""><h2 class="heading">Recommended tracks</h2></div>
    <div class="flex">
      <ul v-if="recommendedTracks?.length">
        <SongCard v-for="track in recommendedTracks" :key="track.id" :track="track" />
      </ul>
    </div>

    <div class=""><h2 class="heading">My Playlists</h2></div>

    <div class="flex">
      <ul v-if="userPlaylists?.length">
        <PlaylistCard v-for="playlist in userPlaylists" :key="playlist.id" :playlist="playlist" />
      </ul>
    </div>
  </main>
</template>

<style scoped>
.heading {
  margin: 2rem 0 1rem 4rem;
  font-weight: 600;
  font-size: 2rem;
}
main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 2rem;
  margin-top: 2rem;
}

ul {
  display: flex;
}
</style>
