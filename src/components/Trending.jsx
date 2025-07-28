import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchHome } from '../api';
import { FaFire, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
  font-size: 1.2rem;
`;

const PageContainer = styled.div`
  margin-left: 5rem;
  padding: 2rem;
  min-height: 100vh;
  background: var(--bg-primary);
`;
const InfoMessage = styled(LoadingMessage)`
  color: var(--text-secondary);
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
`;


const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const AnimeCard = styled(Link)`
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.4);
  }
`;

const AnimeImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  background: #222;
`;

const AnimeTitle = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: var(--text-primary);
  display: block;
  padding: 0.8rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


const ErrorMessage = styled(LoadingMessage)`
  color: #ff6b6b;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.8rem 0.8rem;
`;

const RatingBadge = styled.span`
  background: var(--accent);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

function Trending() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHome()
      .then(data => {
        setAnimes(data?.data?.spotlight || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load trending anime');
        setLoading(false);
      });
  }, []);

  const getAnimeTitle = (anime) => {
    return anime.title?.userPreferred || 
           anime.title?.romaji || 
           anime.title?.english || 
           anime.title || 
           "Untitled";
  };

  const getAnimeImage = (anime) => {
    return anime.image || 
           anime.coverImage?.large || 
           anime.coverImage?.medium || 
           anime.poster ||
           '/fallback.jpg';
  };

  const getAnimeRating = (anime) => {
    if (anime.rating) return anime.rating;
    if (anime.meanScore) return `${anime.meanScore / 10}/10`;
    return 'N/A';
  };

  if (loading) return (
    <PageContainer>
      <Header><FaFire /> Trending Anime</Header>
      <LoadingMessage>Loading trending anime...</LoadingMessage>
    </PageContainer>
  );

  if (error) return (
    <PageContainer>
      <Header><FaFire /> Trending Anime</Header>
      <ErrorMessage>Error: {error}</ErrorMessage>
    </PageContainer>
  );

  return (
    <PageContainer>
      <Header><FaFire /> Trending Anime</Header>
      {animes.length === 0 ? (
        <InfoMessage>No trending anime found</InfoMessage>
      ) : (
        <AnimeGrid>
          {animes.map(anime => (
            <AnimeCard 
              key={anime.id || anime.malId || getAnimeTitle(anime)} 
              to={`/anime/${anime.id}`}
            >
              <AnimeImage 
                src={getAnimeImage(anime)} 
                alt={getAnimeTitle(anime)} 
                onError={(e) => {
                  if (e.target.src !== '/fallback.jpg') {
                    e.target.src = '/fallback.jpg';
                  }
                }}
              />
              <AnimeTitle>{getAnimeTitle(anime)}</AnimeTitle>
              <InfoRow>
                <span>{anime.type || 'TV'}</span>
                <RatingBadge>
                  <FaStar size={12} /> {getAnimeRating(anime)}
                </RatingBadge>
              </InfoRow>
            </AnimeCard>
          ))}
        </AnimeGrid>
      )}
    </PageContainer>
  );
}

export default Trending;
