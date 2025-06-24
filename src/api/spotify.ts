import axios from 'axios';
import type { SearchType } from 'types/searchType.ts';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let accessToken: string | null = null;
let tokenExpiresAt: number = 0;

const getAccessToken = async (): Promise<string | null> => {
  const now = Date.now();

  if (accessToken && now < tokenExpiresAt) {
    return accessToken;
  }

  const credentials = btoa(`${clientId}:${clientSecret}`);

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiresAt = now + response.data.expires_in * 1000 - 5000;
    return accessToken;
  } catch (error: any) {
    const message =
      error.response?.data?.error_description || 'Błąd autoryzacji Spotify API';
    console.error('Access Token Error:', message);
    throw new Error(message);
  }
};

export const searchSpotify = async (
  query: string,
  type: SearchType,
  offset: number = 0
) => {
  try {
    const token = await getAccessToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type,
        limit: 20,
        offset,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.error?.message ||
      error.message ||
      'Błąd podczas wyszukiwania w Spotify';
    console.error('Spotify Search Error:', message);
    throw new Error(message);
  }
};

export const fetchSpotifyDetails = async (id: string, type: SearchType) => {
  try {
    const token = await getAccessToken();
    const url = `https://api.spotify.com/v1/${type}s/${id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.error?.message ||
      error.message ||
      'Błąd podczas pobierania szczegółów z Spotify';
    console.error('Spotify Details Error:', message);
    throw new Error(message);
  }
};
