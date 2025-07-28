import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  FaCog, FaBell, FaUserNinja,
  FaPalette, FaTrash, FaSignOutAlt, FaUpload
} from 'react-icons/fa';

// Animations
const particleFlow = keyframes`
  0% { transform: translateY(-100%) rotate(0deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
`;

const shurikenSpin = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
`;

const neonPulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 4px #3b82f6); }
  50% { filter: drop-shadow(0 0 8px #60a5fa); }
`;

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  background: rgba(10, 18, 32, 0.95);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(12px);
`;

const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #3b82f6;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${neonPulse} 2s infinite;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: rgba(16, 24, 39, 0.6);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 25%,
      rgba(59,130,246,0.1) 50%,
      transparent 75%
    );
    animation: ${particleFlow} 8s linear infinite;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #60a5fa;
  
  svg {
    animation: ${shurikenSpin} 2s infinite;
  }
`;

// Create a styled Particle component instead of using inline styles
const Particle = styled.div`
  position: absolute;
  pointer-events: none;
  width: ${props => props.size};
  height: ${props => props.size};
  background: ${props => props.bg};
  left: ${props => props.left};
  top: ${props => props.top};
  animation: ${particleFlow} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  filter: drop-shadow(0 0 2px ${props => props.bg});
`;

const AvatarUpload = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.$preview ? `url(${props.$preview})` : 'rgba(16, 24, 39, 0.8)'};
  background-size: cover;
  background-position: center;
  margin: 1rem 0;
  position: relative;
  cursor: pointer;
  border: 2px solid #3b82f6;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  input {
    display: none;
  }
`;

const UploadOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${AvatarUpload}:hover & {
    opacity: 1;
  }
`;

const NinjaInput = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  background: rgba(16, 24, 39, 0.8);
  border: 1px solid #3b82f6;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 15px #60a5fa;
  }
`;

const ToggleSwitch = styled.div`
  width: 60px;
  height: 34px;
  background: ${props => props.$active ? '#10b981' : '#dc2626'};
  border-radius: 17px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.$active ? 'calc(100% - 26px)' : '3px'};
    width: 28px;
    height: 28px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`;

const DangerZone = styled(Section)`
  border: 2px solid #dc2626;
  background: rgba(220, 38, 38, 0.1);

  ${SectionTitle} {
    color: #dc2626;
  }
`;

const DangerButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  background: transparent;
  border: 1px solid ${props => props.$critical ? '#dc2626' : '#ef4444'};
  color: ${props => props.$critical ? '#dc2626' : '#ef4444'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(220, 38, 38, 0.1);
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 20%,
      rgba(255,255,255,0.1) 50%,
      transparent 80%
    );
    animation: ${particleFlow} 4s linear infinite;
  }
`;

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Header>
        <FaCog size={40} color="#3b82f6" />
        <Title>Ninja Configuration</Title>
      </Header>

      <Section>
        <SectionTitle>
          <FaUserNinja />
          Shadow Profile
        </SectionTitle>

        <AvatarUpload $preview={avatarPreview} onClick={() => fileInputRef.current.click()}>
          {!avatarPreview && <FaUpload size={40} color="#3b82f6" />}
          <UploadOverlay>
            <FaUpload size={30} color="#fff" />
          </UploadOverlay>
          <input ref={fileInputRef} type="file" onChange={handleFileUpload} accept="image/*" />
        </AvatarUpload>

        <NinjaInput placeholder="Ninja Name" />
        <NinjaInput type="email" placeholder="Hidden Village Email" />
        <NinjaInput type="password" placeholder="Secret Jutsu Phrase" />
      </Section>

      <Section>
        <SectionTitle>
          <FaPalette />
          Dojo Appearance
        </SectionTitle>
        <FlexBetween>
          <span>Night Vision Mode</span>
          <ToggleSwitch $active={darkMode} onClick={() => setDarkMode(!darkMode)} />
        </FlexBetween>
      </Section>

      <Section>
        <SectionTitle>
          <FaBell />
          Scroll Alerts
        </SectionTitle>
        <FlexBetween>
          <span>Mission Updates</span>
          <ToggleSwitch $active={darkMode} onClick={() => setDarkMode(!darkMode)} />
        </FlexBetween>
      </Section>

      <DangerZone>
        <SectionTitle>
          <FaTrash />
          Forbidden Actions
        </SectionTitle>
        <DangerButton>
          <FaSignOutAlt />
          Leave Hidden Village
        </DangerButton>
        <DangerButton $critical>
          <FaTrash />
          Seal Account Permanently
        </DangerButton>
      </DangerZone>

      <SaveButton onClick={() => alert("Settings preserved in ancient scrolls!")}>
        Seal Changes
      </SaveButton>

      {/* Background particles using the Particle styled-component */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Particle 
          key={i}
          size={`${Math.random() * 10 + 5}px`}
          bg={`rgba(59,130,246,${Math.random() * 0.4})`}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
          duration={Math.random() * 5 + 5}
          delay={Math.random() * 5}
        />
      ))}
    </Container>
  );
};

export default Settings;
