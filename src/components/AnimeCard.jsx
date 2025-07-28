// src/components/AnimeCard.jsx
import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaHeart, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Re-use or move the necessary styled-components from Home.jsx here
const AnimeCardWrapper = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const AnimeImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
`;

const AnimeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  ${AnimeCardWrapper}:hover & {
    opacity: 1;
  }
`;

const PlayButton = styled.button`
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary);
    transform: scale(1.1);
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  font-size: 1.2rem;
  color: ${props => (props.favorited ? 'var(--accent)' : 'white')};
  z-index: 2;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;

const AnimeDetails = styled.div`
  padding: 1.2rem;
`;

const AnimeTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AnimeInfo = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

const AnimeRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #ffc107;
  font-size: 0.9rem;
`;


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AnimeCard = ({ anime, isFavorited, onCardClick, onFavoriteToggle }) => {
  // Normalize data to prevent errors from inconsistent API responses
  const title = anime.title?.english || anime.title?.romaji || anime.title || 'Title not available';
  const image = anime.poster || anime.image || 'https://via.placeholder.com/220x280';
  const totalEpisodes = anime.episodes?.eps || anime.episodes?.length || 'N/A';
  const rating = anime.rating || null;

  return (
    <AnimeCardWrapper
      variants={cardVariants}
      onClick={() => onCardClick(anime)}
    >
      <AnimeImage
        src={image}
        alt={title}
        loading="lazy"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/220x280'; }}
      />
      <AnimeOverlay>
        <PlayButton>
          <FaPlay /> Watch Now
        </PlayButton>
      </AnimeOverlay>
      <FavoriteButton
        favorited={isFavorited}
        onClick={(e) => {
          e.stopPropagation(); // Prevent modal from opening when clicking favorite
          onFavoriteToggle(anime);
        }}
      >
        <FaHeart />
      </FavoriteButton>
      <AnimeDetails>
        <AnimeTitle>{title}</AnimeTitle>
        <AnimeInfo>
          Episodes: {totalEpisodes}
        </AnimeInfo>
        {rating && (
          <AnimeRating>
            <FaStar />
            {rating}
          </AnimeRating>
        )}
      </AnimeDetails>
    </AnimeCardWrapper>
  );
};

export default AnimeCard;