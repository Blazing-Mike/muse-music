// src/composables/usePlayer.js

import { ref } from 'vue';

export function usePlayer() {
  const isPlaying = ref(false);
  const currentTrack = ref(null);
  const audio = ref(new Audio());
  const progress = ref(0);

  const playTrack = (track) => {
    if (currentTrack.value?.id !== track.id) {
      currentTrack.value = track;
      audio.value.src = track.preview_url;
      audio.value.play();
      isPlaying.value = true;
    } else {
      audio.value.play();
      isPlaying.value = true;
    }
  };

  const pauseTrack = () => {
    audio.value.pause();
    isPlaying.value = false;
  };

  audio.value.ontimeupdate = () => {
    progress.value = (audio.value.currentTime / audio.value.duration) * 100;
  };

  return { isPlaying, currentTrack, progress, playTrack, pauseTrack };
}
