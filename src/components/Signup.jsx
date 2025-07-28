import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaDiscord, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import { registerUser } from '../api';

// Animations
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(320deg, #1a1a1a, #2d3436, #0f172a);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  position: relative;
  overflow: hidden;
`;

const NeonGlow = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
`;

const SignupCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
  transform-style: preserve-3d;
  perspective: 1000px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
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

const ErrorText = styled.div`
  color: #ff4757;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PasswordStrength = styled.div`
  height: 4px;
  background: #2d3436;
  border-radius: 2px;
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.strength}%;
    background: ${props => 
      props.strength < 25 ? '#ff4757' :
      props.strength < 50 ? '#ffa502' :
      props.strength < 75 ? '#1e90ff' : '#2ed573'};
    transition: all 0.3s ease;
  }
`;

const StrengthLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => 
    props.strength < 25 ? '#ff4757' :
    props.strength < 50 ? '#ffa502' :
    props.strength < 75 ? '#1e90ff' : '#2ed573'};
  text-align: right;
  margin-top: 0.25rem;
`;

const TogglePassword = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;

  &:hover {
    color: #06b6d4;
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  position: relative;

  input {
    margin-right: 0.75rem;
    accent-color: #06b6d4;
  }

  a {
    color: #06b6d4;
    text-decoration: none;
    margin-left: 0.25rem;
    transition: all 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
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
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(6, 182, 212, 0.4);
  }

  &:disabled {
    background: #2d3436;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const SocialButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  &:hover {
    background: rgba(6, 182, 212, 0.1);
    transform: translateY(-2px);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 1.5rem;
  font-size: 1rem;

  a {
    color: #06b6d4;
    text-decoration: none;
    margin-left: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
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

const ErrorMessage = styled(SuccessMessage)`
  background: rgba(255, 71, 87, 0.15);
  color: #ff4757;
`;

const Loader = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.75rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    terms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    
    let label = '';
    if (strength < 25) label = 'Very Weak';
    else if (strength < 50) label = 'Weak';
    else if (strength < 75) label = 'Good';
    else label = 'Strong';
    
    return { strength, label };
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      const { strength, label } = checkPasswordStrength(value);
      setPasswordStrength(strength);
      setPasswordStrengthLabel(label);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (passwordStrength < 50) {
      newErrors.password = 'Password too weak';
    }
    
    if (formData.phone && !/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await registerUser({
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        phone: formData.phone.trim(),
        address: formData.address.trim()
      });
      // Handle backend response for both error and success
      if (res && res.error) {
        setApiError(res.error);
      } else if (res && res.message && res.user) {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setApiError('Registration failed. Please try again.');
      }
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Clear success message after timeout
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <SignupContainer>
      <NeonGlow style={{ top: '-50%', left: '-10%' }} />
      <NeonGlow style={{ bottom: '-50%', right: '-10%' }} />
      
      <SignupCard>
        <Title>Join the Anime Universe</Title>
        
        {submitted && (
          <SuccessMessage>
            <FaCheck /> Registration successful! Redirecting to login...
          </SuccessMessage>
        )}
        
        {apiError && (
          <ErrorMessage>
            <FaExclamationTriangle /> {apiError}
          </ErrorMessage>
        )}
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              error={errors.username}
            />
            {errors.username && (
              <ErrorText>
                <FaExclamationTriangle size={12} /> {errors.username}
              </ErrorText>
            )}
          </FormGroup>
          
          <FormGroup>
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              error={errors.fullName}
            />
            {errors.fullName && (
              <ErrorText>
                <FaExclamationTriangle size={12} /> {errors.fullName}
              </ErrorText>
            )}
          </FormGroup>
          
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={errors.email}
            />
            {errors.email && (
              <ErrorText>
                <FaExclamationTriangle size={12} /> {errors.email}
              </ErrorText>
            )}
          </FormGroup>
          
          <FormGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={errors.password}
            />
            <TogglePassword onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePassword>
            
            {formData.password && (
              <>
                <PasswordStrength strength={passwordStrength} />
                <StrengthLabel strength={passwordStrength}>
                  {passwordStrengthLabel}
                </StrengthLabel>
              </>
            )}
            
            {errors.password && (
              <ErrorText>
                <FaExclamationTriangle size={12} /> {errors.password}
              </ErrorText>
            )}
          </FormGroup>
          
          <FormGroup>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              error={errors.phone}
            />
            {errors.phone && (
              <ErrorText>
                <FaExclamationTriangle size={12} /> {errors.phone}
              </ErrorText>
            )}
          </FormGroup>
          
          <FormGroup>
            <Input
              type="text"
              name="address"
              placeholder="Address (Optional)"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
          </FormGroup>
          
          <CheckboxContainer>
            <input 
              type="checkbox" 
              name="terms" 
              checked={formData.terms}
              onChange={(e) => handleInputChange("terms", e.target.checked)}
            />
            I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
          </CheckboxContainer>
          {errors.terms && (
            <ErrorText>
              <FaExclamationTriangle size={12} /> {errors.terms}
            </ErrorText>
          )}
          
          <SubmitButton 
            type="submit"
            disabled={!formData.terms || passwordStrength < 50 || loading}
          >
            {loading ? (
              <>
                <Loader /> Creating Account...
              </>
            ) : 'Create Account'}
          </SubmitButton>
        </form>
        
        <SocialLogin>
          <SocialButton onClick={() => window.open(`${process.env.REACT_APP_API_BASE_URL || 'https://vercel-vooy.onrender.com/api/v1'}/auth/google`, '_self')}>
            <FaGoogle /> Google
          </SocialButton>
          <SocialButton onClick={() => window.open(`${process.env.REACT_APP_API_BASE_URL || 'https://vercel-vooy.onrender.com/api/v1'}/auth/github`, '_self')}>
            <FaGithub /> GitHub
          </SocialButton>
          <SocialButton onClick={() => window.open(`${process.env.REACT_APP_API_BASE_URL || 'https://vercel-vooy.onrender.com/api/v1'}/auth/discord`, '_self')}>
            <FaDiscord /> Discord
          </SocialButton>
        </SocialLogin>
        
        <LoginLink>
          Already have an account? <Link to="/login">Sign In</Link>
        </LoginLink>
      </SignupCard>
    </SignupContainer>
  );
};

export default Signup;