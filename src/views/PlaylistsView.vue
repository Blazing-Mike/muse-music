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
    <ul v-if="userPlaylists?.length" class="flex-center flex-wrap">
      <PlaylistCard v-for="playlist in userPlaylists" :key="playlist.id" :playlist="playlist" />
    </ul>
  </div>
</template>

<style></style> 
