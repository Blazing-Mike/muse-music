<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useSpotifyApi } from '../composables/useSpotifyApi'

const { getTopTracks, getProfile, getUserPlaylists } = useSpotifyApi()
const topTracks = ref([])
const profile = ref(null)
const profileImage = ref(null)
const playlists = ref([])
const playlistCount = ref(0)
const iframeURL = ref(
  'https://open.spotify.com/embed/playlist/2cWJyJQ079pXm40JoOGie3?utm_source=generator&theme=0`'
)

onMounted(async () => {
  topTracks.value = await getTopTracks()
  profile.value = await getProfile()
  profileImage.value = profile.value.images[1].url
  playlists.value = await getUserPlaylists()
  playlistCount.value = playlists.value.length
})

const framestyleObject = reactive({
  minHeight: '360px',
  width: '100%',
  margin: '0 auto'
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

    <div class="flex-align-center gap-1">
      <p>Followers: {{ profile?.followers.total }}</p>
      <p>{{ playlistCount }} Public playlist</p>
      <a :href="profile?.external_urls.spotify" class="" target="_blank">{{ profile?.id }}</a>
    </div>
  </div>

  <div class="about">
    <div class="frame">
      <iframe
        title="Spotify Embed: Recommendation Playlist "
        :src="iframeURL"
        width="100%"
        height="100%"
        :style="framestyleObject"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  </div>
</template>

<style>

  .about {
    min-width: 20rem;
    margin: 2rem;
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
    background: hsla(160, 100%, 37%, 1);
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

  .profile-text {
    margin: 3rem;
  }

</style>
