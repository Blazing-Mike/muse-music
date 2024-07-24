<script setup>
import PlaylistCard from '@/components/PlaylistCard.vue'
import { onMounted, reactive, ref } from 'vue'
import SongCard from '../components/SongCard.vue'
import { useSpotifyApi } from '../composables/useSpotifyApi'

const { getRecommendedTracks, getUserPlaylists } = useSpotifyApi()
const recommendedTracks = ref([])
const userPlaylists = ref([])
const iframeURL = ref(
  'https://open.spotify.com/embed/playlist/2cWJyJQ079pXm40JoOGie3?utm_source=generator&theme=0`'
)
onMounted(async () => {
  recommendedTracks.value = await getRecommendedTracks()
  userPlaylists.value = await getUserPlaylists()
  userPlaylists.value = userPlaylists.value.slice(0, 5)
})

const framestyleObject = reactive({
  minHeight: '360px',
  width: '90%',
  margin: '0 auto'
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

    <div class="flex-align-center between w-90 ">
      <h2 class="heading">My Playlists</h2>
      <a href="/playlists" class="">show all</a>
    </div>

    <div class="flex">
      <ul v-if="userPlaylists?.length">
        <PlaylistCard v-for="playlist in userPlaylists" :key="playlist.id" :playlist="playlist" />
      </ul>
    </div>

    <div class="frame">
      <iframe
        title="Spotify Embed: Recommendation Playlist "
        :src="iframeURL"
        width="100%"
        height="100%"
        :style="framestyleObject"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  </main>
</template>

<style scoped>
.heading {
  margin: 0 0 0 4rem;
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

.frame {
  margin: 0 auto;
  width: 100%;
  text-align: center;
}
ul {
  display: flex;
}
</style>
