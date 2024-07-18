<script setup>
import { onMounted, ref } from 'vue'
import { useSpotifyApi } from '../composables/useSpotifyApi'

const { getTopTracks, getProfile } = useSpotifyApi()
const topTracks = ref([])
const profile = ref(null)
const profileImage = ref(null)

onMounted(async () => {
  topTracks.value = await getTopTracks()
  profile.value = await getProfile()
  profileImage.value = profile.value.images[1].url
})
</script>

<template>
  <div class="profile-section">
    <div class="profile-image">
      <img :src="profileImage" alt="" class="" />
    </div>
  </div>

  <div class="profile-text">
    <h1>{{ profile?.display_name }}</h1>
    
    </div>

  <div class="about">
    <ul v-if="topTracks?.length">
      <li v-for="track in topTracks" :key="track.id" class="list-item">{{ track.name }}</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .list-item {
    color: white;
    font-size: 2rem;
  }

  .profile-section {
    position: relative;
    padding: 170px 0;
    background: rgba(255, 255, 255, 0.3);
    width: 100%;
  }

  .profile-image {
    position: absolute;
    border: 5px solid #000;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    left: 30px;
    bottom: -40px;
  }
  .profile-image img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;

  }

  .profile-text{
    margin: 3rem;
  }
}
</style>
