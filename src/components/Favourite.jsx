import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchAnimeList } from '../api';
import { FaStar } from 'react-icons/fa';

const PageContainer = styled.div`
  margin-left: 5rem;
  padding: 2rem;
  min-height: 100vh;
  background: var(--bg-primary);
`;
const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 2rem;
`;
const AnimeCard = styled.div`
  background: #111;
  border: 2px solid var(--dragon-core, #3b82f6);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
  }
`;
const AnimeImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;
const AnimeTitle = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: white;
  display: block;
  padding: 0.5rem;
`;

function Favourite() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchAnimeList('most-favorite')
      .then(data => {
        setAnimes(data.response || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <PageContainer>Loading favorite anime...</PageContainer>;
  if (error) return <PageContainer>Error: {error}</PageContainer>;

  return (
    <PageContainer>
      <Header><FaStar /> Most Favorite Anime</Header>
      <AnimeGrid>
        {animes.map(anime => (
          <AnimeCard key={anime.id}>
            <AnimeImage src={anime.poster} alt={anime.title} />
            <AnimeTitle>{anime.title}</AnimeTitle>
          </AnimeCard>
        ))}
      </AnimeGrid>
    </PageContainer>
  );
}

export default Favourite;
