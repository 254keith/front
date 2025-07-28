import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaScroll,
  FaUserShield,
  FaFilm,
  FaBan,
  FaBalanceScale,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import styled from 'styled-components';

const TermsContainer = styled.div`
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

const TermsOfService = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: 1,
      icon: <FaScroll />,
      title: "Acceptance of Terms",
      content: (
        <>
          <p>By accessing or using AnimeStream, you agree to be bound by these Terms of Service...</p>
        </>
      )
    },
    {
      id: 2,
      icon: <FaUserShield />,
      title: "User Responsibilities",
      content: (
        <>
          <ul>
            <li>Maintain account security and confidentiality</li>
            <li>Use content for personal, non-commercial purposes only</li>
            <li>Do not engage in unauthorized distribution of content</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </>
      )
    },
    {
      id: 3,
      icon: <FaFilm />,
      title: "Content Usage",
      content: (
        <>
          <p>All anime content is licensed for streaming only. Strictly prohibited:</p>
          <ul>
            <li>Downloading or recording content</li>
            <li>Reverse engineering or bypassing DRM</li>
            <li>Commercial use of any materials</li>
          </ul>
        </>
      )
    },
    {
      id: 4,
      icon: <FaBan />,
      title: "Account Termination",
      content: (
        <>
          <p>We reserve the right to terminate accounts for:</p>
          <ul>
            <li>Violation of these terms</li>
            <li>Abusive behavior</li>
            <li>Illegal activities</li>
            <li>Payment fraud</li>
          </ul>
        </>
      )
    },
    {
      id: 5,
      icon: <FaBalanceScale />,
      title: "Disclaimer & Limitations",
      content: (
        <>
          <p>Service provided "as is" without warranties of any kind...</p>
          <ul>
            <li>No guarantee of content availability</li>
            <li>Not responsible for third-party content</li>
            <li>Limitation of liability for damages</li>
          </ul>
        </>
      )
    },
    {
      id: 6,
      icon: <FaShieldAlt />,
      title: "Governing Law",
      content: (
        <>
          <p>These terms are governed by Japanese law. Any disputes shall be resolved in Tokyo courts.</p>
        </>
      )
    }
  ];

  return (
    <TermsContainer>
      <ContentWrapper>
        <Header>
          <h1>
            <FaScroll />
            Terms of Service
          </h1>
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

        <NavigationLink to="/signup">
          <FaChevronDown />
          Return to Sign Up
        </NavigationLink>
      </ContentWrapper>
    </TermsContainer>
  );
};

export default TermsOfService;