<script setup>
import ArtistCard from '@/components/ArtistCard.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import PlaylistCard from '@/components/PlaylistCard.vue'
import SongCard from '@/components/SongCard.vue'
import { ref } from 'vue'
import { fetchWebApi } from '../utils/fetchWebApi'

const query = ref('')
const results = ref({ artists: { items: [] }, playlists: { items: [] }, tracks: { items: [] } })
const loading = ref(false)

const handleSearch = async () => {
  if (!query.value) {
    results.value = { artists: { items: [] }, playlists: { items: [] }, tracks: { items: [] } }
    return
  }
  loading.value = true

  try {
    const response = await fetchWebApi(
      `v1/search?q=${query.value}&type=artist,playlist,track`,
      'GET'
    )
    results.value = {
      artists: { items: response.artists.items.slice(0, 6) },
      playlists: { items: response.playlists.items.slice(0, 5) },
      tracks: { items: response.tracks.items.slice(0, 5) }
    }
  } catch (error) {
    console.error('Error fetching search results:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="search">
    <div class="search-container">
      <IconSearch class="icon-search" v-if="!query" />
      <input
        v-model="query"
        @input="handleSearch"
        placeholder="Search for artists, playlists, or songs"
      />
    </div>

    <div v-if="loading">Loading...</div>

    <div v-if="results.tracks.items.length">
      <div class="flex-align-center between mx-auto">
        <h2 class="heading">Songs</h2>
      </div>

      <div class="flex">
        <SongCard v-for="track in results.tracks.items" :key="track.id" :track="track" />
      </div>
    </div>

    <div v-if="!loading && query">
      <div v-if="results.artists.items.length">
        <div class="flex-align-center between mx-auto">
          <h2 class="heading">Artists</h2>
        </div>

        <div class="flex-center mt-2 gap-3">
          <ArtistCard v-for="artist in results.artists.items" :key="artist.id" :artist="artist" />
        </div>
      </div>
      <div v-if="results.playlists.items.length">
        <div class="flex-align-center between w-90 mt-2">
          <h2 class="heading">My Playlists</h2>
          <a href="/playlists" class="">show all</a>
        </div>

        <div class="flex-center gap-2">
          <PlaylistCard
            v-for="playlist in results.playlists.items"
            :key="playlist.id"
            :playlist="playlist"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.search {
  margin: 1rem;
}

.search-container {
  position: relative;
}

.icon-search {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
}

input {
  width: 100%;
  padding: 1rem 0.5rem;
  color: white;
  margin-bottom: 1rem;
  font-size: 1rem;
  background: black;
  border: 1px solid var(--color-background);
  border-radius: 4px;
  outline: none;
  display: flex;
}

input::placeholder {
  padding-left: 2rem;
}

h2 {
  margin-top: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
}

.heading {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
}

@media (min-width: 768px) {
  input {
    width: 50%;
  }

  .search {
    margin: 2rem 3rem;
  }

  .heading {
    font-size: 2rem;
  }
}
</style>
