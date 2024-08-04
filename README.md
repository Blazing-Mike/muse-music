# Muse

Muse is a comprehensive music management app that leverages the Spotify API to provide a
seamless and personalized music streaming experience for users. The app will focus on enabling users
to create and manage playlists, as well as add and remove liked songs. Additionally, it will include
features such as user registration, personalized dashboards, search functionality, music playback,
and social sharing capabilities.

## Features (PRD)

- [ ] Personalized Dashboard: Users will be able to create personalized playlists, access their recently played songs, and view recommended songs based on their listening history.
- [ ] Music Playback: Users will be able to stream songs and create a queue of songs to listen to.
- [ ] Social Features: Users will be able to share their playlists and songs on social media platforms and follow other users to discover new music.
- [x] Search Functionality: The app will allow users to search for songs, artists, and playlists and sort the results by relevance, popularity, and genre.
- [x] User Registration: Muse will allow users to sign in with their spotify account

## Starters

API Doc: [Spotify API DOC](https://developer.spotify.com/documentation/web-api)


## Recommended IDE Setup


[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

## Env Variables

create a new .env file, copy and paste what is in `env.example` into this file

`VITE_API_SPOTIFY_CLIENT_ID` : you need a spotify developer account, you can create one [here](https://developer.spotify.com/), read the [getting started](https://developer.spotify.com/documentation/web-api) on how to create an app and get your client id


`VITE_API_SPOTIFY_REDIRECT_URI`= http://localhost:5173/callback  if your app is running on different port, you should modify as well. Also this value must be set to same when creating app on spotify developer dashboard. 

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
