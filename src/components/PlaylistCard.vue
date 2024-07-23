<script setup>
defineProps({
  playlist: {
    type: Object,
    required: true
  }
})


</script>

<template>
  <div class="playlist-card">
    <div class="playlist-card__image">
      <img :src="playlist.images[0].url" alt="Album cover">
    </div>
    <div class="playlist-card__info">
      <h3>{{ playlist.name }}</h3>
    </div>
  </div>
</template>

<style scoped>
.playlist-card {
  display: flex;
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

</style>