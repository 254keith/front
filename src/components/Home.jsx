// src/components/Home.jsx
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import {
//   fetchHome,
//   fetchGenres,
//   fetchAnimeList,
//   fetchAnimeDetails,
//   searchAnime,          // 👈 imported for search
// } from "../api";
// import {
//   FaPlay,
//   FaFire,
//   FaClock,
//   FaFilter,
//   FaStar,
//   FaHeart,
// } from "react-icons/fa";

// // ───── Styled Components ───────────────────────────────────────────────────────
// const HomeContainer = styled.div`
//   padding-left: 6rem;
//   background: var(--bg-primary);
//   color: var(--text-primary);
//   min-height: 100vh;
// `;
// const HeroSection = styled.section`
//   background: linear-gradient(
//       to right,
//       rgba(15, 23, 42, 0.9),
//       rgba(15, 23, 42, 0.7)
//     ),
//     url("https://tse3.mm.bing.net/th?id=OIP.DUJS_mRADqQPu41QV1dbCwHaEK&pid=Api&P=0&h=220")
//       no-repeat center/cover;
//   height: 60vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   padding:2rem;
// `;
// const HeroContent = styled.div`
// max-width: 800px;
// `;
// const HeroTitle = styled.h1`
//   font-size: 3rem;
//   margin-bottom: 1rem;
//   color: var(--accent);
//   text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
// `;
// const HeroDescription = styled.p`
//   font-size: 1.2rem;
//   color: var(--text-secondary);
//   margin-bottom: 2rem;
// `;
// const HeroButton = styled.button`
//   background: var(--accent);
//   color: var(--bg-primary);
//   border: none;
//   padding: 0.8rem 2rem;
//   font-size: 1rem;
//   border-radius: 12px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   transition: all var(--transition-speed) ease;
//   &:hover {
//     background: var(--primary);
//     transform: scale(1.05);
//   }
// `;
// const SearchContainer = styled.section`
//   padding: 2rem;
//   text-align: center;
// `;
// const SearchInput = styled.input`
//   padding: 0.5rem 1rem;
//   border: 1px solid var(--accent);
//   border-radius: 12px;
//   min-width: 300px;
//   margin-right: 0.5rem;
// `;
// const SortSelect = styled.select`
//   padding: 0.5rem 1rem;
//   border: 1px solid var(--accent);
//   border-radius: 12px;
//   margin-left: 0.5rem;
// `;
// const SectionTitle = styled.h2`
//   font-size: 2rem;
//   margin: 2rem 0 1rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0 2rem;
// `;
// const AnimeGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   gap: 1.5rem;
//   padding: 0 2rem;
// `;
// const AnimeCard = styled.div`
//   position: relative;
//   background: var(--bg-secondary);
//   border-radius: 12px;
//   overflow: hidden;
//   cursor: pointer;
//   transition: all var(--transition-speed) ease;
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
//   }
// `;
// const AnimeImage = styled.img`
//   width: 100%;
//   height: 250px;
//   object-fit: cover;
// `;
// const AnimeDetails = styled.div`padding: 1rem;`;
// const AnimeTitle = styled.h3`
//   font-size: 1.1rem;
//   margin-bottom: 0.5rem;
// `;
// const AnimeEpisode = styled.p`
//   font-size: 0.9rem;
//   color: var(--text-secondary);
// `;
// const WatchButton = styled.button`
//   background: var(--primary);
//   color: var(--bg-primary);
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 12px;
//   cursor: pointer;
//   margin-top: 0.5rem;
//   transition: all var(--transition-speed) ease;
//   &:hover {
//     background: var(--accent);
//     transform: scale(1.05);
//   }
// `;
// const FavoriteButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: transparent;
//   border: none;
//   font-size: 1.5rem;
//   color: ${(props) => (props.favorited ? "red" : "white")};
//   z-index: 2;
//   cursor: pointer;
// `;
// const LoadMoreButton = styled.button`
//   background: var(--accent);
//   color: var(--bg-primary);
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 12px;
//   cursor: pointer;
//   margin: 1rem auto;
//   display: block;
//   transition: all var(--transition-speed) ease;
//   &:hover {
//     background: var(--primary);
//     transform: scale(1.05);
//   }
// `;
// const FeaturedSection = styled.section`
//   background: var(--bg-secondary);
//   padding: 2rem;
//   margin: 2rem;
//   border-radius: 12px;
//   text-align: center;
// `;
// const FeaturedCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   max-width: 800px;
// `;
// const FeaturedImage = styled.img`
//   width: 100%;
//   border-radius: 12px;
//   margin-bottom: 1rem;
// `;
// const FeaturedDetails = styled.div`text-align: left;`;
// const FeaturedDescription = styled.p`
//   font-size: 1rem;
//   color: var(--text-secondary);
// `;
// const UpcomingSection = styled.section`padding: 2rem 0;`;
// const ReviewsSection = styled.section`
//   padding: 2rem;
//   margin: 2rem;
//   background: var(--bg-secondary);
//   border-radius: 12px;
// `;
// const ReviewGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 1.5rem;
// `;
// const ReviewCard = styled.div`
//   background: var(--bg-primary);
//   padding: 1rem;
//   border-radius: 12px;
//   text-align: center;
//   box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
// `;
// const ReviewerAvatar = styled.img`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   margin-bottom: 0.5rem;
// `;
// const ReviewerName = styled.h4`
//   font-size: 1rem;
//   margin-bottom: 0.5rem;
// `;
// const ReviewRating = styled.p`
//   font-size: 0.9rem;
//   color: var(--accent);
//   margin-bottom: 0.5rem;
// `;
// const ReviewComment = styled.p`
//   font-size: 0.85rem;
//   color: var(--text-secondary);
// `;
// const ReviewForm = styled.form`
//   margin-top: 2rem;
//   padding: 0 2rem;
//   text-align: left;
// `;
// const FormInput = styled.input`
//   padding: 0.5rem;
//   width: 100%;
//   margin-bottom: 0.5rem;
//   border: 1px solid var(--accent);
//   border-radius: 12px;
// `;
// const FormTextarea = styled.textarea`
//   padding: 0.5rem;
//   width: 100%;
//   margin-bottom: 0.5rem;
//   border: 1px solid var(--accent);
//   border-radius: 12px;
// `;
// const FormButton = styled.button`
//   background: var(--accent);
//   color: var(--bg-primary);
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 12px;
//   cursor: pointer;
//   transition: all var(--transition-speed) ease;
//   &:hover {
//     background: var(--primary);
//     transform: scale(1.05);
//   }
// `;
// const NewsletterSection = styled.section`
//   background: var(--bg-secondary);
//   padding: 2rem;
//   margin: 2rem;
//   border-radius: 12px;
//   text-align: center;
// `;
// const NewsletterTitle = styled.h3`
//   font-size: 1.5rem;
//   margin-bottom: 1rem;
// `;
// const NewsletterForm = styled.form`
//   display: flex;
//   justify-content: center;
//   gap: 0.5rem;
//   flex-wrap: wrap;
// `;
// const NewsletterInput = styled.input`
//   padding: 0.5rem 1rem;
//   border: 1px solid var(--accent);
//   border-radius: 12px;
//   min-width: 250px;
// `;
// const NewsletterButton = styled.button`
//   background: var(--accent);
//   color: var(--bg-primary);
//   border: none;
//   padding: 0.5rem 1.5rem;
//   border-radius: 12px;
//   cursor: pointer;
//   transition: all var(--transition-speed) ease;
//   &:hover {
//     background: var(--primary);
//     transform: scale(1.05);
//   }
// `;
// const Footer = styled.footer`
//   background: var(--bg-secondary);
//   color: var(--text-secondary);
//   text-align: center;
//   padding: 2rem;
//   margin-top: 2rem;
//   font-size: 0.9rem;
// `;
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.7);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 100;
// `;
// const ModalContent = styled.div`
//   background: var(--bg-secondary);
//   padding: 2rem;
//   border-radius: 12px;
//   width: 90%;
//   max-width: 800px;
//   position: relative;
// `;
// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: transparent;
//   border: none;
//   font-size: 1.5rem;
//   cursor: pointer;
// `;

// // ───── Home Component ────────────────────────────────────────────────────────
// export default function Home() {
//   const [trending, setTrending] = useState([]);
//   const [popular, setPopular] = useState([]);
//   const [upcoming, setUpcoming] = useState([]);
//   const [recent, setRecent] = useState([]);
//   const [featured, setFeatured] = useState([]);
//   const [genres, setGenres] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("A-Z");
//   const [activeGenre, setActiveGenre] = useState(null);
//   const [searchResults, setSearchResults] = useState([]);
//   const [popularVisible, setPopularVisible] = useState(8);
//   const [recentVisible, setRecentVisible] = useState(8);
//   const [modalAnime, setModalAnime] = useState(null);
//   const [modalEpisode, setModalEpisode] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [newsletterEmail, setNewsletterEmail] = useState("");

//   useEffect(() => {
//     async function load() {
//       const home = await fetchHome();
//       setTrending(home.trending || []);
//       setPopular(home.popular || []);
//       setUpcoming(home.upcoming || []);
//       setRecent(home.recent || []);
//       // use top10.today as featured
//       setFeatured(home.top10?.today || []);
//       setReviews(home.reviews || []);
//       const genresData = await fetchGenres();
//       setGenres(Array.isArray(genresData.data) ? genresData.data : []);
//     }
//     load();
//   }, []);

//   const handleSearch = async (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     if (term) {
//       const res = await searchAnime(term, 1);
//       setSearchResults(res.results || res.data?.results || res.data || []);
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleSort = (e) => {
//     const v = e.target.value;
//     setSortOption(v);
//     setSearchResults((prev) =>
//       [...prev].sort((a, b) =>
//         v === "A-Z"
//           ? a.title.localeCompare(b.title)
//           : b.title.localeCompare(a.title)
//       )
//     );
//   };

//   const filterByGenre = async (g) => {
//     setActiveGenre(g);
//     const res = await fetchAnimeList("genre", g, 1);
//     setSearchResults(res.results || res.data?.results || res.data || []);
//   };

//   const toggleFav = (a) => {
//     setFavorites((f) =>
//       f.find((x) => x.id === a.id) ? f.filter((x) => x.id !== a.id) : [...f, a]
//     );
//   };

//   const openModal = async (a) => {
//     const details = await fetchAnimeDetails(a.id);
//     setModalAnime(details);
//     setModalEpisode(null);
//     setShowModal(true);
//   };

//   const loadMore = (type) => {
//     if (type === "popular") setPopularVisible((p) => p + 8);
//     else setRecentVisible((r) => r + 8);
//   };

//   const submitNewsletter = (e) => {
//     e.preventDefault();
//     alert(`Subscribed: ${newsletterEmail}`);
//     setNewsletterEmail("");
//   };

//   const submitReview = (e) => {
//     e.preventDefault();
//     alert("Review submitted!");
//   };

//   const displayList = searchTerm || activeGenre ? searchResults : null;

//   return (
//     <HomeContainer>
//       {/* Hero */}
//       <HeroSection>
//         <HeroContent>
//           <HeroTitle>Welcome to AnimeStream</HeroTitle>
//           <HeroDescription>
//             Stream classics and new releases, anytime.
//           </HeroDescription>
//           <HeroButton>
//             <FaPlay /> Start Watching
//           </HeroButton>
//         </HeroContent>
//       </HeroSection>

//       {/* Search & Sort */}
//       <SearchContainer>
//         <SearchInput
//           value={searchTerm}
//           onChange={handleSearch}
//           placeholder="Search for anime..."
//         />
//         <label htmlFor="sort">Sort:</label>
//         <SortSelect id="sort" value={sortOption} onChange={handleSort}>
//           <option value="A-Z">A–Z</option>
//           <option value="Z-A">Z–A</option>
//         </SortSelect>
//       </SearchContainer>

//       {/* Genres */}
//       <SectionTitle>
//         <FaFilter /> Genres
//       </SectionTitle>
//       <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
//         {genres.map((g) => (
//           <button
//             key={g}
//             onClick={() => filterByGenre(g)}
//             style={{
//               background:
//                 activeGenre === g ? "var(--accent)" : "rgba(6,182,212,0.1)",
//               color: activeGenre === g ? "var(--bg-primary)" : "var(--accent)",
//               border: "1px solid var(--accent)",
//               borderRadius: "12px",
//               padding: "0.5rem 1rem",
//               cursor: "pointer",
//             }}
//           >
//             {g}
//           </button>
//         ))}
//       </div>

//       {/* Search/Filter Results */}
//       {displayList && (
//         <>
//           <SectionTitle>Results</SectionTitle>
//           {displayList.length ? (
//             <AnimeGrid>
//               {displayList.map((a) => (
//                 <AnimeCard key={a.id} onClick={() => openModal(a)}>
//                   <FavoriteButton
//                     favorited={!!favorites.find((x) => x.id === a.id)}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleFav(a);
//                     }}
//                   >
//                     <FaHeart />
//                   </FavoriteButton>
//                   <AnimeImage src={a.image} alt={a.title} />
//                   <AnimeDetails>
//                     <AnimeTitle>{a.title}</AnimeTitle>
//                     <AnimeEpisode>
//                       Episodes: {a.episodes?.length ?? "N/A"}
//                     </AnimeEpisode>
//                   </AnimeDetails>
//                 </AnimeCard>
//               ))}
//             </AnimeGrid>
//           ) : (
//             <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
//               No results found.
//             </p>
//           )}
//         </>
//       )}

//       {/* Featured Carousel */}
//       <FeaturedSection>
//         <SectionTitle>
//           <FaStar /> Featured Anime
//         </SectionTitle>
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 4000 }}
//           loop
//         >
//           {featured.map((a) => (
//             <SwiperSlide key={a.id}>
//               <FeaturedCard onClick={() => openModal(a)}>
//                 <FeaturedImage src={a.image} alt={a.title} />
//                 <FeaturedDetails>
//                   <AnimeTitle>{a.title}</AnimeTitle>
//                   <FeaturedDescription>{a.description}</FeaturedDescription>
//                   <p>
//                     <strong>Release:</strong> {a.releaseDate}
//                   </p>
//                   <WatchButton onClick={() => openModal(a)}>
//                     Watch Now
//                   </WatchButton>
//                 </FeaturedDetails>
//               </FeaturedCard>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </FeaturedSection>

//       {/* Trending */}
//       <SectionTitle>
//         <FaStar /> Trending Anime
//       </SectionTitle>
//       <AnimeGrid>
//         {trending.map((a) => (
//           <AnimeCard key={a.id} onClick={() => openModal(a)}>
//             <FavoriteButton
//               favorited={!!favorites.find((x) => x.id === a.id)}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleFav(a);
//               }}
//             >
//               <FaHeart />
//             </FavoriteButton>
//             <AnimeImage src={a.image} alt={a.title} />
//             <AnimeDetails>
//               <AnimeTitle>{a.title}</AnimeTitle>
//               <AnimeEpisode>
//                 Episodes: {a.episodes?.length ?? "N/A"}
//               </AnimeEpisode>
//             </AnimeDetails>
//           </AnimeCard>
//         ))}
//       </AnimeGrid>

//       {/* Popular */}
//       <SectionTitle>
//         <FaFire /> Popular Anime
//       </SectionTitle>
//       <AnimeGrid>
//         {popular.slice(0, popularVisible).map((a) => (
//           <AnimeCard key={a.id} onClick={() => openModal(a)}>
//             <FavoriteButton
//               favorited={!!favorites.find((x) => x.id === a.id)}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleFav(a);
//               }}
//             >
//               <FaHeart />
//             </FavoriteButton>
//             <AnimeImage src={a.image} alt={a.title} />
//             <AnimeDetails>
//               <AnimeTitle>{a.title}</AnimeTitle>
//               <AnimeEpisode>
//                 Episodes: {a.episodes?.length ?? "N/A"}
//               </AnimeEpisode>
//             </AnimeDetails>
//           </AnimeCard>
//         ))}
//       </AnimeGrid>
//       {popular.length > popularVisible && (
//         <LoadMoreButton onClick={() => loadMore("popular")}>
//           Load More
//         </LoadMoreButton>
//       )}

//       {/* Recently Updated */}
//       <SectionTitle>
//         <FaClock /> Recently Updated
//       </SectionTitle>
//       <AnimeGrid>
//         {recent.slice(0, recentVisible).map((a) => (
//           <AnimeCard key={a.id} onClick={() => openModal(a)}>
//             <FavoriteButton
//               favorited={!!favorites.find((x) => x.id === a.id)}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleFav(a);
//               }}
//             >
//               <FaHeart />
//             </FavoriteButton>
//             <AnimeImage src={a.image} alt={a.title} />
//             <AnimeDetails>
//               <AnimeTitle>{a.title}</AnimeTitle>
//               <AnimeEpisode>
//                 Episodes: {a.episodes?.length ?? "N/A"}
//               </AnimeEpisode>
//             </AnimeDetails>
//           </AnimeCard>
//         ))}
//       </AnimeGrid>
//       {recent.length > recentVisible && (
//         <LoadMoreButton onClick={() => loadMore("recent")}>
//           Load More
//         </LoadMoreButton>
//       )}

//       {/* Upcoming */}
//       <UpcomingSection>
//         <SectionTitle>
//           <FaClock /> Upcoming Anime
//         </SectionTitle>
//         <AnimeGrid>
//           {upcoming.map((a) => (
//             <AnimeCard key={a.id} onClick={() => openModal(a)}>
//               <FavoriteButton
//                 favorited={!!favorites.find((x) => x.id === a.id)}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleFav(a);
//                 }}
//               >
//                 <FaHeart />
//               </FavoriteButton>
//               <AnimeImage src={a.image} alt={a.title} />
//               <AnimeDetails>
//                 <AnimeTitle>{a.title}</AnimeTitle>
//                 <AnimeEpisode>Episodes: {a.episodes?.length ?? "N/A"}</AnimeEpisode>
//               </AnimeDetails>
//             </AnimeCard>
//           ))}
//         </AnimeGrid>
//       </UpcomingSection>

//       {/* Reviews */}
//       <ReviewsSection>
//         <SectionTitle>User Reviews</SectionTitle>
//         <ReviewGrid>
//           {reviews.map((r) => (
//             <ReviewCard key={r.id}>
//               <ReviewerAvatar src={r.avatar} alt={r.name} />
//               <ReviewerName>{r.name}</ReviewerName>
//               <ReviewRating>{"★".repeat(r.rating)}</ReviewRating>
//               <ReviewComment>{r.comment}</ReviewComment>
//             </ReviewCard>
//           ))}
//         </ReviewGrid>
//         <ReviewForm onSubmit={submitReview}>
//           <FormInput type="text" placeholder="Your Name" required />
//           <FormInput type="number" placeholder="Rating (1-5)" min="1" max="5" required />
//           <FormTextarea rows="3" placeholder="Your review..." required />
//           <FormButton type="submit">Submit Review</FormButton>
//         </ReviewForm>
//       </ReviewsSection>

//       {/* Newsletter */}
//       <NewsletterSection>
//         <NewsletterTitle>Subscribe to our Newsletter</NewsletterTitle>
//         <NewsletterForm onSubmit={submitNewsletter}>
//           <NewsletterInput
//             type="email"
//             placeholder="Your email"
//             value={newsletterEmail}
//             onChange={(e) => setNewsletterEmail(e.target.value)}
//             required
//           />
//           <NewsletterButton type="submit">Subscribe</NewsletterButton>
//         </NewsletterForm>
//       </NewsletterSection>

//       {/* Footer */}
//       <Footer>&copy; {new Date().getFullYear()} AnimeStream</Footer>

//       {/* Modal */}
//       {showModal && modalAnime && (
//         <ModalOverlay onClick={() => setShowModal(false)}>
//           <ModalContent onClick={(e) => e.stopPropagation()}>
//             <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
//             <h2>{modalAnime.title}</h2>
//             <p>{modalAnime.description}</p>
//             {!modalEpisode &&
//               modalAnime.episodes?.map((ep) => (
//                 <div
//                   key={ep.id}
//                   style={{ padding: "0.5rem", cursor: "pointer" }}
//                   onClick={() => setModalEpisode(ep)}
//                 >
//                   Episode {ep.episodeNumber}: {ep.title}
//                 </div>
//               ))}
//             {modalEpisode && modalEpisode.videoUrl && (
//               <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
//                 <iframe
//                   src={modalEpisode.videoUrl}
//                   title={`${modalAnime.title} Ep ${modalEpisode.episodeNumber}`}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                   style={{ position: "absolute", width: "100%", height: "100%", border: 0 }}
//                 />
//               </div>
//             )}
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </HomeContainer>
//   );
// }
// src/components/Home.jsx
// frontend/src/components/Home.jsx
// src/components/Home.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  fetchHome,
  fetchGenres,
  fetchAnimeList,
  fetchAnimeDetails,
  fetchEpisodes,
  fetchStream,
  searchAnime,
} from "../api";
import {
  FaPlay,
  FaFire,
  FaClock,
  FaFilter,
  FaStar,
  FaHeart,
} from "react-icons/fa";

// ───── Styled Components (No Changes - using your provided code) ────────────────
const HomeContainer = styled.div`
  padding-left: 6rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(
      to right,
      rgba(15, 23, 42, 0.9),
      rgba(15, 23, 42, 0.7)
    ),
    url("https://tse3.mm.bing.net/th?id=OIP.DUJS_mRADqQPu41QV1dbCwHaEK&pid=Api&P=0&h=220")
      no-repeat center/cover;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--accent);
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const HeroButton = styled.button`
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-speed) ease;
  &:hover {
    background: var(--primary);
    transform: scale(1.05);
  }
`;

const SearchContainer = styled.section`
  padding: 2rem;
  text-align: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid var(--accent);
  border-radius: 12px;
  min-width: 300px;
  margin-right: 0.5rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid var(--accent);
  border-radius: 12px;
  margin-left: 0.5rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 2rem;
`;

const AnimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem;
`;

const AnimeCard = styled.div`
  position: relative;
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const AnimeImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const AnimeDetails = styled.div`
  padding: 1rem;
`;

const AnimeTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AnimeEpisode = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const WatchButton = styled.button`
  background: var(--primary);
  color: var(--bg-primary);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all var(--transition-speed) ease;
  &:hover {
    background: var(--accent);
    transform: scale(1.05);
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  font-size: 1.5rem;
  color: ${(props) => (props.favorited ? "red" : "white")};
  z-index: 2;
  cursor: pointer;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadMoreButton = styled.button`
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  margin: 2rem auto;
  display: block;
  transition: all var(--transition-speed) ease;
  &:hover {
    background: var(--primary);
    transform: scale(1.05);
  }
`;

const FeaturedSection = styled.section`
  background: var(--bg-secondary);
  padding: 2rem;
  margin: 2rem;
  border-radius: 12px;
  text-align: center;
`;

const FeaturedCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const FeaturedImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const FeaturedDetails = styled.div`
  text-align: left;
  width: 100%;
`;

const FeaturedDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const UpcomingSection = styled.section`
  padding: 2rem 0;
`;

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
  background: var(--bg-secondary);
  padding: 2rem;
  margin: 2rem;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;
const modalModalEpisode = styled.div`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-primary);
`;

const GenreFilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0 2rem;
  margin-bottom: 1rem;
`;

const GenreButton = styled.button`
  background: ${(props) =>
    props.active ? "var(--accent)" : "rgba(6,182,212,0.1)"};
  color: ${(props) => (props.active ? "var(--bg-primary)" : "var(--accent)")};
  border: 1px solid var(--accent);
  border-radius: 12px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  &:hover {
    background: var(--accent);
    color: var(--bg-primary);
  }
`;

// ───── Home Component ─────────────────────────────────────────────────────────
export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [recent, setRecent] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [genres, setGenres] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("A-Z");
  const [activeGenre, setActiveGenre] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [popularVisible, setPopularVisible] = useState(8);
  const [recentVisible, setRecentVisible] = useState(8);
  const [modalAnime, setModalAnime] = useState(null);
  const [modalEpisode, setModalEpisode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // For debouncing search
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchHome();
        console.log("[API] fetchHome →", response);
        // Ensure response.data is used if the API wraps it, otherwise use response directly
        const home = response.data || response;

        setTrending(home.trending || []);
        setPopular(home.mostPopular || []);
        setUpcoming(home.topUpcoming || []);
        setRecent(home.latestEpisode || []);
        setFeatured(home.spotlight || home.top10?.today || []);
        setReviews(home.reviews || []);
        setGenres(home.genres || []);

        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem("animeFavorites");
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (err) {
        console.error("Failed to load home data:", err);
        setError("Failed to load data. Please try again later. (Check backend logs for CORS!)");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Save favorites to localStorage whenever they change
    localStorage.setItem("animeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = useCallback(
    (e) => {
      const term = e.target.value;
      setSearchTerm(term);

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(async () => {
        if (!term) {
          setSearchResults([]);
          setActiveGenre(null);
          setError(null);
          return;
        }

        try {
          setIsLoading(true);
          setError(null);
          setActiveGenre(null); // Clear active genre when searching
          const result = await searchAnime(term, 1);
          console.log(`🔎 searchAnime("${term}") →`, result);
          
          // Handle different possible response structures
          let items = [];
          if (result && typeof result === 'object') {
            if (Array.isArray(result)) {
              items = result;
            } else if (result.results && Array.isArray(result.results)) {
              items = result.results;
            } else if (result.data) {
              if (Array.isArray(result.data)) {
                items = result.data;
              } else if (result.data.results && Array.isArray(result.data.results)) {
                items = result.data.results;
              }
            }
          }
          
          const sorted = items.sort((a, b) =>
            sortOption === "A-Z"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title)
          );
          setSearchResults(sorted);
          
          if (sorted.length === 0) {
            setError(`No results found for "${term}". Try a different search term.`);
          }
        } catch (err) {
          console.error("Search error:", err);
          setError(`Search failed for "${term}". Please try again.`);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 500);
    },
    [sortOption]
  );

  const handleSort = useCallback((e) => {
    setSortOption(e.target.value);
    setSearchResults(prev => [...prev].sort((a, b) =>
        e.target.value === "A-Z"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
    ));
  }, []);

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

  const toggleFav = useCallback(
    (anime) => {
      setFavorites((prev) => {
        const isFavorited = prev.find((x) => x.id === anime.id);
        const newFavorites = isFavorited
          ? prev.filter((x) => x.id !== anime.id)
          : [...prev, anime];
        return newFavorites;
      });
    },
    []
  );

  const openModal = useCallback(
    async (anime) => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch both anime details and episodes
        const [details, episodes] = await Promise.all([
          fetchAnimeDetails(anime.id),
          fetchEpisodes(anime.id)
        ]);
        
        console.log("[API] fetchAnimeDetails →", details);
        console.log("[API] fetchEpisodes →", episodes);
        
        // Handle different response structures for details
        let animeDetails = details;
        if (details && details.data) {
          animeDetails = details.data;
        }
        
        // Handle different response structures for episodes
        let episodeList = [];
        if (episodes && Array.isArray(episodes)) {
          episodeList = episodes;
        } else if (episodes && episodes.data && Array.isArray(episodes.data)) {
          episodeList = episodes.data;
        } else if (episodes && episodes.episodes && Array.isArray(episodes.episodes)) {
          episodeList = episodes.episodes;
        }
        
        // Combine the data
        const fullAnimeData = {
          ...animeDetails,
          episodes: episodeList
        };
        
        console.log("[API] Combined anime data →", fullAnimeData);
        setModalAnime(fullAnimeData);
        setModalEpisode(null);
        setShowModal(true);
      } catch (err) {
        console.error("Modal load error:", err);
        setError("Failed to load anime details. Please try again.");
        // Still show the modal with basic info from the card
        setModalAnime(anime);
        setModalEpisode(null);
        setShowModal(true);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const selectEpisode = useCallback(
    async (episode) => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log("[API] Selecting episode →", episode);
        
        // Check if episode already has a video URL
        if (episode.videoUrl || episode.url) {
          setModalEpisode(episode);
          return;
        }
        
        // Fetch video URL using fetchStream API
        if (modalAnime && episode.id) {
          // Try different parameter combinations
          const streamParams = {
            animeId: modalAnime.id,
            episodeId: episode.id,
            episodeNumber: episode.episodeNumber || episode.number
          };
          
          console.log("[API] fetchStream params →", streamParams);
          let streamData = null;
          
          try {
            streamData = await fetchStream(streamParams);
            console.log("[API] fetchStream response →", streamData);
          } catch (err) {
            console.log("[API] First fetchStream attempt failed, trying alternative params");
            // Try alternative parameter names
            const altParams = {
              anime_id: modalAnime.id,
              episode_id: episode.id,
              episode_number: episode.episodeNumber || episode.number
            };
            try {
              streamData = await fetchStream(altParams);
              console.log("[API] fetchStream alt response →", streamData);
            } catch (altErr) {
              console.log("[API] Alternative fetchStream also failed");
              throw altErr;
            }
          }
          
          // Handle different response structures for stream data
          let videoUrl = null;
          console.log("[DEBUG] Stream data structure:", streamData);
          
          if (streamData && streamData.url) {
            videoUrl = streamData.url;
            console.log("[DEBUG] Found videoUrl in streamData.url:", videoUrl);
          } else if (streamData && streamData.data && streamData.data.url) {
            videoUrl = streamData.data.url;
            console.log("[DEBUG] Found videoUrl in streamData.data.url:", videoUrl);
          } else if (streamData && streamData.videoUrl) {
            videoUrl = streamData.videoUrl;
            console.log("[DEBUG] Found videoUrl in streamData.videoUrl:", videoUrl);
          } else if (streamData && streamData.sources && streamData.sources.length > 0) {
            videoUrl = streamData.sources[0].url;
            console.log("[DEBUG] Found videoUrl in streamData.sources[0].url:", videoUrl);
          } else {
            console.log("[DEBUG] No videoUrl found in streamData. Available keys:", Object.keys(streamData || {}));
          }
          
          if (videoUrl) {
            const episodeWithVideo = {
              ...episode,
              videoUrl: videoUrl
            };
            setModalEpisode(episodeWithVideo);
          } else {
            setError("Video URL not found for this episode.");
            setModalEpisode(episode);
          }
        } else {
          setModalEpisode(episode);
        }
      } catch (err) {
        console.error("Episode selection error:", err);
        setError("Failed to load video for this episode. Please try again.");
        setModalEpisode(episode);
      } finally {
        setIsLoading(false);
      }
    },
    [modalAnime]
  );

  const loadMore = useCallback((type) => {
    if (type === "popular") {
      setPopularVisible((prev) => prev + 8);
    } else if (type === "recent") {
      setRecentVisible((prev) => prev + 8);
    }
  }, []);

  const submitNewsletter = useCallback(
    async (e) => {
      e.preventDefault();
      if (!newsletterEmail) {
        setError("Email cannot be empty.");
        return;
      }

      try {
        console.log("Subscribing email:", newsletterEmail);
        alert(`Thank you for subscribing with ${newsletterEmail}!`);
        setNewsletterEmail("");
        setError(null);
      } catch (err) {
        console.error("Newsletter error:", err);
        setError("Subscription failed. Please try again.");
      }
    },
    [newsletterEmail]
  );

  const submitReview = useCallback(
    async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.elements[0].value;
      const rating = parseInt(form.elements[1].value, 10);
      const comment = form.elements[2].value;

      if (!name || !rating || !comment || rating < 1 || rating > 5) {
        setError("Please fill all review fields correctly (rating 1-5).");
        return;
      }

      try {
        const newReview = {
          id: Date.now(),
          name,
          rating,
          comment,
          avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        };

        setReviews((prev) => [newReview, ...prev]);
        form.reset();
        setError(null);
        alert("Review submitted successfully!");
      } catch (err) {
        console.error("Review submission error:", err);
        setError("Failed to submit review. Please try again.");
      }
    },
    []
  );

  const displayList = searchTerm || activeGenre ? searchResults : null;

  if (isLoading && !displayList && !error && trending.length === 0) {
    return (
      <HomeContainer>
        <div style={{ textAlign: "center", padding: "2rem", fontSize: "1.5rem" }}>
          Loading the Anime Universe...
        </div>
      </HomeContainer>
    );
  }

  if (error && !isLoading) {
    return (
      <HomeContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "red", fontSize: "1.2rem" }}>
          Error: {error}
          <br/>
          Please check your internet connection or try again later. If the issue persists, check your browser's console for CORS errors.
        </div>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      {/* Hero */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to AnimeStream</HeroTitle>
          <HeroDescription>
            Stream classics and new releases, anytime.
          </HeroDescription>
          <HeroButton>
            <FaPlay /> Start Watching
          </HeroButton>
        </HeroContent>
      </HeroSection>

      {/* Search & Sort */}
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for anime..."
        />
        {(searchTerm || activeGenre) && (
          <button
            onClick={() => {
              setSearchTerm("");
              setActiveGenre(null);
              setSearchResults([]);
              setError(null);
            }}
            style={{
              background: "var(--accent)",
              color: "var(--bg-primary)",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "12px",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
          >
            Clear
          </button>
        )}
        <label htmlFor="sort" style={{ marginLeft: "1rem" }}>Sort:</label>
        <SortSelect
          id="sort"
          value={sortOption}
          onChange={handleSort}
          disabled={!displayList || displayList.length === 0}
        >
          <option value="A-Z">A–Z</option>
          <option value="Z-A">Z–A</option>
        </SortSelect>
      </SearchContainer>

      {/* Genres */}
      <SectionTitle>
        <FaFilter /> Genres
      </SectionTitle>
      <GenreFilterContainer>
        {genres.length > 0 ? (
          genres.slice(0, 15).map((g) => (
            <GenreButton
              key={g}
              onClick={() => filterByGenre(g)}
              active={activeGenre === g}
            >
              {g}
            </GenreButton>
          ))
        ) : (
          <div style={{ 
            textAlign: "center", 
            padding: "1rem", 
            color: "var(--text-secondary)",
            fontSize: "0.9rem"
          }}>
            Loading genres...
          </div>
        )}
      </GenreFilterContainer>

      {/* Search/Filter Results */}
      {(searchTerm || activeGenre) && (
        <>
          <SectionTitle>
            Results {activeGenre && `for ${activeGenre}`}
            {searchTerm && ` for "${searchTerm}"`}
          </SectionTitle>
          {error && (
            <div style={{ 
              textAlign: "center", 
              padding: "1rem 2rem", 
              color: "#ff6b6b", 
              backgroundColor: "rgba(255, 107, 107, 0.1)",
              borderRadius: "8px",
              margin: "0 2rem 1rem 2rem"
            }}>
              {error}
            </div>
          )}
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Loading results...</div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                {activeGenre ? `Searching for ${activeGenre} anime...` : `Searching for "${searchTerm}"...`}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div style={{ 
                textAlign: "center", 
                padding: "0 2rem 1rem 2rem", 
                color: "var(--text-secondary)",
                fontSize: "0.9rem"
              }}>
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
              <AnimeGrid>
                {searchResults.map((a) => (
                  <AnimeCard key={a.id} onClick={() => openModal(a)}>
                    <FavoriteButton
                      favorited={!!favorites.find((x) => x.id === a.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFav(a);
                      }}
                    >
                      <FaHeart />
                    </FavoriteButton>
                    <AnimeImage
                      src={a.poster || a.image || "https://via.placeholder.com/200x300"}
                      alt={a.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200x300";
                      }}
                    />
                    <AnimeDetails>
                      <AnimeTitle>{a.title}</AnimeTitle>
                      <AnimeEpisode>
                        Episodes: {a.episodes?.eps || a.episodes?.length || "N/A"}
                      </AnimeEpisode>
                    </AnimeDetails>
                  </AnimeCard>
                ))}
              </AnimeGrid>
            </>
          ) : !error ? (
            <div style={{ 
              textAlign: "center", 
              padding: "2rem", 
              color: "var(--text-secondary)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "8px",
              margin: "0 2rem"
            }}>
              <div style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                No results found
              </div>
              <div style={{ fontSize: "0.9rem" }}>
                {searchTerm ? `No anime found for "${searchTerm}"` : `No anime found for genre "${activeGenre}"`}
              </div>
              <div style={{ fontSize: "0.8rem", marginTop: "0.5rem", opacity: 0.7 }}>
                Try a different search term or genre
              </div>
            </div>
          ) : null}
        </>
      )}

      {/* Featured Carousel */}
      {featured.length > 0 && (
        <FeaturedSection>
          <SectionTitle>
            <FaStar /> Featured Anime
          </SectionTitle>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            style={{ padding: "0 1rem" }}
            slidesPerView={1}
          >
            {featured.map((a) => (
              <SwiperSlide key={a.id}>
                <FeaturedCard onClick={() => openModal(a)}>
                  <FeaturedImage
                    src={a.poster || a.image || "https://via.placeholder.com/800x400"}
                    alt={a.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800x400";
                    }}
                  />
                  <FeaturedDetails>
                    <AnimeTitle>{a.title}</AnimeTitle>
                    <FeaturedDescription>
                      {a.synopsis || a.description || "No description available."}
                    </FeaturedDescription>
                    <p>
                      <strong>Aired:</strong> {a.aired || "Unknown"}
                    </p>
                    <WatchButton onClick={() => openModal(a)}>
                      Watch Now
                    </WatchButton>
                  </FeaturedDetails>
                </FeaturedCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </FeaturedSection>
      )}

      {/* Trending */}
      {trending.length > 0 && (
        <>
          <SectionTitle>
            <FaFire /> Trending Anime
          </SectionTitle>
          <AnimeGrid>
            {trending.map((a) => (
              <AnimeCard key={a.id} onClick={() => openModal(a)}>
                <FavoriteButton
                  favorited={!!favorites.find((x) => x.id === a.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFav(a);
                  }}
                >
                  <FaHeart />
                </FavoriteButton>
                <AnimeImage
                  src={a.poster || a.image || "https://via.placeholder.com/200x300"}
                  alt={a.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300";
                  }}
                />
                <AnimeDetails>
                  <AnimeTitle>{a.title}</AnimeTitle>
                  <AnimeEpisode>
                    Episodes: {a.episodes?.eps || a.episodes?.length || "N/A"}
                  </AnimeEpisode>
                </AnimeDetails>
              </AnimeCard>
            ))}
          </AnimeGrid>
        </>
      )}

      {/* Popular */}
      {popular.length > 0 && (
        <>
          <SectionTitle>
            <FaFire /> Most Popular Anime
          </SectionTitle>
          <AnimeGrid>
            {popular.slice(0, popularVisible).map((a) => (
              <AnimeCard key={a.id} onClick={() => openModal(a)}>
                <FavoriteButton
                  favorited={!!favorites.find((x) => x.id === a.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFav(a);
                  }}
                >
                  <FaHeart />
                </FavoriteButton>
                <AnimeImage
                  src={a.poster || a.image || "https://via.placeholder.com/200x300"}
                  alt={a.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300";
                  }}
                />
                <AnimeDetails>
                  <AnimeTitle>{a.title}</AnimeTitle>
                  <AnimeEpisode>
                    Episodes: {a.episodes?.eps || a.episodes?.length || "N/A"}
                  </AnimeEpisode>
                </AnimeDetails>
              </AnimeCard>
            ))}
          </AnimeGrid>
          {popular.length > popularVisible && (
            <LoadMoreButton onClick={() => loadMore("popular")}>
              Load More
            </LoadMoreButton>
          )}
        </>
      )}

      {/* Recently Updated */}
      {recent.length > 0 && (
        <>
          <SectionTitle>
            <FaClock /> Latest Episodes
          </SectionTitle>
          <AnimeGrid>
            {recent.slice(0, recentVisible).map((a) => (
              <AnimeCard key={a.id} onClick={() => openModal(a)}>
                <FavoriteButton
                  favorited={!!favorites.find((x) => x.id === a.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFav(a);
                  }}
                >
                  <FaHeart />
                </FavoriteButton>
                <AnimeImage
                  src={a.poster || a.image || "https://via.placeholder.com/200x300"}
                  alt={a.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300";
                  }}
                />
                <AnimeDetails>
                  <AnimeTitle>{a.title}</AnimeTitle>
                  <AnimeEpisode>
                    Episode: {a.episodes?.eps || a.episodes?.latest || "N/A"}
                  </AnimeEpisode>
                </AnimeDetails>
              </AnimeCard>
            ))}
          </AnimeGrid>
          {recent.length > recentVisible && (
            <LoadMoreButton onClick={() => loadMore("recent")}>
              Load More
            </LoadMoreButton>
          )}
        </>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <UpcomingSection>
          <SectionTitle>
            <FaClock /> Top Upcoming Anime
          </SectionTitle>
          <AnimeGrid>
            {upcoming.map((a) => (
              <AnimeCard key={a.id} onClick={() => openModal(a)}>
                <FavoriteButton
                  favorited={!!favorites.find((x) => x.id === a.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFav(a);
                  }}
                >
                  <FaHeart />
                </FavoriteButton>
                <AnimeImage
                  src={a.poster || a.image || "https://via.placeholder.com/200x300"}
                  alt={a.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300";
                  }}
                />
                <AnimeDetails>
                  <AnimeTitle>{a.title}</AnimeTitle>
                  <AnimeEpisode>
                    Aired: {a.aired || "Coming soon"}
                  </AnimeEpisode>
                </AnimeDetails>
              </AnimeCard>
            ))}
          </AnimeGrid>
        </UpcomingSection>
      )}

      {/* Reviews */}
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

      {/* Newsletter */}
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
      <Footer>&copy; {new Date().getFullYear()} AnimeStream</Footer>

      {/* Modal */}
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            
            {isLoading ? (
              <div style={{ 
                textAlign: "center", 
                padding: "3rem",
                color: "var(--text-secondary)"
              }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                  Loading anime details...
                </div>
                <div style={{ fontSize: "0.9rem" }}>
                  Please wait while we fetch the information
                </div>
              </div>
            ) : modalAnime ? (
              <>
                {/* Modal Header */}
            <div style={{ 
              display: "flex", 
              gap: "1rem", 
              marginBottom: "1.5rem",
              alignItems: "flex-start"
            }}>
              <img
                src={modalAnime.poster || modalAnime.image || "https://via.placeholder.com/150x200"}
                alt={modalAnime.title}
                style={{
                  width: "150px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  flexShrink: 0
                }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150x200";
                }}
              />
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: "0 0 0.5rem 0", color: "var(--accent)" }}>
                  {modalAnime.title}
                </h2>
                <div style={{ 
                  display: "flex", 
                  gap: "1rem", 
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)"
                }}>
                  {modalAnime.status && <span>Status: {modalAnime.status}</span>}
                  {modalAnime.type && <span>Type: {modalAnime.type}</span>}
                  {modalAnime.episodes?.length && <span>Episodes: {modalAnime.episodes.length}</span>}
                </div>
                <div style={{ 
                  display: "flex", 
                  gap: "0.5rem", 
                  flexWrap: "wrap",
                  marginBottom: "1rem"
                }}>
                  {modalAnime.genres?.map((genre, index) => (
                    <span
                      key={index}
                      style={{
                        background: "var(--accent)",
                        color: "var(--bg-primary)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem"
                      }}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--accent)" }}>Description</h3>
              <p style={{ 
                lineHeight: "1.6", 
                color: "var(--text-secondary)",
                margin: 0
              }}>
                {modalAnime.description || modalAnime.synopsis || "No description available."}
              </p>
            </div>

            {/* Episodes Section */}
            {!modalEpisode && (
              <div>
                <h3 style={{ margin: "0 0 1rem 0", color: "var(--accent)" }}>
                  Episodes ({modalAnime.episodes?.length || 0})
                </h3>
                {modalAnime.episodes?.length ? (
                  <div style={{ 
                    maxHeight: "300px", 
                    overflowY: "auto",
                    border: "1px solid var(--accent)",
                    borderRadius: "8px"
                  }}>
                    {modalAnime.episodes.map((ep, index) => (
                      <div
                        key={ep.id || ep.episodeNumber || index}
                        style={{
                          padding: "0.8rem",
                          cursor: "pointer",
                          borderBottom: index < modalAnime.episodes.length - 1 ? "1px solid rgba(6,182,212,0.2)" : "none",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "background-color 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "rgba(6,182,212,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                        }}
                        onClick={() => selectEpisode(ep)}
                      >
                        <div>
                          <div style={{ fontWeight: "bold", marginBottom: "0.2rem" }}>
                            Episode {ep.episodeNumber || index + 1}
                          </div>
                          <div style={{ 
                            fontSize: "0.9rem", 
                            color: "var(--text-secondary)",
                            maxWidth: "300px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                          }}>
                            {ep.title || `Episode ${ep.episodeNumber || index + 1}`}
                          </div>
                        </div>
                        <div style={{ 
                          fontSize: "0.8rem", 
                          color: "var(--text-secondary)",
                          textAlign: "right"
                        }}>
                          {ep.duration || "24 min"}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: "center", 
                    padding: "2rem",
                    color: "var(--text-secondary)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px"
                  }}>
                    <div style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                      No episodes available
                    </div>
                    <div style={{ fontSize: "0.9rem" }}>
                      Episodes will be added when they become available
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video Player */}
            {modalEpisode && (
                  <div>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      marginBottom: "1rem"
                    }}>
                      <h3 style={{ margin: 0, color: "var(--accent)" }}>
                        Episode {modalEpisode.episodeNumber}: {modalEpisode.title || `Episode ${modalEpisode.episodeNumber}`}
                      </h3>
                      <button
                        onClick={() => setModalEpisode(null)}
                        style={{
                          background: "var(--accent)",
                          color: "var(--bg-primary)",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          cursor: "pointer"
                        }}
                      >
                        Back to Episodes
                      </button>
                    </div>
                    
                    {isLoading ? (
                      <div style={{ 
                        textAlign: "center", 
                        padding: "3rem",
                        color: "var(--text-secondary)"
                      }}>
                        <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                          Loading video...
                        </div>
                        <div style={{ fontSize: "0.9rem" }}>
                          Please wait while we fetch the video stream
                        </div>
                      </div>
                    ) : modalEpisode.videoUrl ? (
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      marginTop: "1rem",
                    }}
                  >
                    <iframe
                      src={modalEpisode.videoUrl}
                      title={`${modalAnime.title} Ep ${modalEpisode.episodeNumber}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        border: 0,
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: "center", 
                    padding: "3rem",
                    color: "var(--text-secondary)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px"
                  }}>
                    <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                      Video not available
                    </div>
                    <div style={{ fontSize: "0.9rem" }}>
                      This episode's video is not currently available
                    </div>
                  </div>
                )}
              </div>
            )}
              </>
            ) : (
              <div style={{ 
                textAlign: "center", 
                padding: "3rem",
                color: "var(--text-secondary)"
              }}>
                <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  Failed to load anime details
                </div>
                <div style={{ fontSize: "0.9rem" }}>
                  Please try again later
                </div>
              </div>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </HomeContainer>
  );
}