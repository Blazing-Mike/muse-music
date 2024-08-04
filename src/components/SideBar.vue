<script setup>
import IconSearch from './icons/IconSearch.vue'
</script>

<template>
  <div>
    <nav class="flex gap-1 flex-col">
      <RouterLink to="/search">
        <RouterLink to="/search">
          <span class="flex-align-center gap-1"> Search <IconSearch /></span
        ></RouterLink>
      </RouterLink>
      <h3 class="semi-bold uppercase">Playlists</h3>
      <button class="btn">Create a Playlist</button>
      <RouterLink to="/playlists">Playlists</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
    </nav>
  </div>
</template>


<style scoped>

button{
  background-color: #1db954;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}


</style>