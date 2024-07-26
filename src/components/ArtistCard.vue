<script setup>
defineProps({
  artist: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="flex-center flex-col">
    <img :src="artist.images[0].url" alt="Artist" class="artist-image" />
    <p class="artist-name">{{ artist.name }}</p>
  </div>
</template>

<style scoped>
.artist-name {
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
}

.artist-image {
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 1rem;
}
</style>
