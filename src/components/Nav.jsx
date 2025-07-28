import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  FaDragon, FaFire, FaStar, FaScroll, FaUserNinja, 
  FaShieldAlt, FaMoon, FaSun, FaSignInAlt, 
  FaUserCircle, FaBolt 
} from 'react-icons/fa';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

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

const textGlow = keyframes`
  0% { text-shadow: 0 0 10px var(--spirit-flame); }
  50% { text-shadow: 0 0 20px var(--dragon-core); }
  100% { text-shadow: 0 0 10px var(--spirit-flame); }
`;

// Global Styles
const GlobalStyle = createGlobalStyle`
  :root {
    --void-blue: #0a1220;
    --dragon-core: #3b82f6;
    --spirit-flame: #60a5fa;
    --scroll-glow: #93c5fd;
    --ninja-red: #dc2626;
    --ninja-purple: #8b5cf6;
    --ninja-orange: #f59e0b;
    --nature-green: #10b981;
    --scroll-border: rgba(147, 197, 253, 0.2);
    --aura-intensity: 0.3;
    --transition-speed: 300ms;
    --sidebar-width: 6rem;
    --sidebar-expanded: 20rem;
  }

  body {
    background: var(--void-blue);
    color: white;
    margin: 0;
    overflow-x: hidden;
    font-family: 'Ninja Naruto', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, 
        rgba(59,130,246,var(--aura-intensity)) 0%, 
        transparent 60%
      );
      pointer-events: none;
      z-index: -1;
    }
  }
`;

// Styled Components
const DojoSidebar = styled.nav`
  position: fixed;
  height: 100vh;
  width: var(--sidebar-width);
  background: linear-gradient(215deg, 
    rgba(10,18,32,0.98) 0%,
    rgba(22,35,64,0.95) 100%
  );
  backdrop-filter: blur(12px);
  border-right: 2px solid var(--dragon-core);
  transition: all var(--transition-speed) cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  perspective: 2000px;

  &:hover {
    width: var(--sidebar-expanded);
    transform: rotateY(-2deg);
    box-shadow: 20px 0 60px rgba(59,130,246,0.5),
                inset -10px 0 30px rgba(59,130,246,0.2);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="%233b82f6" stroke-width="2" fill="none" opacity="0.1"/></svg>');
    background-size: 10px 10px;
    pointer-events: none;
  }
`;

const SpiritRealm = styled.div`
  position: relative;
  flex: 1;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
`;

const ShadowClone = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255,255,255,0.1) 50%,
    transparent 100%
  );
  animation: ${shurikenSpin} 2s infinite linear;
  pointer-events: none;
`;

const ChakraParticle = styled.div`
  position: absolute;
  width: ${props => props.size};
  height: ${props => props.size};
  background: ${props => props.color};
  clip-path: ${props => props.shape};
  opacity: 0.4;
  animation: ${particleFlow} ${props => props.duration} linear infinite;
  filter: drop-shadow(0 0 2px ${props => props.color});
`;

const DragonBrand = styled(Link)`
  padding: 0 2rem;
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  .ryu-seal {
    width: 4rem;
    height: 4rem;
    background: linear-gradient(45deg, 
      var(--dragon-core) 30%,
      var(--spirit-flame) 70%
    );
    clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
    box-shadow: 0 0 20px var(--dragon-core);
    transition: all var(--transition-speed) ease;
    
    &:hover {
      transform: rotate(1080deg) scale(1.3);
      filter: hue-rotate(90deg) drop-shadow(0 0 20px var(--dragon-core));
    }
  }
`;

const NinjaPath = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const ShinobiLink = styled(NavLink)`
  position: relative;
  padding: 1rem 2rem;
  margin: 1rem 0;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  display: block;
  border-left: 3px solid var(--scroll-border);

  &:hover {
    transform: translateX(10px);
    background: linear-gradient(90deg, 
      rgba(59,130,246,0.1) 0%,
      transparent 100%
    );
    
    .path-icon {
      transform: translateY(-5px);
      filter: drop-shadow(0 0 8px var(--dragon-core));
    }
  }

  &.active {
    border-left-color: var(--ninja-red);
    background: linear-gradient(90deg, 
      rgba(220, 38, 38, 0.1) 0%,
      transparent 100%
    );
  }

  .path-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .path-icon {
    transition: all var(--transition-speed) ease;
    flex-shrink: 0;
    min-width: 2.5rem;
    color: var(--dragon-core);
    font-size: 1.8rem;
    position: relative;

    &::after {
      content: '';
      display: ${props => props.mark ? 'block' : 'none'};
      position: absolute;
      top: -4px;
      right: -4px;
      width: 8px;
      height: 8px;
      background: var(--nature-green);
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
    }
  }

  .text-container {
    position: relative;
    height: 1.5em;
    width: calc(var(--sidebar-expanded) - 6rem);
    overflow: hidden;
  }

  .jutsu-name, .hidden-name {
    position: absolute;
    white-space: nowrap;
    font-size: 1.2rem;
    letter-spacing: 2px;
    transition: all var(--transition-speed) cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .jutsu-name {
    transform: translateX(-120%);
    opacity: 0;
  }

  .hidden-name {
    transform: translateX(100%);
    opacity: 0;
    color: var(--spirit-flame);
  }

  &:hover .jutsu-name {
    transform: translateX(-150%);
    opacity: 0;
  }

  &:hover .hidden-name {
    transform: translateX(0);
    opacity: 1;
  }
`;

const AuthSection = styled.div`
  padding: 2rem;
  border-top: 1px solid rgba(93, 93, 255, 0.1);
  margin-top: auto;
`;

const LoginButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  background: linear-gradient(90deg, 
    rgba(220, 38, 38, 0.2) 0%,
    rgba(59,130,246,0.1) 100%
  );
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(90deg, 
      rgba(220, 38, 38, 0.3) 0%,
      rgba(59,130,246,0.2) 100%
    );
  }

  .auth-icon {
    font-size: 1.2rem;
    color: var(--ninja-red);
  }

  span {
    font-size: 1rem;
    font-weight: bold;
  }
`;

const NinjaAlert = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: rgba(220, 38, 38, 0.9);
  padding: 1rem 2rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: ${textGlow} 2s infinite;

  .alert-icon {
    animation: ${shurikenSpin} 1s infinite;
  }
`;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const ninjaPaths = [
    { to: "/", icon: <FaDragon />, display: 'Dragon Dojo', hidden: 'Home', mark: true },
    { to: "/trending", icon: <FaFire />, display: 'Flame Jutsu', hidden: 'Trending', mark: true },
    { to: "/favorites", icon: <FaStar />, display: 'Celestial Arts', hidden: 'Favorites' },
    { to: "/history", icon: <FaScroll />, display: 'Forbidden Scrolls', hidden: 'History' },
    { to: "/profile", icon: <FaUserNinja />, display: 'Shadow Clone', hidden: 'Profile' },
    { to: "/settings", icon: <FaShieldAlt />, display: 'Chakra Shield', hidden: 'Settings' },
    { to: "/api-docs", icon: <FaScroll />, display: 'API Docs', hidden: 'API Docs' }
  ];

  return (
    <>
      <GlobalStyle />
      {showAlert && (
        <NinjaAlert>
          <FaBolt className="alert-icon" />
        </NinjaAlert>
      )}

      <DojoSidebar>
        <ShadowClone />
        <SpiritRealm>
          {Array.from({ length: 50 }).map((_, index) => (
            <ChakraParticle
              key={index}
              color="var(--dragon-core)"
              shape={
                Math.random() > 0.5 ? 
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 
                'circle(50% at 50% 50%)'
              }
              size={`${Math.random() * 10 + 5}px`}
              duration={`${Math.random() * 3 + 5}s`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          ))}

          <DragonBrand to="/">
            <div className="ryu-seal" />
          </DragonBrand>

          <NinjaPath>
            {ninjaPaths.map((path, index) => (
              <ShinobiLink 
                key={index}
                to={path.to}
                end
                mark={path.mark}
              >
                <div className="path-content">
                  <div className="path-icon">{path.icon}</div>
                  <div className="text-container">
                    <span className="jutsu-name">{path.display}</span>
                    <span className="hidden-name">{path.hidden}</span>
                  </div>
                </div>
              </ShinobiLink>
            ))}
          </NinjaPath>

          <AuthSection>
            <LoginButton to={isLoggedIn ? "/profile" : "/login"}>
              {isLoggedIn ? (
                <>
                  <FaUserCircle className="auth-icon" />
                  <span>Shadow Master</span>
                </>
              ) : (
                <>
                  <FaSignInAlt className="auth-icon" />
                  <span>Ninja Login</span>
                </>
              )}
            </LoginButton>
          </AuthSection>
        </SpiritRealm>
      </DojoSidebar>
    </>
  );
};

export default Navbar;