// src/api.js

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://vercel-vooy.onrender.com/api/v1';

// --- Helper for consistent API fetching and error handling ---
async function fetchData(url, options = {}) {
  console.log(`[API] Fetching: ${url}`, options);
  try {
    const res = await fetch(url, options);

    // If the response is not OK (e.g., 4xx, 5xx status codes)
    if (!res.ok) {
      let errorMessage = `HTTP error! Status: ${res.status}`;
      try {
        const errorData = await res.json();
        // Use a message from the backend if available, otherwise default
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (jsonError) {
        // If the response isn't JSON, just use the status message
        console.warn('API error response was not JSON:', res.statusText);
      }
      throw new Error(errorMessage);
    }

    // Attempt to parse JSON. Some successful responses might not have a body.
    const text = await res.text(); // Read as text first
    return text ? JSON.parse(text) : {}; // Parse if not empty, otherwise return empty object
  } catch (err) {
    console.error(`[API] Fetch Error for ${url}:`, err);
    throw err; // Re-throw to be caught by the component
  }
}

// Anime Data
export async function fetchHome() {
  return fetchData(`${API_BASE}/home`);
}

export async function fetchAnimeList(query, category = '', page = 1) {
  let url = `${API_BASE}/animes/${query}`;
  if (category) url += `/${category}`;
  url += `?page=${page}`;
  return fetchData(url);
}

export async function fetchAnimeDetails(id) {
  return fetchData(`${API_BASE}/anime/${id}`);
}

export async function fetchGenres() {
  return fetchData(`${API_BASE}/genres`);
}

export async function searchAnime(keyword, page = 1) {
  return fetchData(`${API_BASE}/search?keyword=${encodeURIComponent(keyword)}&page=${page}`);
}

export async function fetchSuggestions() {
  return fetchData(`${API_BASE}/suggestion`);
}

export async function fetchEpisodes(id) {
  return fetchData(`${API_BASE}/episodes/${id}`);
}

export async function fetchCharacters(id) {
  return fetchData(`${API_BASE}/characters/${id}`);
}

export async function fetchCharacterDetail(id) {
  return fetchData(`${API_BASE}/character/${id}`);
}

export async function fetchServers() {
  return fetchData(`${API_BASE}/servers`);
}

export async function fetchStream(params) {
  const url = new URL(`${API_BASE}/stream`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  return fetchData(url);
}

// Auth/User
export async function registerUser({ username, email, password, fullName, phone, address }) {
  return fetchData(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, fullName, phone, address })
  });
}

export async function loginUser({ email, password }) {
  return fetchData(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

export async function logoutUser(token) {
  return fetchData(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export async function resendVerification(email) {
  return fetchData(`${API_BASE}/auth/resend-verification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
}

export async function forgotPassword(email) {
  return fetchData(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
}

export async function changePassword({ oldPassword, newPassword, token }) {
  return fetchData(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ oldPassword, newPassword })
  });
}

export async function getProfile(token) {
  return fetchData(`${API_BASE}/auth/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export async function updateProfile(profile, token) {
  return fetchData(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(profile)
  });
}

export async function deleteProfile(token) {
  return fetchData(`${API_BASE}/auth/profile`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export async function getOauthUrl(provider) {
  return fetchData(`${API_BASE}/auth/oauth-url?provider=${provider}`);
}

export async function fetchApiDocs() {
  return fetchData(`${API_BASE}/`);
}

export const fetchAnimeById = async (id) => {
  return fetchData(`${API_BASE}/anime/${id}`);
};