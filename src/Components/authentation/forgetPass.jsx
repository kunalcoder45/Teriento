import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css";
import { useEffect } from 'react';
// Firebase imports
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1NPchD4nwBv09JJ9a0Mf5GDMhMV9__1o",
    authDomain: "teriento.firebaseapp.com",
    projectId: "teriento",
    storageBucket: "teriento.firebasestorage.app",
    messagingSenderId: "956625193039",
    appId: "1:956625193039:web:6fe783f9777486c3adc23a",
    measurementId: "G-2FJJ94NR2C"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const analytics = getAnalytics(app);

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    useEffect(() => {
        document.title = "Forget Password - Teriento";
      }, []);
    const handleReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Password reset email sent! Check your inbox.", {
                    position: "top-right",
                    autoClose: 3000,
                });

                // Log success event to Firebase Analytics
                logEvent(analytics, "password_reset_request", {
                    email: email,
                    status: "success",
                });

                // Redirect after 3 seconds
                setTimeout(() => {
                    window.location.href = "/authl";
                }, 3000);
            })
            .catch((error) => {
                const errorMessage = error.message;

                toast.error(`Error: ${errorMessage}`, {
                    position: "top-right",
                    autoClose: 3000,
                });

                // Log error event to Firebase Analytics
                logEvent(analytics, "password_reset_request", {
                    email: email,
                    status: "error",
                    errorMessage: errorMessage,
                });
            });
    };

    return (
        <div className="main-for-pass">
            <div className="form-container">
                <h2>Reset Your Password</h2>
                <input
                    type="email"
                    id="reset-email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleReset}>Send Password Reset Email</button>
                <p>
                    Remembered your password? <Link to="/authl" className="link">Log In</Link>
                </p>
                {/* Toast Notification Container */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgotPassword;
