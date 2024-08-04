<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MusePlayer from './components/MusePlayer.vue'
import SideBar from './components/SideBar.vue'
import { useAuth } from './composables/useAuth'

const { login, spotifyCode, token, getToken, isAuthenticated, logout } = useAuth()
const route = useRoute()

const handleSpotifyAuth = async () => {
  const code = route.query.code
  if (code) {
    spotifyCode.value = code
    token.value = await getToken(code)
  }
}

onMounted(handleSpotifyAuth)

watch(
  () => route.query.code,
  async (newCode) => {
    if (newCode) {
      handleSpotifyAuth(newCode)
    }
  }
)
</script>

<template>
  <header>
    <RouterLink to="/">
      <h1 class="logo">Muse</h1>
    </RouterLink>

    <div class="wrapper">
      <nav>
        <RouterLink to="/playlists">Playlists</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
        <button @click="login" v-if="!isAuthenticated" class="log-in nav-btn">Log In</button>
        <button @click="logout" v-if="isAuthenticated" class="log-out nav-btn">Log Out</button>
      </nav>
    </div>
  </header>

  <section class="flex">
    <div class="sidebar">
      <SideBar />
    </div>

    <div class="app-view">
      <RouterView />
    </div>
  </section>

  <div class="player-container">
    <MusePlayer />
  </div>
</template>

<style scoped>
header {
  background-color: #000;
  color: white;
  padding: 0 3rem;
  height: var(--app-header-height);
}
header,
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  flex-wrap: wrap;
}

nav {
  gap: 10px;
}

.player-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #000;
  padding: 0 20px;
}

.logo {
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
}

.nav-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.log-out {
  background: red;
  padding: 10px 15px;
  border-radius: 5px;
}

.log-in {
  background: green;
  padding: 10px 15px;
  border-radius: 5px;
}

.sidebar {
  background: #000;
  width: 15%;
  left: 0;
  height: calc(100vh - (var(--app-header-height) + var(--app-player-height) - 40px));
  overflow-y: scroll;
  padding: 20px;
}

.app-view {
  width: 85%;
  padding: 20px;
  height: calc(100vh - (var(--app-header-height) + var(--app-player-height) - 40px));
  overflow: hidden;
  overflow-y: scroll;
}
</style>
