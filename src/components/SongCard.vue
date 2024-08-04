<script setup>
import { usePlayerStore } from '../stores/playerStore';
import IconPlay from './icons/IconPlay.vue';
const { playTrack } = usePlayerStore();

defineProps({
  track: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="song-card">
    <div class="song-card__image">
      <IconPlay class="play" @click="playTrack(track)" />
      <img :src="track.album.images[0].url" alt="Album cover" />
    </div>

    <div class="song-card__info">
      <h3>{{ track.name }}</h3>
      <p>{{ track.artists[0].name }}</p>
    </div>
  </div>
</template>

<style scoped>
.song-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.song-card__image {
  position: relative;
  margin-right: 1rem;
}

.song-card__image img {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.song-card__info h3 {
  margin: 0;
  color: white;
}

.play {
  position: absolute;
  bottom: 40%;
  left: 30%;
}
</style>
