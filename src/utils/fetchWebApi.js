import { useAuth } from '../composables/useAuth'

const { token, logout } = useAuth()

export const fetchWebApi = async (endpoint, method, params=null) => {
  try {
    if (!token.value) {
      throw new Error('Access token is missing')
    }
    const response = await fetch(`https://api.spotify.com/${endpoint}`, {
      method: method,
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      params: {
        params
      }
    })
    if (!response.ok) {
      const errorData = await response.json()
      if (response.status === 401) {
        logout()
      }
      throw new Error(`Error: ${response.status} - ${errorData.error.message}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch data from Spotify API:', error)
    throw error
  }
}
