<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
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
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="35" height="35" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/profile">Profile</RouterLink>
        <button @click="login" v-if="!isAuthenticated">Log In</button>
        <button @click="logout" v-if="isAuthenticated">Log Out</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background-color: #000;
  color: white;
  padding: 30px 3rem;
}
header,
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav {
  gap: 10px;
}
</style>
