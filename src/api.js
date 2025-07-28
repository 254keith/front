const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://vercel-vooy.onrender.com/api/v1';

// Anime Data
export async function fetchHome() {
  const res = await fetch(`${API_BASE}/home`);
  console.log(`Waiting res ${res}`);
  if (!res.ok) throw new Error('Failed to fetch home data');
  return res.json();

}


export async function fetchAnimeList(query, category = '', page = 1) {
  let url = `${API_BASE}/animes/${query}`;
  if (category) url += `/${category}`;
  url += `?page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch anime list');
  return res.json();
}

export async function fetchAnimeDetails(id) {
  const res = await fetch(`${API_BASE}/anime/${id}`);
  if (!res.ok) throw new Error('Failed to fetch anime details');
  return res.json();
}

export async function fetchGenres() {
  const res = await fetch(`${API_BASE}/genres`);
  if (!res.ok) throw new Error('Failed to fetch genres');
  return res.json();
}

export async function searchAnime(keyword, page = 1) {
  const res = await fetch(`${API_BASE}/search?keyword=${encodeURIComponent(keyword)}&page=${page}`);
  if (!res.ok) throw new Error('Failed to search anime');
  return res.json();
}

export async function fetchSuggestions() {
  const res = await fetch(`${API_BASE}/suggestion`);
  if (!res.ok) throw new Error('Failed to fetch suggestions');
  return res.json();
}

export async function fetchEpisodes(id) {
  const res = await fetch(`${API_BASE}/episodes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch episodes');
  return res.json();
}

export async function fetchCharacters(id) {
  const res = await fetch(`${API_BASE}/characters/${id}`);
  if (!res.ok) throw new Error('Failed to fetch characters');
  return res.json();
}

export async function fetchCharacterDetail(id) {
  const res = await fetch(`${API_BASE}/character/${id}`);
  if (!res.ok) throw new Error('Failed to fetch character detail');
  return res.json();
}

export async function fetchServers() {
  const res = await fetch(`${API_BASE}/servers`);
  if (!res.ok) throw new Error('Failed to fetch servers');
  return res.json();
}

export async function fetchStream(params) {
  const url = new URL(`${API_BASE}/stream`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch stream info');
  return res.json();
}

// Auth/User
export async function registerUser({ username, email, password, fullName, phone, address }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, fullName, phone, address })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
  return res.json();
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
  return res.json();
}

export async function logoutUser(token) {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Logout failed');
  return res.json();
}

export async function resendVerification(email) {
  const res = await fetch(`${API_BASE}/auth/resend-verification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Resend verification failed');
  return res.json();
}

export async function forgotPassword(email) {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Forgot password failed');
  return res.json();
}

export async function changePassword({ oldPassword, newPassword, token }) {
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ oldPassword, newPassword })
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Change password failed');
  return res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Get profile failed');
  return res.json();
}

export async function updateProfile(profile, token) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(profile)
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Update profile failed');
  return res.json();
}

export async function deleteProfile(token) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Delete profile failed');
  return res.json();
}

export async function getOauthUrl(provider) {
  const res = await fetch(`${API_BASE}/auth/oauth-url?provider=${provider}`);
  if (!res.ok) throw new Error((await res.json()).message || 'Get OAuth URL failed');
  return res.json();
}

export async function fetchApiDocs() {
  const res = await fetch(`${API_BASE}/`);
  if (!res.ok) throw new Error('Failed to fetch API documentation');
  return res.json();
}
export const fetchAnimeById = async (id) => {
  const response = await fetch(`${API_BASE}/anime/${id}`);
  return await response.json();
};