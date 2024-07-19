'use strict'

import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useAuth = () => {
  const spotifyCode = ref(null)
  const token = ref(localStorage.getItem('access_token') || null)
  const user = ref(null)
  const isAuthenticated = ref(!!localStorage.getItem('access_token') || '')
  const route = useRoute()
  const router = useRouter()

  const clientId = import.meta.env.VITE_API_SPOTIFY_CLIENT_ID
  const redirectUri = 'http://localhost:5173/callback'

  // Get token
  const getToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier')
    const url = 'https://accounts.spotify.com/api/token' // Added correct URL

    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier
      })
    }

    try {
      const response = await fetch(url, payload)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch token')
      }
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        token.value = data.access_token
        isAuthenticated.value = true
        router.push({ path: '/' })
      }
      return data.access_token
    } catch (error) {
      console.error('Error fetching token:', error)
    }
  }

  // Get user profile
  const getProfile = async () => {
    const accessToken = localStorage.getItem('access_token')

    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile')
      }

      user.value = data
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  // Log in
  const login = async () => {
    console.log('test', clientId)
    const scope =
      'user-read-private user-read-email playlist-read-private playlist-modify-public user-read-recently-played user-top-read user-follow-read user-library-modify user-library-read'
    const authUrl = new URL('https://accounts.spotify.com/authorize')

    const generateRandomString = (length) => {
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const values = crypto.getRandomValues(new Uint8Array(length))
      return values.reduce((acc, x) => acc + possible[x % possible.length], '')
    }

    const sha256 = async (plain) => {
      const encoder = new TextEncoder()
      const data = encoder.encode(plain)
      return window.crypto.subtle.digest('SHA-256', data)
    }

    const base64encode = (input) => {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
    }

    const codeVerifier = generateRandomString(64)
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed)

    window.localStorage.setItem('code_verifier', codeVerifier)

    const params = {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri
    }

    authUrl.search = new URLSearchParams(params).toString()
    window.location.href = authUrl.toString()
  }

  // log out

  const logout = () => {
    localStorage.removeItem('access_token')
    token.value = ''
    isAuthenticated.value = false
    router.push({ path: '/' })
  }

  return {
    spotifyCode,
    token,
    user,
    getToken,
    getProfile,
    login,
    logout,
    isAuthenticated,
    route,
    router
  }
}
