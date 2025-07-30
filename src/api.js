// src/api.js

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://vercel-vooy.onrender.com/api/v1';

// CORS Proxy is typically for development only.
// For production, ensure your backend correctly handles CORS.
// Set REACT_APP_USE_CORS_PROXY=false in your Vercel environment variables for production.
// Note: Using a public CORS proxy like cors-anywhere can be unreliable and should be avoided in production.
// It's best to configure CORS directly on your backend server.
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const USE_CORS_PROXY = process.env.REACT_APP_USE_CORS_PROXY === 'true';

// --- Helper for consistent API fetching and error handling ---
async function fetchData(url, options = {}) {
    // Apply CORS proxy only if enabled via environment variable
    const finalUrl = USE_CORS_PROXY ? `${CORS_PROXY}${url}` : url;
    console.log(`[API] Fetching: ${finalUrl}`, options);
    try {
        const res = await fetch(finalUrl, options);

        // If the response is not OK (e.g., 4xx, 5xx status codes)
        if (!res.ok) {
            let errorMessage = `HTTP error! Status: ${res.status}`;
            try {
                // Try to parse JSON for more specific error messages
                const errorData = await res.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (jsonError) {
                // If the response isn't JSON or is empty, just use the status message
                console.warn(`[API] Error response for ${url} was not JSON or was empty. Status: ${res.status}, Text: ${res.statusText}`);
            }
            throw new Error(errorMessage);
        }

        // Attempt to parse JSON. Some successful responses might not have a body.
        const text = await res.text(); // Read as text first
        let data = text ? JSON.parse(text) : {}; // Parse if not empty, otherwise return empty object

        // Heuristic to unwrap common API response structures
        // Many APIs wrap their data in a 'data', 'results', or 'response' key
        if (data && typeof data === 'object') {
            if (data.data && Object.keys(data).length === 1) { // If 'data' is the only key, unwrap it
                return data.data;
            } else if (data.results && Object.keys(data).length === 1) { // If 'results' is the only key, unwrap it
                return data.results;
            } else if (data.response && Object.keys(data).length === 1) { // If 'response' is the only key, unwrap it
                return data.response;
            }
        }
        return data; // Return as-is if no common wrapper found or if there are other keys
    } catch (err) {
        console.error(`[API] Fetch Error for ${url}:`, err);

        // Provide more context for common network/CORS errors
        if (err.message.includes('Failed to fetch') || err.message.includes('CORS')) {
            console.error('[API] CORS Error detected or network issue. This usually means:');
            console.error('1. The API server is not configured to allow cross-origin requests from your frontend\'s origin.');
            console.error('2. The API server is down or unreachable.');
            console.error('3. Network connectivity issues on your end.');
            console.error('Solution: Ensure your backend handles CORS correctly, or verify server status.');
        }

        throw err; // Re-throw to be caught by the component
    }
}

// Anime Data
export async function fetchHome() {
    return fetchData(`${API_BASE}/home`);
}

// Adjusted fetchAnimeList: Assuming 'type' (e.g., 'genre', 'top') and 'identifier' (e.g., 'Action', 'trending')
// are passed for constructing the URL.
// Example: fetchAnimeList('genre', 'Action', 1) => /api/v1/animes/genre/Action?page=1
export async function fetchAnimeList(type, identifier = '', page = 1) {
    let url = `${API_BASE}/animes`;
    if (type && identifier) {
        url += `/${type}/${encodeURIComponent(identifier)}`; // Encode identifier to handle spaces/special chars
    } else if (type) { // If only type is provided, assume it's a direct endpoint like /animes/popular
        url += `/${type}`;
    }
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
    // This API endpoint might be different depending on how you get server lists for streaming
    // If your stream endpoint automatically picks a server, you might not need this.
    return fetchData(`${API_BASE}/servers`);
}

// `fetchStream` expects `params` object containing `id`, `server`, `type` etc.
// The `id` needs to be the specific identifier for the episode's stream URL.
export async function fetchStream(params) {
    const url = new URL(`${API_BASE}/stream`);
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    return fetchData(url.toString()); // Convert URL object to string
}

// Auth/User API calls
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
    return fetchData(`${API_BASE}`);
}

export const fetchAnimeById = async (id) => {
    return fetchData(`${API_BASE}/anime/${id}`);
};