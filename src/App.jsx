import { useAuth } from './context/AuthContext.jsx'; // ✅ already imported
import { Routes, Route } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from './pages/LandingPage.jsx'
import { Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import PrivateRoute from './pages/PrivateRoute.jsx';


export default function App() {
  const { isAuthenticated, login, logout } = useAuth(); // ✅ use from context

  const handleGoogleLoginSuccess = (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;

    console.log("User email:", userEmail);

    // Call login from AuthContext
    login({ email: userEmail, name: decodedToken.name, picture: decodedToken.picture });
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login failed", error);
  };

  return (
    <GoogleOAuthProvider clientId="492539507110-l3sr87akj88h2esddj54v4nhq6l8dvpr.apps.googleusercontent.com">

      {/* <BrowserRouter> */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login
                onGoogleLoginSuccess={handleGoogleLoginSuccess}
                onGoogleLoginFailure={handleGoogleLoginFailure}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard onLogout={logout} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* </BrowserRouter> */}

    </GoogleOAuthProvider>
  );
}
