<script setup>
import { useRoute, useRouter } from 'vue-router'
import IconPlay from './icons/IconPlay.vue'
defineProps({
  playlist: {
    type: Object,
    required: true
  }
})
const router = useRouter()
const route = useRoute()




const viewPlaylist = (playlistId) => {
  if (route.name === 'playlist' && route.params.id === playlistId) {
    return
  }
  router.push({ name: 'playlist', params: { id: playlistId } })
}
</script>


<template>
  <div class="playlist-card">
    <IconPlay class="play-icon" @click="viewPlaylist(playlist.id)" />
    <div class="playlist-card__image">
      <img :src="playlist.images[0].url" alt="Album cover" />
    </div>
    <div class="playlist-card__info">
      <h3>{{ playlist.name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.playlist-card {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.playlist-card__image {
  margin-right: 1rem;
}

.playlist-card__image img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.playlist-card__info h3 {
  margin: 0;
}



.play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    color: white;
  }
</style>
