// src/components/Home.jsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  FaPlay,
  FaFire,
  FaClock,
  FaFilter,
  FaStar,
  FaHeart,
  FaSearch,
  FaTimes,
  FaSpinner // Keeping FaSpinner for cases where the GIF might not load, or for other spinners
} from 'react-icons/fa';

import {
  fetchHome,
  fetchGenres, // Now used for fetching genres
  fetchAnimeList,
  fetchAnimeDetails,
  fetchEpisodes,
  fetchStream,
  searchAnime,
} from '../api';

import sharinganLoader from './sharingan_trimmed.gif'; // Import the GIF

// ===== KEYFRAMES =====
const spinSharingan = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// ===== STYLED COMPONENTS =====
const Container = styled.div`
  padding-left: 6rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
`;

const Hero = styled.section`
  position: relative;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.95),
    rgba(15, 23, 42, 0.7)
  );
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  max-width: 800px;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  color: var(--accent);
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  font-weight: 700;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const HeroButton = styled.button`
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
  }
`;


const SearchSection = styled.section`
  padding: 2rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: 0.8rem 1.2rem;
  border: 2px solid var(--accent);
  border-radius: 25px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const ClearButton = styled.button`
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: var(--primary);
    transform: translateY(-1px);
  }
`;

const SortSelect = styled.select`
  padding: 0.8rem 1.2rem;
  border: 2px solid var(--accent);
  border-radius: 25px;
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const GenresSection = styled.section`
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--accent);
  font-weight: 600;
`;

const GenresContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const GenreButton = styled.button`
  background: ${props => props.$active ? 'var(--accent)' : 'transparent'};
  color: ${props => props.$active ? 'var(--bg-primary)' : 'var(--accent)'};
  border: 2px solid var(--accent);
  border-radius: 25px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: var(--accent);
    color: var(--bg-primary);
    transform: translateY(-1px);
  }
`;

const ContentSection = styled.section`
  padding: 2rem;
`;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const AnimeCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const AnimeImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${AnimeCard}:hover & {
    transform: scale(1.05);
  }
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

  ${AnimeCard}:hover & {
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
  color: ${props => props.favorited ? '#ff4757' : 'white'};
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

const LoadMoreButton = styled.button`
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 25px;
  cursor: pointer;
  margin: 2rem auto;
  display: block;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  margin: 1rem auto; /* Center error message */
  max-width: 600px; /* Limit width */
`;

const LoadingSpinner = styled.div`
  // display: flex;
  // flex-direction: column; /* Stack image and text */
  // align-items: center;
  // justify-content: center;
  // position: absolute; /* Position absolutely to center */
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%); /* Center perfectly */
  // padding: 3rem;
  // gap: 1rem;
  // color: var(--text-secondary);
  // font-size: 1.1rem;
  // z-index: 1000; /* Ensure it's above other content */
`;

const LoadingSharingan = styled.img`
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

// ===== MODAL COMPONENTS =====
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: var(--bg-secondary);
  border-radius: 20px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ModalImage = styled.img`
  width: 180px;
  height: 240px;
  object-fit: cover;
  border-radius: 15px;
  flex-shrink: 0;
`;

const ModalInfo = styled.div`
  flex: 1;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--accent);
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ModalMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start; /* Align left */
  @media (max-width: 768px) {
    justify-content: center; /* Center on small screens */
  }
`;

const MetaItem = styled.span`
  background: rgba(6, 182, 212, 0.1);
  color: var(--accent);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
`;

const ModalGenres = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  justify-content: flex-start; /* Align left */
  @media (max-width: 768px) {
    justify-content: center; /* Center on small screens */
  }
`;

const GenreTag = styled.span`
  background: var(--accent);
  color: var(--bg-primary);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ModalDescription = styled.p`
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
`;

const EpisodesSection = styled.div`
  padding: 2rem;
`;

const EpisodesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px; /* Space for scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
  }
`;

const EpisodeCard = styled.div`
  background: var(--bg-primary);
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }
`;

const EpisodeTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const EpisodeInfo = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const VideoPlayer = styled.div`
  padding: 2rem;
`;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  border-radius: 15px;
  overflow: hidden;
  background: #000; /* Black background for video container */
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

// ===== REVIEW AND NEWSLETTER COMPONENTS (Re-added from previous versions) =====
const ReviewsSection = styled.section`
  padding: 2rem;
  margin: 2rem;
  background: var(--bg-secondary);
  border-radius: 12px;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ReviewCard = styled.div`
  background: var(--bg-primary);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const ReviewerAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const ReviewerName = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ReviewRating = styled.div`
  color: #ffc107;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const ReviewComment = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const ReviewForm = styled.form`
  margin-top: 2rem;
  padding: 0 2rem;
  text-align: left;
`;

const FormInput = styled.input`
  padding: 0.8rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid var(--accent);
  border-radius: 12px;
  background: var(--bg-primary);
  color: var(--text-primary);
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid var(--accent);
  border-radius: 12px;
  background: var(--bg-primary);
  color: var(--text-primary);
`;

const FormButton = styled.button`
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  &:hover {
    background: var(--primary);
    transform: scale(1.05);
  }
`;

const NewsletterSection = styled.section`
  padding: 2rem;
  margin: 2rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  text-align: center;
`;

const NewsletterTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const NewsletterInput = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid var(--accent);
  border-radius: 12px;
  min-width: 250px;
  background: var(--bg-primary);
  color: var(--text-primary);
`;

const NewsletterButton = styled.button`
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  &:hover {
    background: var(--primary);
    transform: scale(1.05);
  }
`;

const Footer = styled.footer`
  background: var(--bg-secondary);
  color: var(--text-secondary);
  text-align: center;
  padding: 2rem;
  margin-top: 2rem;
  font-size: 0.9rem;
`;

// New styled component for the featured anime description
const FeaturedDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 32px;
  color: #fff;
  text-shadow: 0 2px 8px #000;
  line-height: 1.5;
  ${props => !props.showFull && `
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limit to 3 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

const ReadMoreButton = styled.button`
  background: rgba(0,0,0,0.5);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0,0,0,0.7);
  }
`;


// ===== MAIN COMPONENT =====
export default function Home() {
  // ===== STATE =====
  const [homeData, setHomeData] = useState({
    trending: [],
    popular: [],
    upcoming: [],
    recent: [],
    featured: [],
    genres: []
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);
  const [sortOption, setSortOption] = useState('A-Z');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initial loading for home data
  const [minLoading, setMinLoading] = useState(true); // For 5s enforced loading
  const [error, setError] = useState(null);

  // Modal state
  const [modalAnime, setModalAnime] = useState(null);
  const [modalEpisode, setModalEpisode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false); // Loading state for modal details/stream

  // Pagination state
  const [visibleCount, setVisibleCount] = useState({
    popular: 8,
    recent: 8
  });

  // State for Featured Anime Description visibility
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Re-added states for Reviews and Newsletter
  const [reviews, setReviews] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Refs
  const searchTimeoutRef = useRef(null);
  const genresRef = useRef(null);

  // ===== EFFECTS =====
  useEffect(() => {
    loadHomeData();
    loadFavorites();
    // Enforce minimum 5s loading
    setMinLoading(true);
    const timer = setTimeout(() => setMinLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch genres separately if not present in homeData
  useEffect(() => {
    if (!homeData.genres || homeData.genres.length === 0) {
      fetchGenres()
        .then((genresData) => {
          let genres = [];
          if (Array.isArray(genresData)) {
            genres = genresData;
          } else if (genresData.data && Array.isArray(genresData.data)) {
            genres = genresData.data;
          } else if (genresData.genres && Array.isArray(genresData.genres)) {
            genres = genresData.genres;
          }
          setHomeData((prev) => ({ ...prev, genres }));
        })
        .catch((err) => {
          console.error('Failed to load genres:', err);
        });
    }
  }, [homeData.genres]);

  useEffect(() => {
    localStorage.setItem('animeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // ===== FUNCTIONS =====
  const loadHomeData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchHome();
      console.log('[API] Home data:', response);

      const data = response.data || response; // Adapt to your API's wrapping
      setHomeData({
        trending: data.trending || [],
        popular: data.mostPopular || [],
        upcoming: data.topUpcoming || [],
        recent: data.latestEpisode || [],
        featured: data.spotlight || data.top10?.today || [],
        genres: data.genres || []
      });
      setReviews(data.reviews || []); // Assuming initial reviews can be part of homeData
    } catch (err) {
      console.error('Failed to load home data:', err);
      setError('Failed to load data. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // If fetchGenres is a separate API call and not included in fetchHome response:
  // const loadGenresData = async () => {
  //   try {
  //     const genresData = await fetchGenres();
  //     setHomeData(prev => ({ ...prev, genres: Array.isArray(genresData.data) ? genresData.data : [] }));
  //   } catch (err) {
  //     console.error('Failed to load genres:', err);
  //   }
  // };

  const loadFavorites = () => {
    const saved = localStorage.getItem('animeFavorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  };

  const handleSearch = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);
    console.log('[Search] Input changed to:', term);
  
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  
    searchTimeoutRef.current = setTimeout(async () => {
      if (!term.trim()) {
        console.log('[Search] Empty search term, clearing results.');
        setSearchResults([]);
        setActiveGenre(null);
        setError(null);
        return;
      }
  
      try {
        setIsLoading(true);
        setError(null);
        setActiveGenre(null); // Clear active genre when searching
  
        console.log('[Search] Searching for:', term);
        const result = await searchAnime(term, 1);
        console.log('[API] Raw search result:', result);
  
        let items = [];
        if (result && typeof result === 'object') {
          if (Array.isArray(result)) {
            items = result;
          } else if (result.results && Array.isArray(result.results)) {
            items = result.results;
          } else if (result.data) {
            // ✅ Look for response inside data
            if (Array.isArray(result.data)) {
              items = result.data;
            } else if (Array.isArray(result.data.response)) {
              items = result.data.response;
            } else if (result.data.results && Array.isArray(result.data.results)) {
              items = result.data.results;
            }
          }
        }
        
  
        console.log('[Search] Total items received from API:', items.length);
  
        // ✅ Filter results by search term
        const filtered = items.filter((anime) => {
          const title = anime.title?.toLowerCase() || '';
          const altTitle = anime.alternativeTitle?.toLowerCase() || '';
          return title.includes(term.toLowerCase()) || altTitle.includes(term.toLowerCase());
        });
  
        console.log(`[Search] Items matching "${term}":`, filtered.length);
  
        // ✅ Sort filtered results
        const sorted = filtered.sort((a, b) =>
          sortOption === 'A-Z'
            ? (a.title || '').localeCompare(b.title || '')
            : (b.title || '').localeCompare(a.title || '')
        );
  
        console.log('[Search] Sorted filtered results:', sorted);
  
        setSearchResults(sorted);
  
        if (sorted.length === 0) {
          setError(`No results found for "${term}"`);
          console.log('[Search] No matches found.');
        }
      } catch (err) {
        console.error('[Search Error]', err);
        setError(`Search failed for "${term}". Please try again.`);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
        console.log('[Search] Search finished.');
      }
    }, 500);
  }, [sortOption]);
  
  

  // Replace handleGenreFilter with filterByGenre
  const filterByGenre = useCallback(
    async (genre) => {
      if (activeGenre === genre) {
        setActiveGenre(null);
        setSearchResults([]);
        setSearchTerm(""); // Clear search term when deselecting genre
        return;
      }

      setActiveGenre(genre);
      setSearchTerm(""); // Clear search term when selecting genre
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetchAnimeList("genre", genre, 1);
        console.log(`🎨 fetchAnimeList("genre", "${genre}") →`, res);

        // Handle different possible API response structures
        let genreFilteredList = [];

        if (res && typeof res === 'object') {
          // Try different possible response structures
          if (Array.isArray(res)) {
            // Direct array response
            genreFilteredList = res;
          } else if (res.results && Array.isArray(res.results)) {
            // Results property contains the array
            genreFilteredList = res.results;
          } else if (res.data) {
            // Data property exists
            if (Array.isArray(res.data)) {
              // Data is directly an array
              genreFilteredList = res.data;
            } else if (res.data.results && Array.isArray(res.data.results)) {
              // Data.results contains the array
              genreFilteredList = res.data.results;
            } else if (res.data.mostPopular && Array.isArray(res.data.mostPopular)) {
              // Data.mostPopular contains the array
              genreFilteredList = res.data.mostPopular;
            } else if (res.data.trending && Array.isArray(res.data.trending)) {
              // Data.trending contains the array
              genreFilteredList = res.data.trending;
            } else if (res.data.spotlight && Array.isArray(res.data.spotlight)) {
              // Data.spotlight contains the array
              genreFilteredList = res.data.spotlight;
            } else {
              // Try to find any array property in data
              const arrayKeys = Object.keys(res.data).filter(key => Array.isArray(res.data[key]));
              if (arrayKeys.length > 0) {
                genreFilteredList = res.data[arrayKeys[0]];
                console.log(`Using ${arrayKeys[0]} for genre results`);
              }
            }
          }
        }

        console.log(`Genre filtered list for "${genre}":`, genreFilteredList);
        setSearchResults(genreFilteredList);

        if (genreFilteredList.length === 0) {
          setError(`No anime found for genre "${genre}". Try a different genre.`);
        }
      } catch (err) {
        console.error("Genre filter error:", err);
        setError(`Failed to filter by genre "${genre}". Please try again.`);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [activeGenre]
  );

  const handleSort = useCallback((e) => {
    const newSort = e.target.value;
    setSortOption(newSort);

    setSearchResults(prev => [...prev].sort((a, b) =>
      newSort === 'A-Z'
        ? (a.title || '').localeCompare(b.title || '')
        : (b.title || '').localeCompare(a.title || '')
    ));
  }, []);

  const toggleFavorite = useCallback((anime) => {
    setFavorites(prev => {
      const isFavorited = prev.find(x => x.id === anime.id);
      return isFavorited
        ? prev.filter(x => x.id !== anime.id)
        : [...prev, anime];
    });
  }, []);

  const openAnimeModal = useCallback(async (anime) => {
    try {
      setIsLoadingModal(true);
      setError(null); // Clear main error when opening modal

      // Fetch details and episodes concurrently
      const [detailsResponse, episodesResponse] = await Promise.all([
        fetchAnimeDetails(anime.id),
        fetchEpisodes(anime.id)
      ]);

      console.log('[API] Anime details response:', detailsResponse);
      console.log('[API] Episodes response:', episodesResponse);

      // Extract details data
      let animeDetails = detailsResponse;
      if (detailsResponse && detailsResponse.data) {
        animeDetails = detailsResponse.data;
      }
      // Ensure basic structure if details are minimal
      animeDetails = animeDetails || {}; // Ensure it's an object

      // Extract episodes data
      let episodeList = [];
      if (episodesResponse && Array.isArray(episodesResponse)) {
        episodeList = episodesResponse;
      } else if (episodesResponse && episodesResponse.data && Array.isArray(episodesResponse.data)) {
        episodeList = episodesResponse.data;
      } else if (episodesResponse && episodesResponse.episodes && Array.isArray(episodesResponse.episodes)) {
        episodeList = episodesResponse.episodes;
      }

      // Combine into a comprehensive anime object for the modal
      const fullAnimeData = {
        ...animeDetails,
        id: animeDetails.id || anime.id, // Ensure ID is present
        title: animeDetails.title || anime.title, // Ensure title is present
        episodes: episodeList,
        poster: animeDetails.poster || anime.poster || anime.image, // Prefer modal-specific poster
      };

      setModalAnime(fullAnimeData);
      setModalEpisode(null); // Always start modal showing episode list
      setShowModal(true);
    } catch (err) {
      console.error('Modal load error:', err);
      // Set modal-specific error, but try to open modal with whatever data available
      setError('Failed to load anime details or episodes. Please try again.');
      setModalAnime(anime); // Show basic anime info if details failed
      setModalEpisode(null);
      setShowModal(true);
    } finally {
      setIsLoadingModal(false);
    }
  }, []);

  const selectEpisode = useCallback(async (episode) => {
    try {
      setIsLoadingModal(true);
      setError(null); // Clear errors specific to episode loading

      // If episode already has a video URL (e.g., passed directly or from cache)
      if (episode.videoUrl || episode.url) {
        setModalEpisode(episode);
        return; // Exit early if URL is already known
      }

      // Proceed to fetch stream data only if a video URL is not already known
      if (modalAnime && (episode.id || episode.episodeNumber)) {
        let streamId;
        // Logic to construct streamId based on your API's expected format
        if (episode.id && typeof episode.id === 'string' && episode.id.includes('ep=')) {
          streamId = episode.id;
        } else {
          const animeId = modalAnime.id || modalAnime.title?.toLowerCase().replace(/\s+/g, '-');
          const episodeIdentifier = episode.episodeNumber || episode.id || '1'; // Fallback to '1'
          streamId = `${animeId}::ep=${episodeIdentifier}`; // Example format
        }

        console.log('[API] Stream ID to fetch:', streamId);

        const streamParams = {
          id: streamId,
          server: 'HD-1', // Default server
          type: 'sub' // Default type
        };

        try {
          const streamData = await fetchStream(streamParams);
          console.log('[API] Stream response:', streamData);

          let videoUrl = null;
          if (streamData) {
            // Check common response structures for the streaming link
            if (streamData.streamingLink) {
              videoUrl = streamData.streamingLink;
            } else if (streamData.link && streamData.link.file) {
              videoUrl = streamData.link.file;
            } else if (streamData.data) {
              if (streamData.data.streamingLink) {
                videoUrl = streamData.data.streamingLink;
              } else if (streamData.data.link && streamData.data.link.file) {
                videoUrl = streamData.data.link.file;
              }
            }
          }

          if (videoUrl) {
            setModalEpisode({ ...episode, videoUrl });
          } else {
            setError('Video not available for this episode. No URL found from API.');
            setModalEpisode(episode); // Set episode data without videoUrl
          }
        } catch (streamError) {
          console.error('[API] Stream fetch error:', streamError);
          setError('Failed to load video stream. Please try again.');
          setModalEpisode(episode);
        }
      } else {
        // Fallback if critical data (modalAnime or episode ID) is missing
        setError('Cannot load episode: Missing anime or episode identifier.');
        setModalEpisode(episode);
      }
    } catch (err) {
      console.error('Episode selection error:', err);
      setError('Failed to process episode selection. Please try again.');
      setModalEpisode(episode);
    } finally {
      setIsLoadingModal(false);
    }
  }, [modalAnime]);

  const loadMore = useCallback((type) => {
    setVisibleCount(prev => ({
      ...prev,
      [type]: prev[type] + 8
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setActiveGenre(null);
    setSearchResults([]);
    setError(null); // Clear search/filter specific errors
  }, []);

  // Re-added Newsletter submission function
  const submitNewsletter = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newsletterEmail.trim()) {
        setError("Email cannot be empty.");
        return;
      }
      setError(null); // Clear previous errors
      try {
        // Here you would typically send newsletterEmail to your backend
        console.log("Subscribing email:", newsletterEmail);
        // Example API call (uncomment and replace with your actual API endpoint)
        // await subscribeNewsletterApi(newsletterEmail);
        alert(`Thank you for subscribing with ${newsletterEmail}!`);
        setNewsletterEmail('');
      } catch (err) {
        console.error("Newsletter subscription error:", err);
        setError("Subscription failed. Please try again.");
      }
    },
    [newsletterEmail]
  );

  // Re-added Review submission function
  const submitReview = useCallback(
    async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.elements[0].value.trim();
      const rating = parseInt(form.elements[1].value, 10);
      const comment = form.elements[2].value.trim();

      if (!name || !rating || !comment || rating < 1 || rating > 5) {
        setError("Please fill all review fields correctly (name, rating 1-5, comment).");
        return;
      }
      setError(null); // Clear previous errors

      try {
        // Here you would typically send review data to your backend
        console.log("Submitting review:", { name, rating, comment });
        // Example API call (uncomment and replace with your actual API endpoint)
        // await postReviewApi({ name, rating, comment });

        const newReview = {
          id: Date.now(), // In real app, use ID from backend
          name,
          rating,
          comment,
          avatar: `https://i.pravatar.cc/150?u=${Date.now()}`, // Placeholder avatar
        };
        setReviews((prev) => [newReview, ...prev]);
        form.reset();
        alert("Review submitted successfully!");
      } catch (err) {
        console.error("Review submission error:", err);
        setError("Failed to submit review. Please try again.");
      }
    },
    []
  );

  // ===== RENDER HELPERS =====
  const renderAnimeCard = (anime) => {
    const isFavorited = favorites.find(x => x.id === anime.id);

    return (
      <AnimeCard key={anime.id} onClick={() => openAnimeModal(anime)}>
        <AnimeImage
          src={anime.poster || anime.image || 'https://via.placeholder.com/220x280'}
          alt={anime.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/220x280';
          }}
        />

        <AnimeOverlay>
          <PlayButton>
            <FaPlay /> Watch Now
          </PlayButton>
        </AnimeOverlay>

        <FavoriteButton
          favorited={isFavorited}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(anime);
          }}
        >
          <FaHeart />
        </FavoriteButton>

        <AnimeDetails>
          <AnimeTitle>{anime.title}</AnimeTitle>
          <AnimeInfo>
            Episodes: {anime.episodes?.eps || anime.episodes?.length || 'N/A'}
          </AnimeInfo>
          {anime.rating && (
            <AnimeRating>
              <FaStar />
              {anime.rating}
            </AnimeRating>
          )}
        </AnimeDetails>
      </AnimeCard>
    );
  };

  const renderSection = (title, data, type = null) => {
    if (!data || data.length === 0) return null;

    const displayData = type ? data.slice(0, visibleCount[type]) : data;

    return (
      <ContentSection key={title}>
        <SectionTitle>
          {title === 'Trending' && <FaFire />}
          {title === 'Most Popular' && <FaStar />}
          {title === 'Latest Episodes' && <FaClock />}
          {title === 'Top Upcoming' && <FaClock />}
          {title}
        </SectionTitle>

        <AnimeGrid>
          {displayData.map(renderAnimeCard)}
        </AnimeGrid>

        {type && data.length > visibleCount[type] && (
          <LoadMoreButton onClick={() => loadMore(type)}>
            Load More {title}
          </LoadMoreButton>
        )}
      </ContentSection>
    );
  };

  const renderSearchResults = () => {
    // Only show search results section if there's a search term or active genre
    if (!searchTerm && !activeGenre && !searchResults.length) return null;

    return (
      <ContentSection>
        <SectionTitle>
          <FaSearch />
          Results {activeGenre && `for ${activeGenre}`}
          {searchTerm && ` for "${searchTerm}"`}
        </SectionTitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {isLoading ? (
          <LoadingSpinner>
            <LoadingSharingan src={sharinganLoader} alt="Loading results..." />
            Loading results...
          </LoadingSpinner>
        ) : searchResults.length > 0 ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </div>
            <AnimeGrid>
              {searchResults.map(renderAnimeCard)}
            </AnimeGrid>
          </>
        ) : !error ? ( // Only show empty state if no error is present (i.e., search found nothing)
          <EmptyState>
            <EmptyStateIcon>🔍</EmptyStateIcon>
            <h3>No results found</h3>
            <p>
              {searchTerm ? `No anime found for "${searchTerm}"` : `No anime found for genre "${activeGenre}"`}
            </p>
          </EmptyState>
        ) : null}
      </ContentSection>
    );
  };

  // ===== MAIN RENDER =====
  // Initial loading spinner for the entire page
  if ((isLoading || minLoading) && !homeData.trending.length && !error) { // Only show full page loader if no initial data and no error yet
    return (
      <Container style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner>
          <LoadingSharingan src={sharinganLoader} alt="Loading the Anime Universe..." />
          Loading the Anime Universe...
        </LoadingSpinner>
      </Container>
    );
  }

  // Global error display if initial data load fails
  if (error && !isLoading && !homeData.trending.length) {
    return (
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
        <ErrorMessage>
          {error}
          <br />
          <button onClick={loadHomeData} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: 'var(--accent)', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>
            Try Again
          </button>
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      {/* Hero Section */}
      <Hero>
      <BackgroundVideo autoPlay muted loop playsInline>
        <source src="./Free-Anime-Background-Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>

      <Overlay />

      <HeroContent>
        <HeroTitle>Welcome to AnimeStream</HeroTitle>
        <HeroSubtitle>
          Discover and stream your favorite anime with high-quality video and an extensive library
        </HeroSubtitle>
        <HeroButton onClick={() => genresRef.current?.scrollIntoView({ behavior: 'smooth' })}>
          <FaPlay /> Start Exploring
        </HeroButton>
      </HeroContent>
    </Hero>

      {/* Search Section */}
      <SearchSection>
        <SearchContainer>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for anime..."
          />
          {(searchTerm || activeGenre) && (
            <ClearButton onClick={clearSearch}>
              <FaTimes /> Clear
            </ClearButton>
          )}
          <SortSelect
            value={sortOption}
            onChange={handleSort}
            disabled={!searchResults.length && (searchTerm || activeGenre)}
          >
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </SortSelect>
        </SearchContainer>
      </SearchSection>

      {/* Genres Section */}
      <GenresSection ref={genresRef}>
        <SectionTitle>
          <FaFilter /> Browse by Genre
        </SectionTitle>
        <GenresContainer>
          {homeData.genres && homeData.genres.length > 0 ? (
            homeData.genres.slice(0, 15).map(genre => (
              <GenreButton
                key={genre}
                active={activeGenre === genre}
                onClick={() => filterByGenre(genre)}
              >
                {genre}
              </GenreButton>
            ))
          ) : isLoading ? (
            <span style={{ color: 'var(--text-secondary)' }}>Loading genres...</span>
          ) : (
            <span style={{ color: 'var(--text-secondary)' }}>No genres available.</span>
          )}
        </GenresContainer>
      </GenresSection>

      {/* Search Results */}
      {renderSearchResults()}

      {/* Featured Section */}
      {homeData.featured.length > 0 && (
        <ContentSection style={{ padding: 0 }}>
          <SectionTitle>
            <FaStar /> Featured Anime
          </SectionTitle>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            style={{ width: '100%', minHeight: '70vh', background: 'black' }}
            slidesPerView={1}
          >
            {homeData.featured.map(anime => (
              <SwiperSlide key={anime.id}>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '70vh',
                    background: `linear-gradient(to right, rgba(20,20,20,0.92) 40%, rgba(20,20,20,0.2)), url(${anime.backgroundImage || anime.poster || anime.image}) center/cover no-repeat`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '5%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'white',
                      maxWidth: 600,
                      zIndex: 2,
                      textAlign: 'left',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'Lobster, cursive', /* Apply Lobster font */
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        color: 'var(--accent)', /* Change to blue (accent color) */
                        textShadow: '3px 3px 0 #000, 0 0 20px #000',
                        letterSpacing: 2,
                        marginBottom: 24,
                        textTransform: 'uppercase',
                        lineHeight: 1.1,
                      }}
                    >
                      {anime.title}
                    </div>
                    {/* Use FeaturedDescription component */}
                    <FeaturedDescription showFull={showFullDescription}>
                      {anime.synopsis || anime.description || 'No description available.'}
                    </FeaturedDescription>
                    {(anime.synopsis && anime.synopsis.split('\n').length > 3) || (anime.description && anime.description.split('\n').length > 3) || (anime.synopsis?.length > 200 || anime.description?.length > 200) ? (
                        <ReadMoreButton onClick={() => setShowFullDescription(prev => !prev)}>
                            {showFullDescription ? 'Read Less' : 'Read More'}
                        </ReadMoreButton>
                    ) : null}
                    <div style={{ display: 'flex', gap: 16, marginTop: '20px' }}> {/* Added marginTop for spacing */}
                      <button
                        style={{
                          background: '#ff6600',
                          color: 'white',
                          padding: '1rem 2.2rem',
                          border: 'none',
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          marginRight: 16,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                          cursor: 'pointer',
                        }}
                        onClick={() => openAnimeModal(anime)}
                      >
                        <FaPlay style={{ fontSize: 20 }} /> Up Next
                      </button>
                      <button
                        style={{
                          background: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          padding: '1rem 2rem',
                          border: 'none',
                          borderRadius: 8,
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleFavorite(anime)}
                      >
                        <FaHeart style={{ color: favorites.find(x => x.id === anime.id) ? '#ff4757' : 'white', fontSize: 20 }} />
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ContentSection>
      )}

      {/* Content Sections */}
      {renderSection('Trending', homeData.trending)}
      {renderSection('Most Popular', homeData.popular, 'popular')}
      {renderSection('Latest Episodes', homeData.recent, 'recent')}
      {renderSection('Top Upcoming', homeData.upcoming)}

      {/* Reviews Section - Re-added */}
      <ReviewsSection>
        <SectionTitle>User Reviews</SectionTitle>
        <ReviewGrid>
          {reviews.map((r) => (
            <ReviewCard key={r.id}>
              <ReviewerAvatar
                src={r.avatar || "https://i.pravatar.cc/150"}
                alt={r.name}
              />
              <ReviewerName>{r.name || "Anonymous"}</ReviewerName>
              <ReviewRating>
                {"★".repeat(r.rating || 5)}
                {"☆".repeat(5 - (r.rating || 5))}
              </ReviewRating>
              <ReviewComment>
                {r.comment || "No comment provided."}
              </ReviewComment>
            </ReviewCard>
          ))}
        </ReviewGrid>
        <ReviewForm onSubmit={submitReview}>
          <h4>Add Your Review</h4>
          <FormInput type="text" placeholder="Your Name" required />
          <FormInput
            type="number"
            placeholder="Rating (1-5)"
            min="1"
            max="5"
            required
          />
          <FormTextarea rows="3" placeholder="Your review..." required />
          <FormButton type="submit">Submit Review</FormButton>
        </ReviewForm>
      </ReviewsSection>

      {/* Newsletter Section - Re-added */}
      <NewsletterSection>
        <NewsletterTitle>Subscribe to our Newsletter</NewsletterTitle>
        <NewsletterForm onSubmit={submitNewsletter}>
          <NewsletterInput
            type="email"
            placeholder="Your email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            required
          />
          <NewsletterButton type="submit">Subscribe</NewsletterButton>
        </NewsletterForm>
      </NewsletterSection>

      {/* Footer */}
      <Footer>© {new Date().getFullYear()} AnimeStream</Footer>

      {/* Modal */}
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>

            {isLoadingModal ? (
              <LoadingSpinner>
                <LoadingSharingan src={sharinganLoader} alt="Loading video..." />
                Loading episode...
              </LoadingSpinner>
            ) : modalAnime ? (
              <>
                <ModalHeader>
                  <ModalImage
                    src={modalAnime.poster || modalAnime.image || 'https://via.placeholder.com/180x240'}
                    alt={modalAnime.title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/180x240';
                    }}
                  />
                  <ModalInfo>
                    <ModalTitle>{modalAnime.title}</ModalTitle>
                    <ModalMeta>
                      {modalAnime.status && <MetaItem>{modalAnime.status}</MetaItem>}
                      {modalAnime.type && <MetaItem>{modalAnime.type}</MetaItem>}
                      {modalAnime.episodes?.length && <MetaItem>{modalAnime.episodes.length} Episodes</MetaItem>}
                      {modalAnime.duration && <MetaItem>{modalAnime.duration}</MetaItem>}
                    </ModalMeta>
                    <ModalGenres>
                      {modalAnime.genres?.map((genre, index) => (
                        <GenreTag key={index}>{genre}</GenreTag>
                      ))}
                    </ModalGenres>
                    <ModalDescription>
                      {modalAnime.description || modalAnime.synopsis || 'No description available.'}
                    </ModalDescription>
                  </ModalInfo>
                </ModalHeader>

                {!modalEpisode ? (
                  <EpisodesSection>
                    <SectionTitle>Episodes ({modalAnime.episodes?.length || 0})</SectionTitle>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {modalAnime.episodes?.length ? (
                      <EpisodesGrid>
                        {modalAnime.episodes.map((ep, index) => (
                          <EpisodeCard key={ep.id || index} onClick={() => selectEpisode(ep)}>
                            <EpisodeTitle>Episode {ep.episodeNumber || index + 1}</EpisodeTitle>
                            <EpisodeInfo>{ep.title || `Episode ${ep.episodeNumber || index + 1}`}</EpisodeInfo>
                          </EpisodeCard>
                        ))}
                      </EpisodesGrid>
                    ) : (
                      <EmptyState>
                        <EmptyStateIcon>📺</EmptyStateIcon>
                        <h3>No episodes available</h3>
                        <p>Episodes will be added when they become available</p>
                      </EmptyState>
                    )}
                  </EpisodesSection>
                ) : (
                  <VideoPlayer>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3 style={{ margin: 0, color: 'var(--accent)' }}>
                        Episode {modalEpisode.episodeNumber}: {modalEpisode.title || `Episode ${modalEpisode.episodeNumber}`}
                      </h3>
                      <button
                        onClick={() => setModalEpisode(null)}
                        style={{
                          background: 'var(--accent)',
                          color: 'var(--bg-primary)',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Back to Episodes
                      </button>
                    </div>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    {modalEpisode.videoUrl ? (
                      <VideoContainer>
                        {/* Check for specific domains for iframe, otherwise use video tag */}
                        {modalEpisode.videoUrl.includes('megaplay.buzz') || modalEpisode.videoUrl.includes('player.vimeo') || modalEpisode.videoUrl.includes('youtube.com/embed') ? (
                          <VideoIframe
                            src={modalEpisode.videoUrl}
                            title={`${modalAnime.title} Ep ${modalEpisode.episodeNumber}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <VideoElement controls>
                            <source src={modalEpisode.videoUrl} type="application/x-mpegURL" />
                            <source src={modalEpisode.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </VideoElement>
                        )}
                      </VideoContainer>
                    ) : (
                      <EmptyState>
                        <EmptyStateIcon>🎬</EmptyStateIcon>
                        <h3>Video not available</h3>
                        <p>This episode's video is not currently available.</p>
                      </EmptyState>
                    )}
                  </VideoPlayer>
                )}
              </>
            ) : (
              <EmptyState>
                <EmptyStateIcon>❌</EmptyStateIcon>
                <h3>Failed to load anime details</h3>
                <p>Please try again later</p>
              </EmptyState>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}