<script setup>
import { onMounted, ref } from 'vue'
import { useSpotifyApi } from '../composables/useSpotifyApi'

const { getRecommendedTracks } = useSpotifyApi()
const recommendedTracks = ref([])
onMounted(async () => {
  recommendedTracks.value = await getRecommendedTracks()
})
</script>

<template>
  <main>
    <div class=""><h2 class="">Recommended tracks</h2></div>
    <div class="flex">
      <ul v-if="recommendedTracks?.length">
        <li v-for="track in recommendedTracks" :key="track.id" class="list-item">
          {{ track?.name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 2rem;
  margin-top: 2rem;
}
</style>
