import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaDiscord, FaGithub } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import { loginUser } from '../api';
import logo from './download.png';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(320deg,rgb(61, 40, 175),rgb(34, 27, 51),rgb(0, 0, 0));
  position: relative;
  overflow: hidden;
`;

const AnimeBg = styled.div`
  position: absolute;
  width: 150%;
  height: 150%;
  background-image: url('https://c4.wallpaperflare.com/wallpaper/1020/1/213/world-of-warcraft-battle-for-azeroth-video-games-warcraft-alliance-wallpaper-preview.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  z-index: 0;
`;

const LoginBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  img {
    width: 120px;
    filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.5));
    animation: ${float} 3s ease-in-out infinite;
  }
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const PasswordToggle = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #ff7675);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;
  
  &:hover:not(:disabled) { /* Added :not(:disabled) */
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
  
  &:disabled {
    background: #555; /* Changed disabled background */
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Links = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;

    &:hover {
      color: #ff6b6b;
    }
  }
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff6b6b;
    transform: translateY(-3px);
  }
`;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(''); // Clear previous errors
    setSuccess(false); // Clear previous success messages
    setLoading(true);
    try {
      const data = await loginUser(formData);
      // Assuming your backend sends a `token` or similar upon successful login
      if (data.user) { // Check for `user` object as per your backend controller
        // You might receive a token in a `data.token` field or similar
        // If not, you might need to implement token generation in your backend and send it.
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data (e.g., ID, username)
        // localStorage.setItem('token', data.token); // If your backend returns a token
        setSuccess(true);
        setTimeout(() => navigate('/'), 1500); // Redirect to home on success
      } else {
          setApiError("Login failed: Unexpected response from server."); // Generic error if no user data
      }
    } catch (err) {
      console.error("Login API error:", err); // Log the full error for debugging
      setApiError(err.message || 'Login failed. Please check your credentials.'); // Display user-friendly error
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <AnimeBg />
      <LoginBox>
        <Logo src={logo} alt="Anime Hub" />
        <Title>Welcome Back!</Title>
        {apiError && <div style={{ color: '#ff4757', marginBottom: 12, textAlign: 'center' }}>{apiError}</div>}
        {success && <div style={{ color: '#2ed573', marginBottom: 12, textAlign: 'center' }}>Login successful! Redirecting...</div>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              disabled={loading} // Disable input while loading
            />
          </FormGroup>
          <FormGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              disabled={loading} // Disable input while loading
            />
            <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </FormGroup>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Enter the Universe'}
          </SubmitButton>
        </form>
        <Links>
          <Link to="/forgot">Forgot Password?</Link>
          <br />
          <Link to="/signup">Create New Account</Link>
        </Links>
        <SocialLogin>
          <SocialIcon>
            <FaGoogle color="#fff" />
          </SocialIcon>
          <SocialIcon>
            <FaDiscord color="#fff" />
          </SocialIcon>
          <SocialIcon>
            <FaGithub color="#fff" />
          </SocialIcon>
        </SocialLogin>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;