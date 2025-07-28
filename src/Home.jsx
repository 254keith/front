import React, { useEffect, useState } from 'react';
import { fetchHome } from './api';

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchHome()
      .then(data => {
        setHomeData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading homepage...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!homeData) return <div>No data available.</div>;

  return (
    <div>
      <h1>Spotlight</h1>
      {homeData.spotlight && (
        <div>
          <h2>{homeData.spotlight.title}</h2>
          <img src={homeData.spotlight.poster} alt={homeData.spotlight.title} style={{maxWidth: 200}} />
          <p>{homeData.spotlight.synopsis}</p>
        </div>
      )}

      <h2>Trending</h2>
      <div style={{display: 'flex', gap: 16, overflowX: 'auto'}}>
        {homeData.trending?.map(anime => (
          <div key={anime.id} style={{minWidth: 120}}>
            <img src={anime.poster} alt={anime.title} style={{width: 100}} />
            <div>{anime.title}</div>
          </div>
        ))}
      </div>

      <h2>Top Airing</h2>
      <div style={{display: 'flex', gap: 16, overflowX: 'auto'}}>
        {homeData.topAiring?.map(anime => (
          <div key={anime.id} style={{minWidth: 120}}>
            <img src={anime.poster} alt={anime.title} style={{width: 100}} />
            <div>{anime.title}</div>
          </div>
        ))}
      </div>

      <h2>Most Popular</h2>
      <div style={{display: 'flex', gap: 16, overflowX: 'auto'}}>
        {homeData.mostPopular?.map(anime => (
          <div key={anime.id} style={{minWidth: 120}}>
            <img src={anime.poster} alt={anime.title} style={{width: 100}} />
            <div>{anime.title}</div>
          </div>
        ))}
      </div>

      <h2>Most Favorite</h2>
      <div style={{display: 'flex', gap: 16, overflowX: 'auto'}}>
        {homeData.mostFavorite?.map(anime => (
          <div key={anime.id} style={{minWidth: 120}}>
            <img src={anime.poster} alt={anime.title} style={{width: 100}} />
            <div>{anime.title}</div>
          </div>
        ))}
      </div>

      <h2>Latest Completed</h2>
      <div style={{display: 'flex', gap: 16, overflowX: 'auto'}}>
        {homeData.latestCompleted?.map(anime => (
          <div key={anime.id} style={{minWidth: 120}}>
            <img src={anime.poster} alt={anime.title} style={{width: 100}} />
            <div>{anime.title}</div>
          </div>
        ))}
      </div>

      <h2>Latest Episode</h2>
      <div style={{display: 'flex', gap: 16, overflowX: 'auto'}}>
        {homeData.latestEpisode?.map(anime => (
          <div key={anime.id} style={{minWidth: 120}}>
            <img src={anime.poster} alt={anime.title} style={{width: 100}} />
            <div>{anime.title}</div>
          </div>
        ))}
      </div>

      <h2>Newly Added</h2>
      <div style={{display: 'flex', gap: 16, overflowX: 'auto'}}>
        {homeData.newAdded?.map(anime => (
          <div key={anime.id} style={{minWidth: 120}}>
            <img src={anime.poster} alt={anime.title} style={{width: 100}} />
            <div>{anime.title}</div>
          </div>
        ))}
      </div>

      <h2>Top Upcoming</h2>
      <div style={{display: 'flex', gap: 16, overflowX: 'auto'}}>
        {homeData.topUpcoming?.map(anime => (
          <div key={anime.id} style={{minWidth: 120}}>
            <img src={anime.poster} alt={anime.title} style={{width: 100}} />
            <div>{anime.title}</div>
          </div>
        ))}
      </div>

      <h2>Top 10</h2>
      {homeData.top10 && (
        <div>
          <h3>Today</h3>
          <ol>
            {homeData.top10.today?.map(anime => (
              <li key={anime.id}>{anime.title}</li>
            ))}
          </ol>
          <h3>This Week</h3>
          <ol>
            {homeData.top10.week?.map(anime => (
              <li key={anime.id}>{anime.title}</li>
            ))}
          </ol>
          <h3>This Month</h3>
          <ol>
            {homeData.top10.month?.map(anime => (
              <li key={anime.id}>{anime.title}</li>
            ))}
          </ol>
        </div>
      )}

      <h2>Genres</h2>
      <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
        {homeData.genres?.map(genre => (
          <span key={genre} style={{border: '1px solid #ccc', padding: '4px 8px', borderRadius: 4}}>{genre}</span>
        ))}
      </div>
    </div>
  );
}

export default Home; 