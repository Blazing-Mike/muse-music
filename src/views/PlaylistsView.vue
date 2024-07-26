<script setup>
import PlaylistCard from '@/components/PlaylistCard.vue'
import { onMounted, ref } from 'vue'
import { useSpotifyApi } from '../composables/useSpotifyApi'

const { getUserPlaylists } = useSpotifyApi()

const userPlaylists = ref([])
onMounted(async () => {
  userPlaylists.value = await getUserPlaylists()
})
</script>

<template>
  <div class="">
    <div class="header flex mx-auto w-80"><h1>My Playlists</h1></div>

    <ul v-if="userPlaylists?.length" class="flex-center flex-wrap">
      <PlaylistCard v-for="playlist in userPlaylists" :key="playlist.id" :playlist="playlist" />
    </ul>
  </div>
</template>

<style scoped>
.header {
  margin-top: 1rem;
}

h1{
  font-size: 2rem;
  color: white;
  font-weight: 600;
}
</style>
