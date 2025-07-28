import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaCalendarAlt, FaHeart, FaClock, FaStar, FaCamera } from 'react-icons/fa';
import styled from 'styled-components';
import { getProfile, updateProfile, deleteProfile } from '../api';

// ========================
// Styled Components
// ========================

const ProfileContainer = styled.div`
  margin-left: 5rem;
  padding: 2rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
  &:hover .edit-overlay {
    opacity: 1;
  }
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid var(--accent);
  object-fit: cover;
  transition: all 0.3s ease;
`;

const EditOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const UserInfo = styled.div`
  flex: 1;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Username = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--accent);
`;

const UserMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: var(--primary);
    transform: scale(1.05);
  }
`;

const Section = styled.section`
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BioText = styled.p`
  background: var(--bg-primary);
  padding: 1.5rem;
  border-radius: 12px;
  line-height: 1.6;
  color: var(--text-secondary);
`;

const BioTextarea = styled.textarea`
  width: 100%;
  background: var(--bg-primary);
  padding: 1.5rem;
  border-radius: 12px;
  color: var(--text-primary);
  border: 2px solid var(--accent);
  resize: vertical;
  min-height: 150px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background: var(--bg-primary);
  border: 2px solid var(--accent);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
`;

const FileInput = styled.input`
  display: none;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const StatCard = styled.div`
  background: var(--bg-primary);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent);
  margin-top: 0.5rem;
`;

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const FavoriteCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);

    img {
      filter: blur(3px) brightness(0.7);
    }

    .description {
      opacity: 1;
    }
  }
`;

const FavoriteImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const FavoriteTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: white;
  font-weight: bold;
`;

const FavoriteDescription = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 0.9rem;
  line-height: 1.4;
`;

// ========================
// Profile Component
// ========================

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempBio, setTempBio] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }
    getProfile(token)
      .then(data => {
        setUser(data);
        setTempBio(data.bio || '');
        setTempUsername(data.username || '');
        setTempEmail(data.email || '');
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setEditMode(false);
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const updated = await updateProfile({
      bio: tempBio,
      username: tempUsername,
        email: tempEmail
      }, token);
      setUser(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <ProfileContainer>Loading profile...</ProfileContainer>;
  if (error) return <ProfileContainer>Error: {error}</ProfileContainer>;
  if (!user) return <ProfileContainer>No profile data.</ProfileContainer>;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <AvatarContainer>
          <label htmlFor="avatar-upload">
            <Avatar src={user.avatar} alt="Avatar" />
            {editMode && (
              <EditOverlay className="edit-overlay">
                <FaCamera size={24} color="white" />
              </EditOverlay>
            )}
          </label>
          {editMode && (
            <FileInput
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          )}
        </AvatarContainer>

        <UserInfo>
          {editMode ? (
            <>
              <InputField
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Username"
              />
              <InputField
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                placeholder="Email"
              />
            </>
          ) : (
            <>
              <Username>{user.username}</Username>
              <UserMeta>
                <MetaItem>
                  <FaEnvelope />
                  <span>{user.email}</span>
                </MetaItem>
                <MetaItem>
                  <FaCalendarAlt />
                  <span>Joined {user.joinDate}</span>
                </MetaItem>
              </UserMeta>
            </>

            
          )}
          
          <EditButton onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel' : 'Edit Profile'}
          </EditButton>
        </UserInfo>
      </ProfileHeader>

      <Section>
        <SectionTitle>
          <FaUser /> Bio
        </SectionTitle>
        {editMode ? (
          <BioTextarea
            value={tempBio}
            onChange={(e) => setTempBio(e.target.value)}
            placeholder="Tell us about yourself..."
          />
        ) : (
          <BioText>{user.bio}</BioText>
        )}
      </Section>

      <Section>
        <SectionTitle>
          <FaHeart /> Stats
        </SectionTitle>
        <StatsGrid>
          <StatCard>
            <div className="flex items-center gap-2 justify-center">
              <FaClock className="text-purple-500" />
              <span>Watched Episodes</span>
            </div>
            <StatValue>{user.stats.watchedEpisodes}</StatValue>
          </StatCard>
          <StatCard>
            <div className="flex items-center gap-2 justify-center">
              <FaHeart className="text-purple-500" />
              <span>Completed Anime</span>
            </div>
            <StatValue>{user.stats.completedAnime}</StatValue>
          </StatCard>
        </StatsGrid>
      </Section>

      <Section>
        <SectionTitle>
          <FaStar /> Favorites
        </SectionTitle>
        <FavoritesGrid>
          {user.favorites.map((anime) => (
            <FavoriteCard key={anime.id}>
              <FavoriteImage src={anime.image} alt={anime.title} />
              <FavoriteTitle>{anime.title}</FavoriteTitle>
              <FavoriteDescription className="description">
                {anime.description}
              </FavoriteDescription>
            </FavoriteCard>
          ))}
        </FavoritesGrid>
      </Section>

      {editMode && (
        <div className="flex justify-end gap-4">
          <EditButton onClick={handleSave} style={{ background: 'var(--green-accent)' }}>
            Save Changes
          </EditButton>
          
        </div>
      )}
    </ProfileContainer>
  );
};

export default Profile;