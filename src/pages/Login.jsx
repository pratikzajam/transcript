import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ for navigation
import { useAuth } from '../context/AuthContext'; // ✅ import auth context

export default function SignInPage() {
  const [isHovering, setIsHovering] = useState(false);
  const { login } = useAuth();  // ✅ get login method from AuthContext
  const navigate = useNavigate(); // ✅ get navigation hook

  const handleLoginSuccess = async (response) => {
    const token = response.credential;
    const decodedToken = jwtDecode(token);

    console.log(decodedToken)

    const userData = {
      name: decodedToken.name,
      email: decodedToken.email,
      picture: decodedToken.picture
    };

    

    try {
     let req= await axios.post('https://transcriptaibackend.vercel.app/save-user', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      console.log(req)

      login(userData);           // ✅ update auth context
      navigate('/dashboard');    // ✅ redirect to dashboard
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Google login failed", error);
    alert("Login failed, please try again.");
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col">
      {/* UI remains unchanged */}
      <div className="pt-8 text-center">
        <a href="/" className="text-indigo-600 font-bold text-3xl inline-block">Transcript.ai</a>
      </div>

      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">Welcome to Transcript.ai</h1>
            <p className="text-gray-600">Sign in or create an account to get started</p>
          </div>

          <GoogleLogin 
            onSuccess={handleLoginSuccess} 
            onError={handleLoginFailure}
            useOneTap
            theme="outline"
            size="large"
            shape="pill"
            text="signin_with"
          />

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              First time here? Just click the Google button above to sign in or create an account automatically.
            </p>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            By signing in, you agree to our 
            <a href="/terms" className="text-indigo-600 hover:underline mx-1">Terms of Service</a>
            and
            <a href="/privacy" className="text-indigo-600 hover:underline mx-1">Privacy Policy</a>
          </div>
        </div>
      </div>

      <footer className="bg-white py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Transcript.ai. All rights reserved.
      </footer>
    </div>
  );
}
