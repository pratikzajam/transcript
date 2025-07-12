import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext'; // ✅ already imported





export default function DashboardPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [email, setEmail] = useState("");  // Store email

const { isAuthenticated, login, logout } = useAuth(); // ✅ use from context
  const navigate = useNavigate();

  // Fetch email from localStorage when the component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the stringified user data
      setEmail(parsedUser.email);
    }
  }, []); // Empty dependency array ensures this runs only once, when the component mounts

  // Handle file upload
  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("email", email);

    setIsUploading(true); 

    try {
      const response = await axios.post("https://quiz.pratikzajam.sbs/transcribe_video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      const { message } = response.data;

      if (response.status === 200) {
        toast.success(message); // ✅ Success message from API
      } else {
        toast.error(message || "Something went wrong."); // ✅ Fallback if no message
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || "Unexpected error occurred.";
      console.error("Upload error:", errMsg);
      toast.error(errMsg); // ✅ Error message from API
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Drag and drop handlers
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleUpload(files);
  };

  const onFileInputChange = (e) => {
    const files = e.target.files;
    handleUpload(files);
  };

  // Handle logout
  const handleLogout = () => {

    logout()


    localStorage.removeItem('user');

    console.log("logging out");

    navigate("/");
  };

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <a href="/" className="text-indigo-600 font-bold text-2xl">Transcript.ai</a>
              </div>
              <div className="flex items-center">
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center text-gray-700 focus:outline-none"
                  >
                    <span className="mr-2">{email || "user@example.com"}</span> {/* Show email or default */}
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <a href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Account Settings
                      </a>
                      <a href="/billing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Billing
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-gray-600">Upload videos to get transcripts and summaries</p>
            </div>

            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center mb-8 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              {isUploading ? (
                <div className="max-w-md mx-auto">
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Uploading...</span>
                    <span className="text-sm font-medium text-gray-700">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    Drag and drop your video file here, or
                  </p>
                  <div className="mt-2">
                    <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                      Browse files
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="video/*"
                        onChange={onFileInputChange}
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Supported formats: MP4 (max 100MB)
                  </p>
                  <p className="mt-4 text-sm text-gray-600">
                    Once your video is processed, we'll send the transcript and summary to your email.
                  </p>
                </>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 text-center">
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} Transcript.ai. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

    </>
  );


}
