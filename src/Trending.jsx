import React, { useEffect, useState } from 'react';
import { fetchAnimeList } from '../api';

function Trending() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchAnimeList('top-airing')
      .then(data => {
        setAnimes(data.response || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading trending anime...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Trending Anime</h2>
      <div style={{display: 'flex', gap: 16, overflowX: 'auto'}}>
        {animes.map(anime => (
          <div key={anime.id} style={{minWidth: 120}}>
            <img src={anime.poster} alt={anime.title} style={{width: 100}} />
            <div>{anime.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending; 