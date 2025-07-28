import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaCheck, FaSpinner, FaShieldAlt } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import { forgotPassword } from '../api';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const gradientBg = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ForgotContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(320deg,rgb(61, 40, 175),rgb(34, 27, 51),rgb(0, 0, 0));
  background-size: 400% 400%;
  animation: ${gradientBg} 15s ease infinite;
  position: relative;
  overflow: hidden;
  margin-left: 5rem;
`;

const SecurityShield = styled.div`
  position: absolute;
  font-size: 40vh;
  color: rgba(0, 217, 255, 0.05);
  z-index: 0;
  animation: ${float} 6s ease-in-out infinite;
`;

const ForgotCard = styled.div`
  background: rgba(255, 255, 255, 0.05);

  padding: 2.5rem;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(79, 80, 175, 0.3);
  border: 1px solid rgba(34, 66, 124, 0.1);
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
`;

const Instructions = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid ${props => props.error ? '#ff4757' : 'transparent'};
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #06b6d4;
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #06b6d4, #0ea5e9);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(6, 182, 212, 0.4);
  }

  &:disabled {
    background: #2d3436;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(46, 213, 115, 0.15);
  color: #2ed573;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 71, 87, 0.15);
  color: #ff4757;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SecurityCheck = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1.5rem 0;
  color: rgba(255, 255, 255, 0.8);
`;

const BackToLogin = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.8);

  a {
    color: #06b6d4;
    text-decoration: none;
    margin-left: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
    }
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isHuman, setIsHuman] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isHuman) {
      setError('Please verify you are human');
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgotContainer>
      <SecurityShield>
        <FaShieldAlt />
      </SecurityShield>
      
      <ForgotCard>
        <Title>Reset Your Password</Title>
        <Instructions>
          Enter your email and we'll send you instructions to reset your password
        </Instructions>

        {submitted && (
          <SuccessMessage>
            <FaCheck /> Reset email sent successfully!
          </SuccessMessage>
        )}

        {error && (
          <ErrorMessage>
            <FaShieldAlt /> {error}
          </ErrorMessage>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              disabled={submitted}
            />
          </FormGroup>

          <SecurityCheck>
            <input
              type="checkbox"
              checked={isHuman}
              onChange={(e) => setIsHuman(e.target.checked)}
            />
            <span>I'm not a robot</span>
          </SecurityCheck>

          <SubmitButton 
            type="submit" 
            disabled={loading || submitted}
          >
            {loading ? (
              <>
                <FaSpinner className="spin" />
                Sending...
              </>
            ) : submitted ? (
              <>
                <FaCheck /> Email Sent
              </>
            ) : (
              'Reset Password'
            )}
          </SubmitButton>
        </form>

        <BackToLogin>
          Remember your password? <Link to="/login">Sign In</Link>
        </BackToLogin>
      </ForgotCard>
    </ForgotContainer>
  );
};

export default ForgotPassword;