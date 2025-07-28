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
import React, { useEffect, useState, useCallback } from "react";
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

// ───── Styled Components ─────────────────────────────────────────────────────
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

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchHome();
        console.log("[API] fetchHome →", response);
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
        setError("Failed to load data. Please try again later.");
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
    async (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      if (!term) {
        setSearchResults([]);
        setActiveGenre(null);
        return;
      }

      try {
        setIsLoading(true);
        const result = await searchAnime(term, 1);
        console.log(`🔎 searchAnime("${term}") →`, result);
        const items = result.results || result.data?.results || result.data || [];
        const sorted = items.sort((a, b) =>
          sortOption === "A-Z"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
        setSearchResults(sorted);
      } catch (err) {
        console.error("Search error:", err);
        setError("Search failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [sortOption]
  );

  const handleSort = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);

  const filterByGenre = useCallback(
    async (genre) => {
      if (activeGenre === genre) {
        setActiveGenre(null);
        setSearchResults([]);
        return;
      }

      setActiveGenre(genre);
      try {
        setIsLoading(true);
        const res = await fetchAnimeList("genre", genre, 1);
        console.log(`🎨 fetchAnimeList("genre", "${genre}") →`, res);
        const list = res.results || res.data?.results || res.data || [];
        setSearchResults(list);
      } catch (err) {
        console.error("Genre filter error:", err);
        setError("Failed to filter by genre. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [activeGenre]
  );

  const toggleFav = useCallback(
    (anime) => {
      setFavorites((prev) =>
        prev.find((x) => x.id === anime.id)
          ? prev.filter((x) => x.id !== anime.id)
          : [...prev, anime]
      );
    },
    []
  );

  const openModal = useCallback(
    async (anime) => {
      try {
        setIsLoading(true);
        const details = await fetchAnimeDetails(anime.id);
        console.log("[API] fetchAnimeDetails →", details);
        setModalAnime(details);
        setModalEpisode(null);
        setShowModal(true);
      } catch (err) {
        console.error("Modal load error:", err);
        setError("Failed to load anime details.");
      } finally {
        setIsLoading(false);
      }
    },
    []
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
      if (!newsletterEmail) return;

      try {
        // In a real app, you would call your API here
        console.log("Subscribing email:", newsletterEmail);
        alert(`Thank you for subscribing with ${newsletterEmail}!`);
        setNewsletterEmail("");
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
      const rating = form.elements[1].value;
      const comment = form.elements[2].value;

      if (!name || !rating || !comment) return;

      try {
        // In a real app, you would call your API here
        const newReview = {
          id: Date.now(),
          name,
          rating,
          comment,
          avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        };

        setReviews((prev) => [newReview, ...prev]);
        form.reset();
      } catch (err) {
        console.error("Review submission error:", err);
        setError("Failed to submit review. Please try again.");
      }
    },
    []
  );

  const displayList = searchTerm || activeGenre ? searchResults : null;

  if (isLoading && !displayList) {
    return (
      <HomeContainer>
        <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
      </HomeContainer>
    );
  }

  if (error) {
    return (
      <HomeContainer>
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          {error}
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
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for anime..."
        />
        <label htmlFor="sort">Sort:</label>
        <SortSelect
          id="sort"
          value={sortOption}
          onChange={handleSort}
          disabled={!displayList}
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
        {genres.slice(0, 15).map((g) => (
          <GenreButton
            key={g}
            onClick={() => filterByGenre(g)}
            active={activeGenre === g}
          >
            {g}
          </GenreButton>
        ))}
      </GenreFilterContainer>

      {/* Search/Filter Results */}
      {displayList && (
        <>
          <SectionTitle>
            Results {activeGenre && `for ${activeGenre}`}
          </SectionTitle>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
          ) : displayList.length ? (
            <AnimeGrid>
              {displayList.map((a) => (
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
                    src={a.image || "https://via.placeholder.com/200x300"}
                    alt={a.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/200x300";
                    }}
                  />
                  <AnimeDetails>
                    <AnimeTitle>{a.title}</AnimeTitle>
                    <AnimeEpisode>
                      {a.episodes?.length
                        ? `${a.episodes.length} episodes`
                        : "Coming soon"}
                    </AnimeEpisode>
                  </AnimeDetails>
                </AnimeCard>
              ))}
            </AnimeGrid>
          ) : (
            <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
              No results found.
            </p>
          )}
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
            autoplay={{ delay: 4000 }}
            loop
            style={{ padding: "0 1rem" }}
          >
            {featured.map((a) => (
              <SwiperSlide key={a.id}>
                <FeaturedCard onClick={() => openModal(a)}>
                  <FeaturedImage
                    src={a.image || "https://via.placeholder.com/800x400"}
                    alt={a.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800x400";
                    }}
                  />
                  <FeaturedDetails>
                    <AnimeTitle>{a.title}</AnimeTitle>
                    <FeaturedDescription>
                      {a.description || "No description available."}
                    </FeaturedDescription>
                    <p>
                      <strong>Release:</strong> {a.releaseDate || "Unknown"}
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
            <FaStar /> Trending Anime
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
                  src={a.image || "https://via.placeholder.com/200x300"}
                  alt={a.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300";
                  }}
                />
                <AnimeDetails>
                  <AnimeTitle>{a.title}</AnimeTitle>
                  <AnimeEpisode>
                    {a.episodes?.length
                      ? `${a.episodes.length} episodes`
                      : "Coming soon"}
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
            <FaFire /> Popular Anime
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
                  src={a.image || "https://via.placeholder.com/200x300"}
                  alt={a.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300";
                  }}
                />
                <AnimeDetails>
                  <AnimeTitle>{a.title}</AnimeTitle>
                  <AnimeEpisode>
                    {a.episodes?.length
                      ? `${a.episodes.length} episodes`
                      : "Coming soon"}
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
            <FaClock /> Recently Updated
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
                  src={a.image || "https://via.placeholder.com/200x300"}
                  alt={a.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300";
                  }}
                />
                <AnimeDetails>
                  <AnimeTitle>{a.title}</AnimeTitle>
                  <AnimeEpisode>
                    {a.episodes?.length
                      ? `${a.episodes.length} episodes`
                      : "Coming soon"}
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
            <FaClock /> Upcoming Anime
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
                  src={a.image || "https://via.placeholder.com/200x300"}
                  alt={a.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300";
                  }}
                />
                <AnimeDetails>
                  <AnimeTitle>{a.title}</AnimeTitle>
                  <AnimeEpisode>
                    {a.releaseDate || "Coming soon"}
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
      {showModal && modalAnime && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            <h2>{modalAnime.title}</h2>
            <p>{modalAnime.description || "No description available."}</p>

            {!modalEpisode && (
              <>
                <h3>Episodes</h3>
                {modalAnime.episodes?.length ? (
                  modalAnime.episodes.map((ep) => (
                    <div
                      key={ep.id}
                      style={{
                        padding: "0.5rem",
                        cursor: "pointer",
                        borderBottom: "1px solid var(--accent)",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={() => setModalEpisode(ep)}
                    >
                      <span>
                        Episode {ep.episodeNumber}: {ep.title}
                      </span>
                      <span>{ep.duration || "24 min"}</span>
                    </div>
                  ))
                ) : (
                  <p>No episodes available yet.</p>
                )}
              </>
            )}

            {modalEpisode && modalEpisode.videoUrl && (
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
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </HomeContainer>
  );
}