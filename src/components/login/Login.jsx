import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './Login.css'; // Ensure additional custom CSS is imported
import v2 from '../../assets/v2.mp4'; // Background video

// Glassmorphism container
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

// Background video styling
const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

// Glassmorphic form container
const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
  max-width: 400px;
  width: 100%;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #e64a19;
  }
`;

const PasswordStrength = styled.div`
  margin-top: 0.5rem;
  color: ${props => (props.strength === 'weak' ? 'red' : props.strength === 'medium' ? 'orange' : 'green')};
  font-weight: bold;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('weak');
    } else if (password.length >= 6 && password.length < 10) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    evaluatePasswordStrength(pwd);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      {/* Background video */}
      <VideoBackground autoPlay loop muted playsInline>
        <source src={v2} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      {/* Glassmorphic form */}
      <FormContainer>
        <h2 className="text-center font-bold mb-4 submit">Login</h2>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <PasswordStrength strength={passwordStrength}>
            Password strength: {passwordStrength}
          </PasswordStrength>
          <Button type="submit" className='submit'>Login</Button>
          <Button type="button" onClick={handleGoogleAuth} className='google'>
          
            Login with Google
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Login;
