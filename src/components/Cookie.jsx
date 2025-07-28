import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCookieBite,
  FaLock,
  FaChartLine,
  FaAd,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronLeft
} from 'react-icons/fa';
import styled from 'styled-components';

const CookieContainer = styled.div`
  padding: 4rem 2rem;
  background: linear-gradient(45deg, var(--bg-primary), var(--bg-secondary));
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  margin-left: 5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://i.ibb.co/3T2B0yR/anime-scene.png');
    background-size: cover;
    opacity: 0.05;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: var(--accent);
    text-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
  }

  p {
    color: var(--text-secondary);
    max-width: 600px;
    margin: 1rem auto;
    line-height: 1.6;
  }
`;

const CookieCategory = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2d3436;
    transition: .4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: var(--accent);
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  input:disabled + .slider {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const ControlButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:first-child {
    background: var(--accent);
    color: white;

    &:hover {
      background: #0ea5e9;
    }
  }

  &:last-child {
    background: rgba(255, 71, 87, 0.15);
    color: #ff4757;

    &:hover {
      background: rgba(255, 71, 87, 0.25);
    }
  }
`;

const ConfirmationMessage = styled.div`
  text-align: center;
  margin: 2rem 0;
  color: #2ed573;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const CookieSettings = () => {
  const [cookies, setCookies] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const savedCookies = localStorage.getItem('cookiePreferences');
    if (savedCookies) {
      setCookies(JSON.parse(savedCookies));
    }
  }, []);

  const handleToggle = (type) => {
    setCookies(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookies));
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true
    };
    setCookies(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const rejectNonEssential = () => {
    const nonEssential = {
      essential: true,
      analytics: false,
      marketing: false
    };
    setCookies(nonEssential);
    localStorage.setItem('cookiePreferences', JSON.stringify(nonEssential));
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <CookieContainer>
      <ContentWrapper>
        <Header>
          <h1>
            <FaCookieBite />
            Cookie Settings
          </h1>
          <p>Manage your cookie preferences for optimal anime streaming experience</p>
        </Header>

        <CookieCategory>
          <CategoryHeader>
            <h2>
              <FaLock />
              Essential Cookies
            </h2>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={cookies.essential}
                onChange={() => handleToggle('essential')}
                disabled
              />
              <span className="slider" />
            </ToggleSwitch>
          </CategoryHeader>
          <p>
            Required for basic site functionality. Cannot be disabled.
            Includes session management and security features.
          </p>
        </CookieCategory>

        <CookieCategory>
          <CategoryHeader>
            <h2>
              <FaChartLine />
              Analytics Cookies
            </h2>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={cookies.analytics}
                onChange={() => handleToggle('analytics')}
              />
              <span className="slider" />
            </ToggleSwitch>
          </CategoryHeader>
          <p>
            Help us improve our service by collecting anonymous usage data.
            Track viewing patterns and feature usage.
          </p>
        </CookieCategory>

        <CookieCategory>
          <CategoryHeader>
            <h2>
              <FaAd />
              Marketing Cookies
            </h2>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={cookies.marketing}
                onChange={() => handleToggle('marketing')}
              />
              <span className="slider" />
            </ToggleSwitch>
          </CategoryHeader>
          <p>
            Used to personalize ads based on your viewing history.
            Enables social media integrations and content sharing.
          </p>
        </CookieCategory>

        {showConfirmation && (
          <ConfirmationMessage>
            <FaCheckCircle />
            Preferences saved successfully!
          </ConfirmationMessage>
        )}

        <Controls>
          <ControlButton onClick={savePreferences}>
            <FaCheckCircle />
            Save Preferences
          </ControlButton>
          <ControlButton onClick={acceptAll}>
            <FaCheckCircle />
            Accept All
          </ControlButton>
          <ControlButton onClick={rejectNonEssential}>
            <FaTimesCircle />
            Reject Non-Essential
          </ControlButton>
        </Controls>

        <Link 
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
            color: 'var(--accent)',
            textDecoration: 'none'
          }}
        >
          <FaChevronLeft />
          Return to Home Page
        </Link>
      </ContentWrapper>
    </CookieContainer>
  );
};

export default CookieSettings;