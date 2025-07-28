import './App.css'; // Make sure your App.css defines the --variables
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/Forgot';
import TermsOfService from './components/Terms';
import PrivacyPolicy from './components/Privacy';
import CookieSettings from './components/Cookie';
import Settings from './components/Settings';
import Trending from './components/Trending';
import ApiDocs from './components/ApiDocs';
import Favourite from './components/Favourite'; // Added for completeness based on provided file

function App() {
  return (
    <Router>
      <LayoutHandler />
    </Router>
  );
}

function LayoutHandler() {
  const location = useLocation();

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookie" element={<CookieSettings />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/favorites" element={<Favourite />} /> {/* Added route for Favourite */}
      </Routes>
    </>
  );
}

export default App;