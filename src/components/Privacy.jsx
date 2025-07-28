import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt,
  FaDatabase,
  FaUserLock,
  FaCookie,
  FaGlobe,
  FaBell,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import styled from 'styled-components';

const PrivacyContainer = styled.div`
  padding: 4rem 2rem;
background: linear-gradient(215deg, 
    rgba(10,18,32,0.98) 0%,
    rgba(22,35,64,0.95) 100%
  );  color: var(--text-primary);
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
  max-width: 1200px;
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
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionHeader = styled.div`
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  h2 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
  }
`;

const SectionContent = styled.div`
  padding: ${props => props.isOpen ? '2rem' : '0'};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;

  p, ul {
    line-height: 1.8;
    color: var(--text-secondary);
  }

  ul {
    padding-left: 2rem;
    margin: 1.5rem 0;
  }

  li {
    margin-bottom: 0.75rem;
    position: relative;

    &::before {
      content: '•';
      color: var(--accent);
      position: absolute;
      left: -1rem;
    }
  }

  a {
    color: var(--accent);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const NavigationLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
  color: var(--accent);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
    transform: translateX(5px);
  }
`;

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: 1,
      icon: <FaDatabase />,
      title: "Data Collection",
      content: (
        <>
          <p>We collect information to provide better services:</p>
          <ul>
            <li>Account registration details</li>
            <li>Watch history and preferences</li>
            <li>Device and usage information</li>
            <li>Payment processing data</li>
          </ul>
        </>
      )
    },
    {
      id: 2,
      icon: <FaShieldAlt />,
      title: "Data Usage",
      content: (
        <>
          <p>Your information helps us:</p>
          <ul>
            <li>Personalize recommendations</li>
            <li>Improve service quality</li>
            <li>Process transactions securely</li>
            <li>Communicate important updates</li>
          </ul>
        </>
      )
    },
    {
      id: 3,
      icon: <FaUserLock />,
      title: "User Rights",
      content: (
        <>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request data deletion</li>
            <li>Download your information</li>
            <li>Opt-out of data processing</li>
          </ul>
        </>
      )
    },
    {
      id: 4,
      icon: <FaGlobe />,
      title: "International Transfers",
      content: (
        <>
          <p>Data may be transferred globally with protections:</p>
          <ul>
            <li>GDPR-compliant transfers</li>
            <li>Standard contractual clauses</li>
            <li>Adequacy decisions</li>
          </ul>
        </>
      )
    },
    {
      id: 5,
      icon: <FaCookie />,
      title: "Cookies & Tracking",
      content: (
        <>
          <p>We use cookies for:</p>
          <ul>
            <li>Session management</li>
            <li>Personalized content</li>
            <li>Analytics and improvement</li>
          </ul>
          <p>Manage preferences in your <Link to="/cookie">Cookie Settings</Link></p>
        </>
      )
    },
    {
      id: 6,
      icon: <FaBell />,
      title: "Policy Updates",
      content: (
        <>
          <p>We may update this policy periodically:</p>
          <ul>
            <li>Notify via email for major changes</li>
            <li>Update revision date below</li>
            <li>Continued use implies acceptance</li>
          </ul>
        </>
      )
    }
  ];

  return (
    <PrivacyContainer>
      <ContentWrapper>
        <Header>
          <h1>
            <FaShieldAlt />
            Privacy Policy
          </h1>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </Header>

        {sections.map((section) => (
          <Section key={section.id}>
            <SectionHeader onClick={() => setOpenSection(openSection === section.id ? null : section.id)}>
              <h2>
                {section.icon}
                {section.title}
              </h2>
              {openSection === section.id ? <FaChevronUp /> : <FaChevronDown />}
            </SectionHeader>
            <SectionContent isOpen={openSection === section.id}>
              {section.content}
            </SectionContent>
          </Section>
        ))}

        <NavigationLink to="/">
          <FaChevronDown />
          Return to Home
        </NavigationLink>
      </ContentWrapper>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy;